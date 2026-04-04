import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Search, Loader2, X, ExternalLink, ChevronRight, BookOpen, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  url?: string;
  title?: string;
  description?: string;
  markdown?: string;
  source?: "local" | "web";
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

  const searchLocalContent = async (q: string): Promise<SearchResult[]> => {
    const localResults: SearchResult[] = [];
    const searchTerm = `%${q}%`;

    const { data: blogs } = await supabase
      .from("blog_posts")
      .select("title, slug, excerpt, content, category, public_id")
      .eq("is_published", true)
      .or(`title.ilike.${searchTerm},content.ilike.${searchTerm},excerpt.ilike.${searchTerm}`)
      .limit(5);

    if (blogs) {
      blogs.forEach((b) =>
        localResults.push({
          title: b.title,
          description: b.excerpt || b.content?.slice(0, 150),
          url: `/actualites/${b.public_id || b.slug}`,
          source: "local",
        })
      );
    }

    const { data: news } = await supabase
      .from("news")
      .select("title, id, excerpt, content, category, public_id")
      .eq("is_published", true)
      .or(`title.ilike.${searchTerm},content.ilike.${searchTerm}`)
      .limit(5);

    if (news) {
      news.forEach((n) =>
        localResults.push({
          title: n.title,
          description: n.excerpt || n.content?.slice(0, 150),
          url: `/actualites`,
          source: "local",
        })
      );
    }

    const { data: faqs } = await supabase
      .from("faq")
      .select("question, answer")
      .eq("is_published", true)
      .or(`question.ilike.${searchTerm},answer.ilike.${searchTerm}`)
      .limit(3);

    if (faqs) {
      faqs.forEach((f) =>
        localResults.push({
          title: f.question,
          description: f.answer?.slice(0, 150),
          url: `/faq`,
          source: "local",
        })
      );
    }

    return localResults;
  };

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    try {
      const localResults = await searchLocalContent(q);
      setResults(localResults);
      setShowPopup(true);

      if (localResults.length === 0) {
        toast.info("Aucun résultat trouvé. Essayez avec d'autres termes.");
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Erreur lors de la recherche");
    } finally {
      setIsSearching(false);
    }
  };

  const handleViewAll = () => {
    setShowPopup(false);
    sessionStorage.setItem("searchResults", JSON.stringify(results));
    sessionStorage.setItem("searchQuery", query);
    navigate("/search-results");
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.source === "local" && result.url) {
      setShowPopup(false);
      navigate(result.url);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
        <div className="relative">
          <div className="flex bg-white rounded-xl overflow-hidden shadow-strong">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder={t("hero.searchPlaceholder", "Rechercher : droit des affaires, fiscalité, CNPS, création...")}
                className="border-0 bg-transparent text-foreground placeholder:text-muted-foreground pl-12 pr-4 py-4 h-14 text-base focus-visible:ring-0 focus-visible:ring-offset-0"
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
            <div className="space-y-3">
              {results.slice(0, 8).map((result, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border border-border hover:border-primary/30 transition-colors bg-card cursor-pointer"
                  onClick={() => handleResultClick(result)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                      {result.title || "Résultat"}
                    </h3>
                    <Badge variant="outline" className="text-[10px] flex-shrink-0">
                      <BookOpen className="h-3 w-3 mr-1" />Site
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {result.description || ""}
                  </p>
                </div>
              ))}

              <div className="flex gap-3 pt-4 border-t border-border">
                <Button onClick={handleViewAll} className="flex-1">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Voir tous les résultats ({results.length})
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
