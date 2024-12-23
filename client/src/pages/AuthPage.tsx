import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2} from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// Vos types (utilisés dans le schéma et le formulaire)
import { AuthForm, DocumentProgress, UserRole } from "./types";

// Vos composants d'étapes + la barre de progression
import ProgressBar from "@/components/ProgressBar";
import PersonalInfoStep from "@/components/steps/PersonalInfoStep";
import RoleStep from "@/components/steps/RoleStep";
import DetailsStep from "@/components/steps/DetailsStep";
import ConfirmationStep from "@/components/steps/ConfirmationStep";

// ─────────────────────────────────────────────────────────────────────────────
// 1. Schémas de validation Zod
// ─────────────────────────────────────────────────────────────────────────────

// (Exemple) : Vous pouvez adapter si vous avez déjà vos propres schémas
const addressSchema = z.object({
  street: z.string().min(1, "La rue est requise"),
  streetNumber: z.string().min(1, "Le numéro est requis"),
  apartment: z.string().optional(),
  building: z.string().optional(),
  floor: z.string().optional(),
  additionalInfo: z.string().optional(),
  city: z.string().min(1, "La ville est requise"),
  postalCode: z.string().min(1, "Le code postal est requis"),
  country: z.string().min(1, "Le pays est requis"),
  region: z.string().optional(),
});

const documentSchema = z.object({
  identityCard: z.any().optional(),
  driversLicense: z.any().optional(),
  vehicleRegistration: z.any().optional(),
  insurance: z.any().optional(),
});

const authSchema = z.object({
  username: z
    .string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/\d/, "Le mot de passe doit contenir au moins un chiffre"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("L'email est invalide"),
  phone: z
    .string()
    .regex(
      /^\+?\d{3}[-\s.]?\d{3}[-\s.]?\d{4,6}$/,
      "Le numéro de téléphone est invalide"
    ),
  role: z.enum(["client", "delivery", "supplier"], {
    required_error: "Le rôle est requis",
    invalid_type_error: "Le rôle sélectionné est invalide",
  }),
  address: addressSchema.optional(),
  documents: documentSchema.optional(),
});

// ─────────────────────────────────────────────────────────────────────────────
// 2. Définition des 4 étapes (pour TOUS les rôles)
// ─────────────────────────────────────────────────────────────────────────────

const steps = [
  {
    title: "Informations personnelles",
    fields: ["firstName", "lastName", "email", "phone", "username", "password"],
  },
  {
    title: "Choisir votre rôle",
    fields: ["role"],
  },
  {
    title: "Détails supplémentaires",
    fields: ["address", "documents"],
  },
  {
    title: "Confirmation",
    fields: [],
  },
] as const;

// Creds de démo (pour la Connexion)
const TEMP_CREDENTIALS = {
  username: "admin",
  password: "Samatar1983",
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. Composant principal AuthPage
// ─────────────────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);    // Mode connexion ou inscription
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);             // Étape courante (0..3)
  const [rememberMe, setRememberMe] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<DocumentProgress>({}); // Avancement upload doc

  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Instanciation du formulaire
  const form = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "client" as UserRole,
      address: {
        street: "",
        streetNumber: "",
        city: "",
        postalCode: "",
        country: "",
      },
    },
  });

  // ──────────────────────────────────────────────────────────────────────────
  // 3.1. Simulation de l'upload des documents
  // ──────────────────────────────────────────────────────────────────────────
  const handleFileChange =
    (documentType: keyof DocumentProgress) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

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
    // En mode login, on ne fait pas le multi-step
    if (isLogin) return true;

    const currentFields = steps[step].fields;
    const errors = form.formState.errors;

    // Vérifie s’il y a des erreurs sur les champs de l’étape en cours
    const hasErrors = currentFields.some((field) => {
      if (field === "address") {
        return form.watch("role") === "delivery" && errors.address;
      }
      if (field === "documents") {
        return form.watch("role") === "delivery" && errors.documents;
      }
      return errors[field as keyof typeof errors];
    });

    // Vérifie si tous les champs sont remplis
    const isComplete = currentFields.every((field) => {
      if (field === "address" || field === "documents") {
        // On laisse la validation zod s’en charger
        return true;
      }
      return form.watch(field as keyof AuthForm);
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

  // ──────────────────────────────────────────────────────────────────────────
  // 3.4. Soumission finale du formulaire
  // ──────────────────────────────────────────────────────────────────────────
  const onSubmit = async (data: AuthForm) => {
    if (isLoading) return;

    // En mode inscription, on vérifie qu'on est bien à la dernière étape
    if (!isLogin && step !== steps.length - 1) {
        nextStep();
          return;
      }

    setIsLoading(true);

    try {
      // -- Mode Connexion --
      if (isLogin) {
        if (
          data.username === TEMP_CREDENTIALS.username &&
          data.password === TEMP_CREDENTIALS.password
        ) {
          toast({
            title: "🎉 Connexion réussie !",
            description: `Bienvenue, ${data.username} !`,
            variant: "default",
            duration: 3000,
            className: "bg-primary text-primary-foreground",
          });
          setLocation("/dashboard");
        } else {
          toast({
            title: "Erreur",
            description: "Identifiants invalides (utilisez admin / Samatar1983)",
            variant: "destructive",
            duration: 3000,
          });
        }
      }
      // -- Mode Inscription --
      else {
        // Simuler un délai de 10 secondes
        await new Promise(resolve => setTimeout(resolve, 10000));
        toast({
          title: "✨ Inscription réussie !",
          description: `Rôle choisi : ${data.role}. Vous pouvez maintenant vous connecter.`,
          variant: "default",
          duration: 5000,
          className: "bg-primary text-primary-foreground",
        });
        // On repasse en mode login après l’inscription
        setIsLogin(true);
        form.reset();
        setStep(0);
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
            {isLogin ? "Me connecter" : "Inscription"}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                        Se souvenir de moi
                      </Label>
                    </div>
                    <Button
                      type="submit"
                      className="w-full mb-2 bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                    >
                      Connexion
                    </Button>
                    <div className="text-center">
                      <Link href="../../ForgotPasswordForm" className="text-[hsl(252,85%,60%)] text-sm hover:underline">
                        Mot de passe oublié ?
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
                        {step === 3 && <ConfirmationStep form={form} />}
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
                        Retour
                      </Button>

                      {/* Si on n'est pas à la dernière étape → Bouton Suivant */}
                      {step < steps.length - 1 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="flex items-center gap-2"
                        >
                          Suivant
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
                            Inscription en cours...
                          </>
                        ) : (
                          "Confirmer l'inscription"
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
                    <h3 className="text-lg font-semibold text-[hsl(252,85%,60%)]">Pas encore de compte?</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      L'Espace livreur, votre accès requis une présence au siège afin de valider vos documents et activer votre compte.
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
                  {isLogin ? "Créer un compte" : "Retour à la connexion"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
