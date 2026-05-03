import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { assertEquals, assert } from "https://deno.land/std@0.224.0/assert/mod.ts";

const SUPABASE_URL = Deno.env.get("VITE_SUPABASE_URL") || "https://xwtmnzorzsvkamqemddk.supabase.co";
const ANON = Deno.env.get("VITE_SUPABASE_PUBLISHABLE_KEY") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3dG1uem9yenN2a2FtcWVtZGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2MDIyNzQsImV4cCI6MjA4OTE3ODI3NH0.QE1RN4EiQd2bB5RD41mtRP_Gn4mJ21QaA7WvU69MVig";

Deno.test("cron mode returns processed structure", async () => {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/send-newsletter-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ mode: "cron" }),
  });
  const data = await res.json();
  assert(res.ok, `expected ok, got ${res.status}: ${JSON.stringify(data)}`);
  assert("processed" in data, "should return 'processed'");
  assert(Array.isArray(data.results), "should return results array");
});

Deno.test("missing campaignId returns 400", async () => {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/send-newsletter-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({}),
  });
  const data = await res.json();
  assertEquals(res.status, 400);
  assert(data.error?.includes("campaignId"));
});

Deno.test("unsubscribe RPC marks subscriber inactive", async () => {
  const testEmail = `e2e-${Date.now()}@example.com`;
  // Subscribe (anon role; sending Authorization re-asserts anon, fine)
  const sub = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Prefer: "return=minimal" },
    body: JSON.stringify({ email: testEmail, source: "e2e-test" }),
  });
  const subBody = await sub.text();
  assert(sub.ok, `subscribe failed: ${sub.status} ${subBody}`);

  // Unsubscribe via RPC
  const unsub = await fetch(`${SUPABASE_URL}/rest/v1/rpc/unsubscribe_newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json", apikey: ANON, Authorization: `Bearer ${ANON}` },
    body: JSON.stringify({ _email: testEmail }),
  });
  const result = await unsub.json();
  assertEquals(result, true);
});
