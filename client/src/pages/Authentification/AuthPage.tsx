import { useState, useMemo, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm,UseFormReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useStepsConfig } from './hooks/useStepsConfig';
import { createAuthSchema, createLoginSchema } from './validation/validation';
import { handleError } from "@/utils/errorHandler";

import { ClientConfirmationStep } from "@/components/steps/components/Confirmation/ClientConfirmationStep";
import { DeliveryConfirmationStep } from "../../components/steps/components/Confirmation/DeliveryConfirmationStep";
import { SupplierConfirmationStep } from "../../components/steps/components/Confirmation/SupplierConfirmationStep"; 
// Vos types (utilisés dans le schéma et le formulaire)
import { AuthForm, DocumentProgress, UserRole } from "../types";

// Vos composants d'étapes + la barre de progression
import ProgressBar from "@/components/ProgressBar";
import PersonalInfoStep from "@/components/steps/PersonalInfoStep";
import RoleStep from "@/components/steps/RoleStep";
import DetailsStep from "@/components/steps/DetailsStep";

interface ConfirmationStepProps {
  form: UseFormReturn<AuthForm>;
}

const ConfirmationStepWrapper = ({ form }: ConfirmationStepProps) => {
  const role = form.watch("role");

  const ComponentMap = {
    delivery: DeliveryConfirmationStep,
    supplier: SupplierConfirmationStep,
    client: ClientConfirmationStep
  };

  const StepComponent = ComponentMap[role as keyof typeof ComponentMap] || ClientConfirmationStep;
  return <StepComponent form={form} />;
};


// ─────────────────────────────────────────────────────────────────────────────
// 3. Composant principal AuthPage
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);    // Mode connexion ou inscription
  //const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);             // Étape courante (0..3)
  const [rememberMe, setRememberMe] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<DocumentProgress>({});

  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { login, logout, isLoading, isAuthenticated } = useAuth();
  const { steps } = useStepsConfig();
  
  // Création des schémas avec traduction  
  const validationSchema = useMemo(() => isLogin ? createLoginSchema(t) : createAuthSchema(t), [t, isLogin]);

  // ─────────────────────────────────────────────────────────────────────────────
// 2. Définition des 4 étapes (pour TOUS les rôles)
// ─────────────────────────────────────────────────────────────────────────────
if (isAuthenticated) {
  return <div>Already logged in!</div>;
}
// Creds de démo (pour la Connexion)
const TEMP_CREDENTIALS = {
  username: "admin",
  password: "Samatar1983",
};

  // Simuler des articles dans le panier
  const cartItemCount = 3; // Simulation de 2 articles dans le panier
  
  // Instanciation du formulaire
  const form = useForm<AuthForm>({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "client" as UserRole,
      address: {
        street: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // ──────────────────────────────────────────────────────────────────────────
  // 3.1. Simulation de l'upload des documents
  // ──────────────────────────────────────────────────────────────────────────
  const handleFileChange =
    (documentType: keyof DocumentProgress) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Mettre à jour le formulaire avec le fichier
      form.setValue(`documents.${documentType}`, file);

      // Mettre à jour la progression
      setUploadProgress((prev) => ({
        ...prev,
        [documentType]: { progress: 0, status: "uploading" },
      }));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress((prev) => ({
          ...prev,
          [documentType]: {
            progress: Math.min(progress, 100),
            status: progress >= 100 ? "completed" : "uploading",
          },
        }));

        if (progress >= 100) {
          clearInterval(interval);
        }
      }, 200);
    };

  // ──────────────────────────────────────────────────────────────────────────
  // 3.2. Autorisation de passer à l’étape suivante (formulaire valide ?)
  // ──────────────────────────────────────────────────────────────────────────
  const canProceed = () => {
    if (isLogin) return true;
  
    const currentRole = form.watch("role");
    const currentFields = steps[step].fields(currentRole);
    const errors = form.formState.errors;
  
  
    // Vérifie s'il y a des erreurs sur les champs de l'étape en cours
    const hasErrors = currentFields.some((field) => {
      if (field === "address") {
        if (currentRole === "delivery") {
          return errors.address;
        }
      }
      if (field === "documents" && currentRole === "delivery") {
        return errors.documents;
      }
      return errors[field as keyof typeof errors];
    });
    
    console.log("Has Errors:", hasErrors);
  
    // Vérifie si tous les champs sont remplis
    const isComplete = currentFields.every((field) => {
      if (field === "address") {
        const address = form.watch("address");
        if (!address) return false;
        
        const requiredFields = currentRole === "delivery" 
          ? ['street', 'streetNumber', 'city', 'postalCode', 'country']
          : ['street', 'city', 'postalCode', 'country'];
          
        const addressComplete = requiredFields.every(key => {
          const value = address[key as keyof typeof address];
          const isValid = value !== undefined && value !== null && String(value).trim() !== '';
          return isValid;
        });
        return addressComplete;
      }
      if (field === "documents" && currentRole === "delivery") {
        const documents = form.watch("documents");
        if (!documents) return false;
        
        const docsComplete = ['identityCard', 'driversLicense', 'vehicleRegistration', 'insurance'].every(key => {
          const hasDoc = documents[key as keyof typeof documents];
          return hasDoc;
        });
        return docsComplete;
      }
      const value = form.watch(field as keyof AuthForm);
      return value;
    });
    return !hasErrors && isComplete;
  };
  // ──────────────────────────────────────────────────────────────────────────
  // 3.3. Navigation entre les étapes
  // ──────────────────────────────────────────────────────────────────────────
  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setUploadProgress({});
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setUploadProgress({});
    }
  };

  // Gérer la soumission du formulaire de connexion
  const handleLogin = async (data: AuthForm) => {
    try {
      // S'assurer que les données sont dans le bon format pour l'API
      const loginData = {
        email: data.email,
        password: data.password
      };
      await login(data.email, data.password);
      toast({
        title: t("pages.auth.login.success"),
        description: t("pages.auth.login.successDescription"),
      });

      // Rediriger vers la page d'accueil après la connexion
      setLocation("/");
    } catch (error) {
      handleError(error, toast);
    }
  };

  // Gérer la soumission du formulaire d'inscription
  const handleSignup = async (data: AuthForm) => {
    // Pour l'instant, nous n'implémentons que la connexion
    toast({
      variant: "destructive",
      title: t("pages.auth.signup.notImplemented"),
      description: t("pages.auth.signup.notImplementedDescription"),
    });
  };

  // Gérer la soumission du formulaire (connexion ou inscription)
  const onSubmit = async (data: AuthForm) => {
    console.log("onSubmit called with data:", data);
    if (isLogin) {
      await handleLogin(data);
    } else {
      await handleSignup(data);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // 3.5. Rendu principal : Multi-step + Confirmation
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex items-center justify-center py-4 px-4 bg-background">
      <Card className={`w-full ${isLogin ? "max-w-sm" : "max-w-2xl"} shadow-sm`}>
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">
            {t(isLogin ? "pages.auth.title.login" : "pages.auth.title.register")}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
          {isLogin && cartItemCount > 0 && (
              <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <span className="font-medium">{t("pages.auth.login.cart.title")}</span>
                  {t("pages.auth.login.cart.description", { count: cartItemCount })}
                </p>
              </div>
            )}
           <form 
              onSubmit={form.handleSubmit((data) => {
                console.log("Form data:", data);
                onSubmit(data);  // Utiliser onSubmit pour router vers login/signup
              })} 
            >
              <AnimatePresence mode="wait">
                {isLogin ? (
                  // ──────────────────────────────────────────────────────────
                  // Mode Connexion (1 seul "écran")
                  // ──────────────────────────────────────────────────────────
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-2"
                  >
                    <PersonalInfoStep form={form} isLogin />
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="remember" 
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label 
                        htmlFor="remember" 
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        {t("pages.auth.login.rememberMe")}
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full mb-2 bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                    >
                      {isLoading ? (
                        <>

                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {t("pages.auth.login.submitting")}
                        </>

                      ) : (
                        t("pages.auth.login.submit")
                      )}
                    </Button>
                    <div className="text-center">
                      <Link href="/auth/forgot-password" className="text-[hsl(252,85%,60%)] text-sm hover:underline">
                        {t("pages.auth.login.forgotPassword")}
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  // ──────────────────────────────────────────────────────────
                  // Mode Inscription (4 étapes)
                  // ──────────────────────────────────────────────────────────
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Barre de progression */}
                    <ProgressBar
                      step={step}
                      steps={steps}
                      // Optionnel : vous pouvez calculer le % si besoin
                    />

                    {/* Contenu dynamique selon l’étape */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2"
                      >
                        {step === 0 && <PersonalInfoStep form={form} />}
                        {step === 1 && <RoleStep form={form} />}
                        {step === 2 && (
                          <DetailsStep
                            form={form}
                            uploadProgress={uploadProgress}
                            handleFileChange={handleFileChange}
                          />
                        )}
                        {step === 3 && <ConfirmationStepWrapper form={form} />}
                      </motion.div>
                    </AnimatePresence>

                    {/* Boutons de navigation */}
                    <div className="flex justify-between pt-4">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={prevStep}
                        disabled={step === 0}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        {t("pages.auth.steps.back")}
                      </Button>

                      {/* Si on n'est pas à la dernière étape → Bouton Suivant */}
                      {step < steps.length - 1 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="flex items-center gap-2"
                        >
                          {t("pages.auth.steps.next")}
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        // Si on est à la dernière étape (Confirmation) → Soumission
                        <Button
                          type="submit"
                          className="bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>

                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              {t("pages.auth.register.submitting")}
                            </>

                          ) : (
                            t("pages.auth.register.submit")
                          )}
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Basculer entre connexion et inscription */}
              <div className={`${isLogin ? "mt-6 pt-6 border-t border-gray-200" : "mt-4"}`}>
                {isLogin ? (
                  <>

                    <h3 className="text-lg font-semibold text-[hsl(252,85%,60%)]">
                      {t("pages.auth.login.noAccount")}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {t("pages.auth.login.noAccountDescription")}
                    </p>
                  </>

                ) : null}
                <Button
                  type="button"
                  variant={isLogin ? "outline" : "ghost"}
                  className={isLogin 
                    ? "w-full mt-4 border-[hsl(252,85%,60%)] text-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,60%)] hover:text-white"
                    : "w-full text-sm text-muted-foreground hover:text-[hsl(252,85%,60%)]"
                  }
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setStep(0);
                    setUploadProgress({});
                  }}
                >
                  {isLogin ? t("pages.auth.login.signupLink") : t("pages.auth.register.login")}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
