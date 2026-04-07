import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await req.json();
    console.log("FedaPay webhook received:", JSON.stringify(body));

    const event = body.event || body.name;
    const entity = body.entity || body.object;

    if (!entity) {
      return new Response(JSON.stringify({ error: "No entity" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const transactionId = String(entity.id || entity.transaction_id);
    const status = entity.status;

    console.log(`Webhook event=${event}, txId=${transactionId}, status=${status}`);

    if (status === "approved" || status === "completed" || event === "transaction.approved") {
      // Update payment record
      const { data: payment } = await supabase
        .from("payments")
        .select("*")
        .eq("transaction_id", transactionId)
        .maybeSingle();

      if (payment) {
        await supabase
          .from("payments")
          .update({ status: "approved" })
          .eq("id", payment.id);

        // Update invoice
        const invoiceId = (payment.metadata as any)?.invoice_id;
        if (invoiceId) {
          await supabase
            .from("invoices")
            .update({
              status: "paid",
              paid_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", invoiceId);
        }

        // Update request payment status
        if (payment.request_id) {
          const table = payment.request_type === "service" ? "service_requests" : "company_requests";
          await supabase
            .from(table)
            .update({
              payment_status: "approved",
              payment_reference: transactionId,
              payment_amount: payment.amount,
              updated_at: new Date().toISOString(),
            })
            .eq("id", payment.request_id);
        }

        // Send notification to user
        if (payment.user_id) {
          await supabase.from("notifications").insert({
            user_id: payment.user_id,
            title: "Paiement confirmé",
            message: `Votre paiement de ${payment.amount} FCFA a été confirmé.`,
            type: "payment",
            link: "/client/dashboard",
          });
        }

        console.log("Payment approved successfully:", payment.id);
      } else {
        console.log("No payment found for transaction:", transactionId);
      }
    } else if (status === "declined" || status === "cancelled" || status === "failed") {
      await supabase
        .from("payments")
        .update({ status: "failed" })
        .eq("transaction_id", transactionId);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
};

serve(handler);
