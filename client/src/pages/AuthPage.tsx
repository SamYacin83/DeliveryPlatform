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
    city: string;
    postalCode: string;
    country: string;
  };
  documents?: File[];
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(0);
  const { login, register } = useUser();
  const { toast } = useToast();
  const form = useForm<AuthForm>();
  
  const steps = [
    { title: "Informations personnelles", fields: ["firstName", "lastName", "email", "phone"] },
    { title: "Choisir votre rôle", fields: ["role"] },
    { title: "Détails supplémentaires", fields: ["address", "documents"] },
    { title: "Confirmation", fields: [] }
  ];

  const canProceed = () => {
    const currentFields = steps[step].fields;
    if (step === 0) {
      return form.watch("firstName") && 
             form.watch("lastName") && 
             form.watch("email") && 
             form.watch("phone") &&
             form.watch("username") &&
             form.watch("password");
    } else if (step === 1) {
      return form.watch("role");
    } else if (step === 2) {
      if (form.watch("role") === "client") {
        return form.watch("address.street") &&
               form.watch("address.city") &&
               form.watch("address.postalCode") &&
               form.watch("address.country");
      } else if (form.watch("role") === "delivery") {
        return form.watch("documents") && form.watch("documents").length > 0;
      }
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
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
      <Card className="w-full max-w-sm shadow-sm">
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
                      {...form.register("username", { required: true })}
                      className="h-9"
                    />
                    <Input
                      type="password"
                      placeholder="Mot de passe"
                      {...form.register("password", { required: true })}
                      className="h-9"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {/* Step indicators */}
                    <div className="flex justify-center gap-2 mb-4">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            index === step ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      ))}
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
                              <Input
                                placeholder="Prénom"
                                {...form.register("firstName", { required: !isLogin })}
                                className="h-9"
                              />
                              <Input
                                placeholder="Nom"
                                {...form.register("lastName", { required: !isLogin })}
                                className="h-9"
                              />
                            </div>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...form.register("email", { required: !isLogin })}
                              className="h-9"
                            />
                            <Input
                              type="tel"
                              placeholder="Téléphone"
                              {...form.register("phone", { required: !isLogin })}
                              className="h-9"
                            />
                            <Input
                              placeholder="Nom d'utilisateur"
                              {...form.register("username", { required: true })}
                              className="h-9"
                            />
                            <Input
                              type="password"
                              placeholder="Mot de passe"
                              {...form.register("password", { required: true })}
                              className="h-9"
                            />
                          </>
                        )}

                        {step === 1 && (
                          <select 
                            {...form.register("role", { required: !isLogin })}
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
                              {...form.register("address.street", { required: true })}
                              className="h-9"
                            />
                            <Input
                              placeholder="Ville"
                              {...form.register("address.city", { required: true })}
                              className="h-9"
                            />
                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                placeholder="Code postal"
                                {...form.register("address.postalCode", { required: true })}
                                className="h-9"
                              />
                              <Input
                                placeholder="Pays"
                                {...form.register("address.country", { required: true })}
                                className="h-9"
                              />
                            </div>
                          </div>
                        )}

                        {step === 2 && form.watch("role") === "delivery" && (
                          <div className="space-y-2">
                            <h3 className="text-sm font-medium">Documents requis</h3>
                            <Input
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              {...form.register("documents", { required: !isLogin })}
                              className="h-9"
                              multiple
                            />
                            <p className="text-xs text-muted-foreground">
                              Pièce d'identité, permis de conduire, carte grise, assurance
                            </p>
                          </div>
                        )}

                        {step === 3 && (
                          <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-center">Récapitulatif de vos informations</h3>
                            <div className="space-y-3 bg-muted/30 p-4 rounded-lg">
                              <div>
                                <h4 className="text-sm font-medium text-muted-foreground">Informations personnelles</h4>
                                <div className="grid grid-cols-2 gap-2 mt-2">
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
                                    <p className="text-sm">{form.watch("email")}</p>
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
                                <div>
                                  <h4 className="text-sm font-medium text-muted-foreground">Documents fournis</h4>
                                  <p className="text-sm mt-2">
                                    {form.watch("documents")?.length} document(s) joint(s)
                                  </p>
                                </div>
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
