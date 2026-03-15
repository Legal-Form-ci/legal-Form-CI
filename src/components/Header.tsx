import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, LogIn, Search, ChevronDown, Briefcase, Newspaper, LifeBuoy, Users, MessageSquare, BookOpen, Star, Building2, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import logo from "@/assets/logo.png";

interface SubMenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileOpenSections, setMobileOpenSections] = useState<Record<string, boolean>>({});
  const { user, userRole } = useAuth();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const toggleMobileSection = (section: string) => {
    setMobileOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const serviceLinks: SubMenuItem[] = [
    {
      name: t("nav.services"),
      href: "/services",
      icon: Briefcase,
      description: "Tous nos services juridiques et administratifs",
    },
    {
      name: t("nav.createCompany"),
      href: "/create",
      icon: Building2,
      description: "Démarrez votre création d'entreprise",
    },
    {
      name: t("nav.pricing"),
      href: "/pricing",
      icon: CircleDollarSign,
      description: "Consultez les tarifs et packs",
    },
    {
      name: t("nav.regions"),
      href: "/regions",
      icon: Users,
      description: "Accompagnement par région",
    },
  ];

  const resourceLinks: SubMenuItem[] = [
    {
      name: "Actualités",
      href: "/actualites",
      icon: Newspaper,
      description: "Articles, conseils et nouveautés",
    },
    {
      name: "Blog",
      href: "/blog",
      icon: BookOpen,
      description: "Guides pratiques et analyses",
    },
    {
      name: "Forum",
      href: "/forum",
      icon: MessageSquare,
      description: "Espace d'échanges communautaires",
    },
    {
      name: "FAQ",
      href: "/faq",
      icon: LifeBuoy,
      description: "Réponses aux questions fréquentes",
    },
  ];

  const usefulLinks: SubMenuItem[] = [
    {
      name: "Ce qu'ils disent de nous",
      href: "/testimonials",
      icon: Star,
      description: "Découvrez les témoignages clients",
    },
    {
      name: t("nav.showcase"),
      href: "/showcase",
      icon: Building2,
      description: "Entreprises accompagnées",
    },
    {
      name: t("hero.track", "Suivre mon dossier"),
      href: "/tracking",
      icon: Search,
      description: "Suivez l'état de votre demande",
    },
    {
      name: t("nav.contact"),
      href: "/contact",
      icon: MessageSquare,
      description: "Parlez directement à notre équipe",
    },
  ];

  const renderDesktopDropdown = (label: string, links: SubMenuItem[]) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all inline-flex items-center gap-1">
          {label}
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-80 p-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link to={item.href} className="flex items-start gap-3 p-2 rounded-md">
                <Icon className="h-4 w-4 mt-0.5 text-primary" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium leading-none">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const renderMobileSection = (sectionKey: string, label: string, links: SubMenuItem[]) => {
    const isSectionOpen = !!mobileOpenSections[sectionKey];

    return (
      <Collapsible open={isSectionOpen} onOpenChange={() => toggleMobileSection(sectionKey)}>
        <CollapsibleTrigger asChild>
          <button className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg text-foreground hover:bg-muted transition-colors">
            <span>{label}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isSectionOpen ? "rotate-180" : ""}`} />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 pl-2">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
              >
                <Icon className="h-4 w-4 text-primary" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-soft">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <img src={logo} alt="Legal Form" className="h-12 w-12 transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-heading font-bold text-xl text-primary">Legal Form</span>
              <span className="text-xs text-muted-foreground">Création d'entreprise</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              {t("nav.home")}
            </Link>
            {renderDesktopDropdown("Services", serviceLinks)}
            {renderDesktopDropdown("Ressources", resourceLinks)}
            {renderDesktopDropdown("Liens utiles", usefulLinks)}
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => changeLanguage("fr")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  i18n.language === "fr" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  i18n.language === "en" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("es")}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  i18n.language === "es" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                ES
              </button>
            </div>

            {user ? (
              <Link to={userRole === "admin" ? "/admin/dashboard" : "/client/dashboard"}>
                <Button variant="outline" className="font-semibold">
                  {t("nav.mySpace")}
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="outline" className="font-semibold">
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("nav.login")}
                </Button>
              </Link>
            )}
            <Link to="/create">
              <Button className="bg-gradient-accent hover:opacity-90 shadow-soft font-semibold">{t("nav.createCompany")}</Button>
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={() => changeLanguage("fr")}
                className={`px-2 py-1.5 text-xs font-medium transition-colors ${
                  i18n.language === "fr" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1.5 text-xs font-medium transition-colors ${
                  i18n.language === "en" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage("es")}
                className={`px-2 py-1.5 text-xs font-medium transition-colors ${
                  i18n.language === "es" ? "bg-primary text-primary-foreground" : "bg-background hover:bg-muted"
                }`}
              >
                ES
              </button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border animate-fade-in">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-lg transition-all"
            >
              {t("nav.home")}
            </Link>

            <div className="space-y-1">
              {renderMobileSection("services", "Services", serviceLinks)}
              {renderMobileSection("resources", "Ressources", resourceLinks)}
              {renderMobileSection("useful", "Liens utiles", usefulLinks)}
            </div>

            <div className="pt-4 px-4 space-y-2">
              {user ? (
                <Link to={userRole === "admin" ? "/admin/dashboard" : "/client/dashboard"} onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full font-semibold">
                    {t("nav.mySpace")}
                  </Button>
                </Link>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full font-semibold">
                    <LogIn className="mr-2 h-4 w-4" />
                    {t("nav.login")}
                  </Button>
                </Link>
              )}
              <Link to="/create" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-accent hover:opacity-90 shadow-soft font-semibold">
                  {t("nav.createCompany")}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
