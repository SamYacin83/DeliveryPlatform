import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UserRole } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FileProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'completed' | 'error';
}

interface DocumentProgress {
  identityCard?: FileProgress;
  driversLicense?: FileProgress;
  vehicleRegistration?: FileProgress;
  insurance?: FileProgress;
}

interface AuthForm {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  address?: {
    street: string;
    streetNumber: string;
    apartment?: string;
    building?: string;
    floor?: string;
    additionalInfo?: string;
    city: string;
    postalCode: string;
    country: string;
    region?: string;
  };
  documents?: {
    identityCard?: File[];
    driversLicense?: File[];
    vehicleRegistration?: File[];
    insurance?: File[];
  };
}

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
  identityCard: z.any().refine((files) => files?.[0] instanceof File, "La pièce d'identité est requise"),
  driversLicense: z.any().refine((files) => files?.[0] instanceof File, "Le permis de conduire est requis"),
  vehicleRegistration: z.any().refine((files) => files?.[0] instanceof File, "La carte grise est requise"),
  insurance: z.any().refine((files) => files?.[0] instanceof File, "L'assurance est requise"),
});

const authSchema = z.object({
  username: z.string()
    .min(3, "Le nom d'utilisateur doit contenir au moins 3 caractères")
    .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères"),
  password: z.string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
    .regex(/[a-z]/, "Le mot de passe doit contenir au moins une minuscule")
    .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("L'email est invalide"),
  phone: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, "Le numéro de téléphone est invalide"),
  role: z.enum(["client", "delivery", "supplier"], {
    required_error: "Le rôle est requis",
    invalid_type_error: "Le rôle sélectionné est invalide",
  }),
  address: addressSchema.optional(),
  documents: documentSchema.optional(),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<DocumentProgress>({});
  const { login, register } = useUser();
  const { toast } = useToast();
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
        country: ""
      }
    }
  });

  const handleFileChange = (documentType: keyof DocumentProgress) => async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadProgress(prev => ({
      ...prev,
      [documentType]: { progress: 0, status: 'uploading' }
    }));

    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({
        ...prev,
        [documentType]: { 
          progress: Math.min(progress, 100),
          status: progress >= 100 ? 'completed' : 'uploading'
        }
      }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };
  
  const steps = [
    { title: "Informations personnelles", fields: ["firstName", "lastName", "email", "phone", "username", "password"] },
    { title: "Choisir votre rôle", fields: ["role"] },
    { title: "Détails supplémentaires", fields: ["address", "documents"] },
    { title: "Confirmation", fields: [] }
  ];

  const canProceed = () => {
    const currentFields = steps[step].fields;
    if (isLogin) return true;
    
    // Check validation only for fields in the current step
    const errors = form.formState.errors;
    const hasErrors = currentFields.some(field => {
      if (field === "address") {
        return form.watch("role") === "delivery" && errors.address;
      }
      if (field === "documents") {
        return form.watch("role") === "delivery" && errors.documents;
      }
      return errors[field as keyof typeof errors];
    });

    // Check if required fields are filled
    const isComplete = currentFields.every(field => {
      if (field === "address" || field === "documents") {
        return true; // These are checked separately based on role
      }
      return form.watch(field as keyof AuthForm);
    });

    return !hasErrors && isComplete;
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
      setUploadProgress({}); // Reset upload progress when moving to next step
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      setUploadProgress({}); // Reset upload progress when moving to previous step
    }
  };

  const onSubmit = async (data: AuthForm) => {
    try {
      const result = isLogin ? await login(data) : await register(data);
      if (!result.ok) {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center py-4 px-4 bg-background">
      <Card className="w-full max-w-2xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Connexion" : "Inscription"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-2"
                  >
                    <Input
                      placeholder="Nom d'utilisateur"
                      {...form.register("username")}
                      className="h-9"
                    />
                    {form.formState.errors.username && <p className="text-red-500 text-xs mt-1">{form.formState.errors.username.message}</p>}
                    <Input
                      type="password"
                      placeholder="Mot de passe"
                      {...form.register("password")}
                      className="h-9"
                    />
                    {form.formState.errors.password && <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Progress bar and step indicators */}
                    <div className="space-y-4 mb-6">
                      {/* Progress percentage */}
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Progression</span>
                        <span>{Math.round((step / (steps.length - 1)) * 100)}%</span>
                      </div>
                      {/* Progress bar */}
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-primary"
                          initial={{ width: 0 }}
                          animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      {/* Step indicators */}
                      <div className="grid grid-cols-4 gap-4 md:gap-8 relative">
                        {steps.map((s, index) => (
                          <div key={index} className="flex flex-col items-center text-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                index < step
                                  ? "bg-primary border-primary text-primary-foreground"
                                  : index === step
                                  ? "border-primary text-primary"
                                  : "border-muted text-muted-foreground"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className="text-xs mt-1 text-muted-foreground">{s.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-2"
                      >
                        {step === 0 && (
                          <>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="relative">
                                <Input
                                  placeholder="Prénom"
                                  {...form.register("firstName")}
                                  className={`h-9 ${
                                    form.formState.errors.firstName
                                      ? "border-red-500 focus:ring-red-500"
                                      : form.formState.touchedFields.firstName
                                      ? "border-green-500 focus:ring-green-500"
                                      : ""
                                  }`}
                                />
                                {form.formState.touchedFields.firstName && !form.formState.errors.firstName && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </motion.div>
                                )}
                              </div>
                              {form.formState.errors.firstName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.firstName.message}</p>}
                              <Input
                                placeholder="Nom"
                                {...form.register("lastName")}
                                className="h-9"
                              />
                              {form.formState.errors.lastName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.lastName.message}</p>}
                            </div>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...form.register("email")}
                              className="h-9"
                            />
                            {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
                            <Input
                              type="tel"
                              placeholder="Téléphone"
                              {...form.register("phone")}
                              className="h-9"
                            />
                            {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>}
                            <Input
                              placeholder="Nom d'utilisateur"
                              {...form.register("username")}
                              className="h-9"
                            />
                             {form.formState.errors.username && <p className="text-red-500 text-xs mt-1">{form.formState.errors.username.message}</p>}
                            <Input
                              type="password"
                              placeholder="Mot de passe"
                              {...form.register("password")}
                              className="h-9"
                            />
                             {form.formState.errors.password && <p className="text-red-500 text-xs mt-1">{form.formState.errors.password.message}</p>}
                          </>
                        )}

                        {step === 1 && (
                          <select 
                            {...form.register("role")}
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                            <option value="">Sélectionnez votre rôle</option>
                            <option value="client">Client</option>
                            <option value="delivery">Livreur</option>
                            <option value="supplier">Fournisseur</option>
                          </select>
                        )}

                        {step === 2 && form.watch("role") === "client" && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Adresse</h3>
                            <Input
                              placeholder="Rue"
                              {...form.register("address.street")}
                              className="h-9"
                            />
                            {form.formState.errors.address?.street && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.street.message}</p>}
                            <Input
                              placeholder="Ville"
                              {...form.register("address.city")}
                              className="h-9"
                            />
                            {form.formState.errors.address?.city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.city.message}</p>}
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Code postal"
                                {...form.register("address.postalCode")}
                                className="h-9"
                              />
                              {form.formState.errors.address?.postalCode && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.postalCode.message}</p>}
                              <Input
                                placeholder="Pays"
                                {...form.register("address.country")}
                                className="h-9"
                              />
                              {form.formState.errors.address?.country && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.country.message}</p>}
                            </div>
                          </div>
                        )}

                        {step === 2 && form.watch("role") === "delivery" && (
                          <div className="space-y-4">
                            <fieldset className="space-y-4 border rounded-lg p-4">
                              <legend className="text-sm font-medium px-2">Adresse</legend>
                              
                              <div className="space-y-4">
                                {/* Rue et numéro */}
                                <div className="grid grid-cols-3 gap-2">
                                  <div className="col-span-2">
                                    <label className="text-sm mb-1 block">Rue</label>
                                    <Input
                                      placeholder="Nom de la rue"
                                      {...form.register("address.street")}
                                      className="h-9"
                                    />
                                    {form.formState.errors.address?.street && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.street.message}</p>}
                                  </div>
                                  <div>
                                    <label className="text-sm mb-1 block">Numéro</label>
                                    <Input
                                      placeholder="N°"
                                      {...form.register("address.streetNumber")}
                                      className="h-9"
                                    />
                                    {form.formState.errors.address?.streetNumber && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.streetNumber.message}</p>}
                                  </div>
                                </div>

                                {/* Détails du bâtiment */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-sm mb-1 block">Bâtiment</label>
                                    <Input
                                      placeholder="Bâtiment"
                                      {...form.register("address.building")}
                                      className="h-9"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm mb-1 block">Étage</label>
                                    <Input
                                      placeholder="Étage"
                                      {...form.register("address.floor")}
                                      className="h-9"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm mb-1 block">Appartement</label>
                                  <Input
                                    placeholder="N° d'appartement"
                                    {...form.register("address.apartment")}
                                    className="h-9"
                                  />
                                </div>

                                <div>
                                  <label className="text-sm mb-1 block">Informations complémentaires</label>
                                  <Input
                                    placeholder="Digicode, instructions de livraison..."
                                    {...form.register("address.additionalInfo")}
                                    className="h-9"
                                  />
                                </div>

                                {/* Ville et code postal */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-sm mb-1 block">Ville</label>
                                    <Input
                                      placeholder="Ville"
                                      {...form.register("address.city")}
                                      className="h-9"
                                    />
                                    {form.formState.errors.address?.city && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.city.message}</p>}
                                  </div>
                                  <div>
                                    <label className="text-sm mb-1 block">Code postal</label>
                                    <Input
                                      placeholder="Code postal"
                                      {...form.register("address.postalCode")}
                                      className="h-9"
                                    />
                                    {form.formState.errors.address?.postalCode && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.postalCode.message}</p>}
                                  </div>
                                </div>

                                {/* Région et pays */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <label className="text-sm mb-1 block">Région</label>
                                    <Input
                                      placeholder="Région"
                                      {...form.register("address.region")}
                                      className="h-9"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-sm mb-1 block">Pays</label>
                                    <Input
                                      placeholder="Pays"
                                      {...form.register("address.country")}
                                      className="h-9"
                                    />
                                    {form.formState.errors.address?.country && <p className="text-red-500 text-xs mt-1">{form.formState.errors.address.country.message}</p>}
                                  </div>
                                </div>
                              </div>
                            </fieldset>

                            <fieldset className="space-y-3 border rounded-lg p-4">
                              <legend className="text-sm font-medium px-2">Documents requis</legend>
                              
                              <div className="space-y-2">
                                <label className="text-sm">Pièce d'identité</label>
                                <div className="space-y-1">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    {...form.register("documents.identityCard")}
                                    className="h-9"
                                    onChange={handleFileChange('identityCard')}
                                  />
                                  {form.formState.errors.documents?.identityCard && <p className="text-red-500 text-xs mt-1">{form.formState.errors.documents.identityCard.message}</p>}
                                  {uploadProgress.identityCard && (
                                    <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress.identityCard.progress}%` }}
                                        transition={{ duration: 0.2 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm">Permis de conduire</label>
                                <div className="space-y-1">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    {...form.register("documents.driversLicense")}
                                    className="h-9"
                                    onChange={handleFileChange('driversLicense')}
                                  />
                                  {form.formState.errors.documents?.driversLicense && <p className="text-red-500 text-xs mt-1">{form.formState.errors.documents.driversLicense.message}</p>}
                                  {uploadProgress.driversLicense && (
                                    <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress.driversLicense.progress}%` }}
                                        transition={{ duration: 0.2 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm">Carte grise</label>
                                <div className="space-y-1">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    {...form.register("documents.vehicleRegistration")}
                                    className="h-9"
                                    onChange={handleFileChange('vehicleRegistration')}
                                  />
                                  {form.formState.errors.documents?.vehicleRegistration && <p className="text-red-500 text-xs mt-1">{form.formState.errors.documents.vehicleRegistration.message}</p>}
                                  {uploadProgress.vehicleRegistration && (
                                    <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress.vehicleRegistration.progress}%` }}
                                        transition={{ duration: 0.2 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm">Assurance</label>
                                <div className="space-y-1">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    {...form.register("documents.insurance")}
                                    className="h-9"
                                    onChange={handleFileChange('insurance')}
                                  />
                                  {form.formState.errors.documents?.insurance && <p className="text-red-500 text-xs mt-1">{form.formState.errors.documents.insurance.message}</p>}
                                  {uploadProgress.insurance && (
                                    <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                                      <motion.div
                                        className="h-full bg-primary"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress.insurance.progress}%` }}
                                        transition={{ duration: 0.2 }}
                                      />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-center">Récapitulatif de vos informations</h3>
                            <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                              <div className="space-y-3">
                                <h4 className="text-sm font-medium text-muted-foreground">Informations personnelles</h4>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                                  <div>
                                    <p className="text-sm font-medium">Nom</p>
                                    <p className="text-sm">{form.watch("lastName")}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Prénom</p>
                                    <p className="text-sm">{form.watch("firstName")}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Email</p>
                                    <p className="text-sm overflow-ellipsis overflow-hidden">{form.watch("email")}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Téléphone</p>
                                    <p className="text-sm">{form.watch("phone")}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Compte</h4>
                                <div className="mt-2">
                                  <div>
                                    <p className="text-sm font-medium">Nom d'utilisateur</p>
                                    <p className="text-sm">{form.watch("username")}</p>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Rôle</h4>
                                <p className="text-sm mt-2 capitalize">
                                  {form.watch("role") === "delivery" ? "Livreur" :
                                   form.watch("role") === "supplier" ? "Fournisseur" : "Client"}
                                </p>
                              </div>

                              {form.watch("role") === "client" && (
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Adresse</h4>
                                  <div className="mt-2">
                                    <p className="text-sm">{form.watch("address.street")}</p>
                                    <p className="text-sm">
                                      {form.watch("address.postalCode")} {form.watch("address.city")}
                                    </p>
                                    <p className="text-sm">{form.watch("address.country")}</p>
                                  </div>
                                </div>
                              )}

                              {form.watch("role") === "delivery" && (
                                <>
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Adresse</h4>
                                    <div className="mt-2">
                                      <p className="text-sm">{form.watch("address.street")}</p>
                                      <p className="text-sm">
                                        {form.watch("address.postalCode")} {form.watch("address.city")}
                                      </p>
                                      <p className="text-sm">{form.watch("address.country")}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-medium text-muted-foreground">Documents fournis</h4>
                                    <div className="mt-2 space-y-1">
                                      <p className="text-sm">
                                        • Pièce d'identité : {form.watch("documents.identityCard")?.[0]?.name || "Non fourni"}
                                      </p>
                                      <p className="text-sm">
                                        • Permis de conduire : {form.watch("documents.driversLicense")?.[0]?.name || "Non fourni"}
                                      </p>
                                      <p className="text-sm">
                                        • Carte grise : {form.watch("documents.vehicleRegistration")?.[0]?.name || "Non fourni"}
                                      </p>
                                      <p className="text-sm">
                                        • Assurance : {form.watch("documents.insurance")?.[0]?.name || "Non fourni"}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation buttons */}
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
                      {step < steps.length - 2 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="flex items-center gap-2"
                        >
                          Suivant
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : step === steps.length - 2 ? (
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!canProceed()}
                          className="flex items-center gap-2"
                        >
                          Vérifier
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          className="bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                        >
                          Confirmer l'inscription
                        </Button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-2">
                {isLogin && (
                  <Button 
                    type="submit" 
                    className="w-full mb-2 bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                  >
                    Se connecter
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-[hsl(252,85%,60%)]"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setStep(0);
                    setUploadProgress({});
                    form.reset();
                  }}
                >
                  {isLogin ? "Créer un compte" : "Déjà inscrit ?"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}