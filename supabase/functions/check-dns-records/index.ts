// Vérifie SPF / DKIM / DMARC pour legalform.ci via Google DNS over HTTPS
// Pas d'auth requise (lecture publique de DNS), CORS ouvert
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DOMAIN = "legalform.ci";
// Selectors Resend les plus courants
const DKIM_SELECTORS = ["resend", "resend._domainkey", "_domainkey.resend"];

async function dnsQuery(name: string, type: string) {
  const url = `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`;
  const res = await fetch(url, { headers: { Accept: "application/dns-json" } });
  if (!res.ok) return { Answer: [] as any[] };
  return await res.json();
}

function joinTxt(records: any[]): string[] {
  return (records || [])
    .filter((r) => r.type === 16 || r.type === "TXT")
    .map((r) => String(r.data || "").replace(/^"|"$/g, "").replace(/" "/g, ""));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // SPF
    const spfRes = await dnsQuery(DOMAIN, "TXT");
    const spfRecords = joinTxt(spfRes.Answer || []).filter((t) => t.toLowerCase().startsWith("v=spf1"));
    const spfOk = spfRecords.some((r) => r.includes("resend.com") || r.includes("amazonses.com"));

    // DMARC
    const dmarcRes = await dnsQuery(`_dmarc.${DOMAIN}`, "TXT");
    const dmarcRecords = joinTxt(dmarcRes.Answer || []).filter((t) => t.toLowerCase().startsWith("v=dmarc1"));
    const dmarcOk = dmarcRecords.length > 0;

    // DKIM (essai sur plusieurs selectors)
    let dkimOk = false;
    let dkimRecord: string | null = null;
    let dkimSelectorFound: string | null = null;
    for (const sel of DKIM_SELECTORS) {
      const r = await dnsQuery(`${sel}.${DOMAIN}`, "TXT");
      const recs = joinTxt(r.Answer || []);
      const dkim = recs.find((t) => t.toLowerCase().includes("v=dkim1") || t.toLowerCase().includes("p="));
      if (dkim) {
        dkimOk = true;
        dkimRecord = dkim.slice(0, 200);
        dkimSelectorFound = sel;
        break;
      }
    }

    const result = {
      domain: DOMAIN,
      checked_at: new Date().toISOString(),
      spf: { ok: spfOk, records: spfRecords },
      dkim: { ok: dkimOk, selector: dkimSelectorFound, record: dkimRecord, tried: DKIM_SELECTORS },
      dmarc: { ok: dmarcOk, records: dmarcRecords },
      all_ok: spfOk && dkimOk && dmarcOk,
    };

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
