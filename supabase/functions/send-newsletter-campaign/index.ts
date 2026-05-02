// Send a newsletter campaign to all active subscribers via Resend Connector Gateway
// Uses LOVABLE_API_KEY + RESEND_API_KEY_1 (Resend connector). Triggered manually or via pg_cron.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";
const FROM = "Legal Form <newsletter@legalform.ci>";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY_1") || Deno.env.get("RESEND_API_KEY");

    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (!RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: "Resend connector not linked (RESEND_API_KEY_1 missing)" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    // Body may be empty for cron mode
    let body: any = {};
    try { body = await req.json(); } catch (_) { body = {}; }
    const { campaignId, testEmail, mode } = body;

    // CRON MODE: send all scheduled campaigns due now
    if (mode === "cron") {
      const { data: due } = await supabase
        .from("newsletter_campaigns")
        .select("id")
        .eq("status", "scheduled")
        .lte("scheduled_at", new Date().toISOString());

      const results: any[] = [];
      for (const c of due || []) {
        const r = await sendCampaign(supabase, RESEND_API_KEY, LOVABLE_API_KEY, c.id, undefined);
        results.push({ id: c.id, ...r });
      }
      return new Response(JSON.stringify({ processed: results.length, results }), {
        status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!campaignId) {
      return new Response(JSON.stringify({ error: "campaignId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = await sendCampaign(supabase, RESEND_API_KEY, LOVABLE_API_KEY, campaignId, testEmail);
    return new Response(JSON.stringify(result), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("send-newsletter-campaign error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function sendCampaign(
  supabase: any,
  RESEND_API_KEY: string,
  LOVABLE_API_KEY: string,
  campaignId: string,
  testEmail?: string,
) {
  const { data: campaign, error: campErr } = await supabase
    .from("newsletter_campaigns").select("*").eq("id", campaignId).maybeSingle();

  if (campErr || !campaign) return { error: "Campaign not found", success: 0, failure: 0, total: 0 };

  await supabase.from("newsletter_campaigns")
    .update({ status: "sending", updated_at: new Date().toISOString() })
    .eq("id", campaignId);

  let recipients: { email: string; full_name: string | null }[] = [];
  if (testEmail) {
    recipients = [{ email: testEmail, full_name: null }];
  } else {
    const { data: subs } = await supabase
      .from("newsletter_subscribers").select("email, full_name").eq("is_active", true);
    recipients = subs || [];
  }

  let success = 0, failure = 0;
  for (const r of recipients) {
    const unsub = `https://www.legalform.ci/newsletter/unsubscribe?email=${encodeURIComponent(r.email)}`;
    const html = `${campaign.html_content}
<hr style="margin:32px 0;border:none;border-top:1px solid #eee" />
<p style="font-size:12px;color:#888;text-align:center">
  Vous recevez cet email car vous êtes inscrit à la newsletter Legal Form.<br/>
  <a href="${unsub}" style="color:#888">Se désabonner</a>
</p>`;
    try {
      const res = await fetch(`${GATEWAY_URL}/emails`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from: FROM, to: [r.email], subject: campaign.subject, html }),
      });
      if (res.ok) success++;
      else { failure++; console.error("Resend gateway failed", r.email, res.status, await res.text()); }
    } catch (e) {
      failure++; console.error("Send error", r.email, e);
    }
    await new Promise((r) => setTimeout(r, 50));
  }

  if (!testEmail) {
    await supabase.from("newsletter_campaigns").update({
      status: failure === recipients.length && recipients.length > 0 ? "failed" : "sent",
      sent_at: new Date().toISOString(),
      recipients_count: recipients.length,
      success_count: success,
      failure_count: failure,
      updated_at: new Date().toISOString(),
    }).eq("id", campaignId);
  } else {
    await supabase.from("newsletter_campaigns").update({
      status: campaign.status === "sending" ? "draft" : campaign.status,
      updated_at: new Date().toISOString(),
    }).eq("id", campaignId);
  }

  return { success, failure, total: recipients.length, test: !!testEmail };
}
