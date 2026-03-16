import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Loader2, X, ExternalLink, Download, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { firecrawlApi } from "@/lib/api/firecrawl";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  url?: string;
  title?: string;
  description?: string;
  markdown?: string;
}

export const HeroSearchBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const suggestions = [
    "Comment créer une SARL en Côte d'Ivoire ?",
    "Fiscalité des entreprises zone OHADA",
    "Droit du travail employeur CNPS",
    "Formalités création entreprise individuelle",
  ];

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    try {
      // Prioritize OHADA zone + business law context
      const enhancedQuery = `${q} droit des affaires OHADA Côte d'Ivoire entreprise`;
      
      const response = await firecrawlApi.search(enhancedQuery, {
        limit: 10,
        lang: "fr",
        country: "ci",
        scrapeOptions: { formats: ["markdown"] },
      });

      if (response.success && response.data) {
        const searchResults = Array.isArray(response.data) ? response.data : (response as any).data || [];
        setResults(searchResults);
        setShowPopup(true);
      } else {
        toast.error(response.error || "Erreur lors de la recherche");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Erreur de connexion au service de recherche");
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewAll = () => {
    setShowPopup(false);
    // Store results in sessionStorage for the results page
    sessionStorage.setItem("searchResults", JSON.stringify(results));
    sessionStorage.setItem("searchQuery", query);
    navigate("/search-results");
  };

  return (
    <>
      <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-250">
        <div className="relative">
          <div className="flex bg-white/15 backdrop-blur-md rounded-xl border border-white/30 overflow-hidden shadow-strong">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("hero.searchPlaceholder", "Rechercher : droit des affaires, fiscalité, CNPS, création...")}
                className="border-0 bg-transparent text-white placeholder:text-white/50 pl-12 pr-4 py-4 h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button
              onClick={() => handleSearch()}
              disabled={isSearching || !query.trim()}
              className="bg-accent hover:bg-accent/90 text-white rounded-none px-6 h-14 font-semibold text-base"
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  {t("hero.search", "Rechercher")}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Quick suggestions */}
        <div className="flex flex-wrap gap-2 mt-3">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => { setQuery(s); handleSearch(s); }}
              className="text-xs bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-full transition-all border border-white/10"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Results Popup */}
      <Dialog open={showPopup} onOpenChange={setShowPopup}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <Search className="h-5 w-5 text-primary" />
              Résultats pour "{query}"
            </DialogTitle>
          </DialogHeader>

          {results.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Aucun résultat trouvé. Essayez avec d'autres termes.
            </p>
          ) : (
            <div className="space-y-4">
              {results.slice(0, 5).map((result, i) => (
                <div key={i} className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card">
                  <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                    {result.title || "Résultat"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {result.description || result.markdown?.slice(0, 150) || ""}
                  </p>
                  {result.url && (
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      {new URL(result.url).hostname}
                    </a>
                  )}
                </div>
              ))}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button onClick={handleViewAll} className="flex-1">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Voir tous les résultats
                </Button>
                <Button variant="outline" onClick={handleViewAll}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
