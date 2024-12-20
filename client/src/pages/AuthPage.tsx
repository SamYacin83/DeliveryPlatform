import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { UserRole } from "../types";

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
  const { login, register } = useUser();
  const { toast } = useToast();
  const form = useForm<AuthForm>();

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
              <div className="space-y-2">
                {!isLogin && (
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
                  </>
                )}
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
                {!isLogin && (
                  <select 
                    {...form.register("role", { required: !isLogin })}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="client">Client</option>
                    <option value="delivery">Livreur</option>
                    <option value="supplier">Fournisseur</option>
                  </select>
                )}

                {form.watch("role") === "client" && (
                  <div className="space-y-2 border-t pt-2">
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

                {form.watch("role") === "delivery" && (
                  <div className="space-y-2 border-t pt-2">
                    <h3 className="text-sm font-medium">Documents requis</h3>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...form.register("documents", { required: true })}
                      className="h-9"
                      multiple
                    />
                    <p className="text-xs text-muted-foreground">
                      Pièce d'identité, permis de conduire, carte grise, assurance
                    </p>
                  </div>
                )}
              </div>
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full mb-2 bg-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,55%)] text-white transition-colors"
                >
                  {isLogin ? "Se connecter" : "S'inscrire"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-[hsl(252,85%,60%)]"
                  onClick={() => setIsLogin(!isLogin)}
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
