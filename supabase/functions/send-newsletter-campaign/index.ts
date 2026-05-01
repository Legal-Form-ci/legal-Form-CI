// Send a newsletter campaign to all active subscribers via Resend
// Requires RESEND_API_KEY secret. Triggered manually or via schedule.
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendKey = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(supabaseUrl, serviceKey);

    if (!resendKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured. Add it via Lovable secrets." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { campaignId, testEmail } = await req.json();
    if (!campaignId) {
      return new Response(JSON.stringify({ error: "campaignId required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: campaign, error: campErr } = await supabase
      .from("newsletter_campaigns")
      .select("*")
      .eq("id", campaignId)
      .maybeSingle();
    if (campErr || !campaign) {
      return new Response(JSON.stringify({ error: "Campaign not found" }), {
        status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Mark sending
    await supabase.from("newsletter_campaigns")
      .update({ status: "sending", updated_at: new Date().toISOString() })
      .eq("id", campaignId);

    // Recipients
    let recipients: { email: string; full_name: string | null }[] = [];
    if (testEmail) {
      recipients = [{ email: testEmail, full_name: null }];
    } else {
      const { data: subs } = await supabase
        .from("newsletter_subscribers")
        .select("email, full_name")
        .eq("is_active", true);
      recipients = subs || [];
    }

    let success = 0, failure = 0;
    const FROM = "Legal Form <newsletter@legalform.ci>";

    // Resend supports batch up to 100; we send sequentially with simple throttle
    for (const r of recipients) {
      const unsubLink = `https://www.legalform.ci/newsletter/unsubscribe?email=${encodeURIComponent(r.email)}`;
      const html = `${campaign.html_content}
<hr style="margin:32px 0;border:none;border-top:1px solid #eee" />
<p style="font-size:12px;color:#888;text-align:center">
  Vous recevez cet email car vous êtes inscrit à la newsletter Legal Form.<br/>
  <a href="${unsubLink}" style="color:#888">Se désabonner</a>
</p>`;
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: FROM,
            to: r.email,
            subject: campaign.subject,
            html,
          }),
        });
        if (res.ok) success++;
        else { failure++; console.error("Resend failed for", r.email, await res.text()); }
      } catch (e) {
        failure++; console.error("Send error", r.email, e);
      }
      // Tiny throttle to avoid bursts
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
      // Reset to draft after test
      await supabase.from("newsletter_campaigns").update({
        status: campaign.status === "sending" ? "draft" : campaign.status,
        updated_at: new Date().toISOString(),
      }).eq("id", campaignId);
    }

    return new Response(JSON.stringify({ success, failure, total: recipients.length, test: !!testEmail }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    console.error("send-newsletter-campaign error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
