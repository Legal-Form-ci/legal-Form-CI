import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, RefreshCw, ShieldCheck } from "lucide-react";

interface DnsCheck {
  domain: string;
  checked_at: string;
  spf: { ok: boolean; records: string[] };
  dkim: { ok: boolean; selector: string | null; record: string | null; tried: string[] };
  dmarc: { ok: boolean; records: string[] };
  all_ok: boolean;
}

export const DnsStatusCard = () => {
  const [data, setData] = useState<DnsCheck | null>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("check-dns-records");
      if (!error) setData(data as DnsCheck);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { check(); }, []);

  const Status = ({ ok, label }: { ok: boolean; label: string }) => (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <span className="font-medium text-sm">{label}</span>
      {ok ? (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="h-3 w-3 mr-1" /> OK</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="h-3 w-3 mr-1" /> KO</Badge>
      )}
    </div>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" /> DNS legalform.ci
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={check} disabled={loading}>
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </CardHeader>
      <CardContent className="text-sm">
        {!data && <p className="text-muted-foreground">Vérification…</p>}
        {data && (
          <>
            <Status ok={data.spf.ok} label="SPF (Resend)" />
            <Status ok={data.dkim.ok} label={`DKIM${data.dkim.selector ? ` (${data.dkim.selector})` : ""}`} />
            <Status ok={data.dmarc.ok} label="DMARC" />
            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Dernière vérif : {new Date(data.checked_at).toLocaleTimeString("fr-FR")}
              </span>
              {data.all_ok ? (
                <Badge className="bg-green-600">Domaine prêt ✅</Badge>
              ) : (
                <Badge variant="destructive">Configuration incomplète</Badge>
              )}
            </div>
            {!data.all_ok && (
              <p className="mt-2 text-xs text-muted-foreground">
                Ajoutez les enregistrements SPF/DKIM/DMARC fournis par Resend dans votre zone DNS.
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DnsStatusCard;
