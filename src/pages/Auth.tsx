import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PasswordInput } from "@/components/PasswordInput";
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Globe } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+225", country: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { code: "+33", country: "FR", name: "France", flag: "🇫🇷" },
  { code: "+1", country: "US", name: "États-Unis", flag: "🇺🇸" },
  { code: "+44", country: "GB", name: "Royaume-Uni", flag: "🇬🇧" },
  { code: "+32", country: "BE", name: "Belgique", flag: "🇧🇪" },
  { code: "+41", country: "CH", name: "Suisse", flag: "🇨🇭" },
  { code: "+1", country: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "+212", country: "MA", name: "Maroc", flag: "🇲🇦" },
  { code: "+221", country: "SN", name: "Sénégal", flag: "🇸🇳" },
  { code: "+223", country: "ML", name: "Mali", flag: "🇲🇱" },
  { code: "+226", country: "BF", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "+228", country: "TG", name: "Togo", flag: "🇹🇬" },
  { code: "+229", country: "BJ", name: "Bénin", flag: "🇧🇯" },
  { code: "+227", country: "NE", name: "Niger", flag: "🇳🇪" },
  { code: "+224", country: "GN", name: "Guinée", flag: "🇬🇳" },
  { code: "+237", country: "CM", name: "Cameroun", flag: "🇨🇲" },
  { code: "+241", country: "GA", name: "Gabon", flag: "🇬🇦" },
  { code: "+242", country: "CG", name: "Congo", flag: "🇨🇬" },
  { code: "+243", country: "CD", name: "RD Congo", flag: "🇨🇩" },
  { code: "+250", country: "RW", name: "Rwanda", flag: "🇷🇼" },
  { code: "+234", country: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "+233", country: "GH", name: "Ghana", flag: "🇬🇭" },
  { code: "+49", country: "DE", name: "Allemagne", flag: "🇩🇪" },
  { code: "+39", country: "IT", name: "Italie", flag: "🇮🇹" },
  { code: "+34", country: "ES", name: "Espagne", flag: "🇪🇸" },
  { code: "+86", country: "CN", name: "Chine", flag: "🇨🇳" },
  { code: "+91", country: "IN", name: "Inde", flag: "🇮🇳" },
  { code: "+55", country: "BR", name: "Brésil", flag: "🇧🇷" },
  { code: "+7", country: "RU", name: "Russie", flag: "🇷🇺" },
  { code: "+81", country: "JP", name: "Japon", flag: "🇯🇵" },
  { code: "+27", country: "ZA", name: "Afrique du Sud", flag: "🇿🇦" },
  { code: "+971", country: "AE", name: "Émirats Arabes Unis", flag: "🇦🇪" },
  { code: "+966", country: "SA", name: "Arabie Saoudite", flag: "🇸🇦" },
  { code: "+90", country: "TR", name: "Turquie", flag: "🇹🇷" },
  { code: "+20", country: "EG", name: "Égypte", flag: "🇪🇬" },
  { code: "+216", country: "TN", name: "Tunisie", flag: "🇹🇳" },
  { code: "+213", country: "DZ", name: "Algérie", flag: "🇩🇿" },
];

const detectCountryCode = (): string => {
  try {
    const lang = navigator.language || navigator.languages?.[0] || '';
    const region = lang.split('-')[1]?.toUpperCase();
    if (region) {
      const match = COUNTRY_CODES.find(c => c.country === region);
      if (match) return match.code;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.includes('Abidjan') || tz.includes('Africa/Abidjan')) return '+225';
    if (tz.includes('Europe/Paris')) return '+33';
    if (tz.includes('America/New_York') || tz.includes('America/Chicago')) return '+1';
    if (tz.includes('Europe/London')) return '+44';
  } catch {}
  return '+225';
};

const Auth = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(() => detectCountryCode());
  const [whatsapp, setWhatsapp] = useState("");
  const { signUp, signIn, user, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && userRole !== null) {
      if (userRole === 'admin' || userRole === 'team') {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/client/dashboard", { replace: true });
      }
    }
  }, [user, userRole, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullPhone = `${countryCode} ${phone}`;
    await signUp(email, password, fullName, fullPhone);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const selectedCountry = useMemo(() => 
    COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0],
    [countryCode]
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-4xl text-foreground mb-4">
              {t('auth.login')} / {t('auth.signup')}
            </h1>
            <p className="text-muted-foreground">
              Accédez à votre espace personnel
            </p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t('auth.login')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signup')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>{t('auth.login')}</CardTitle>
                  <CardDescription>
                    Connectez-vous pour suivre vos dossiers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="login-email">{t('auth.email')}</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">{t('auth.password')}</Label>
                      <PasswordInput
                        id="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                        {t('auth.forgotPassword')}
                      </Link>
                    </div>
                    <Button type="submit" className="w-full">
                      {t('auth.loginButton')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>{t('auth.signup')}</CardTitle>
                  <CardDescription>
                    Créez un compte pour commencer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                      <Label htmlFor="signup-name">{t('form.name')}</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-phone">{t('form.phone')}</Label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[130px] shrink-0">
                            <SelectValue>
                              <span className="flex items-center gap-1">
                                <span>{selectedCountry.flag}</span>
                                <span className="text-xs">{countryCode}</span>
                              </span>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent className="max-h-[300px]">
                            {COUNTRY_CODES.map((c) => (
                              <SelectItem key={`${c.country}-${c.code}`} value={c.code}>
                                <span className="flex items-center gap-2">
                                  <span>{c.flag}</span>
                                  <span className="text-sm">{c.name}</span>
                                  <span className="text-xs text-muted-foreground">{c.code}</span>
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="signup-phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="07 09 67 79 25"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-whatsapp">
                        <span className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          WhatsApp (optionnel)
                        </span>
                      </Label>
                      <Input
                        id="signup-whatsapp"
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder={`${countryCode} 07 09 67 79 25`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-email">{t('auth.email')}</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">{t('auth.password')}</Label>
                      <PasswordInput
                        id="signup-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      {t('auth.signupButton')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;
