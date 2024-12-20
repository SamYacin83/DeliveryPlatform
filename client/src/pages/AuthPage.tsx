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
  role: UserRole;
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
    <div className="flex items-center justify-center py-8 px-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Connexion" : "Inscription"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="space-y-2">
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
                <select 
                  {...form.register("role", { required: true })}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <option value="client">Client</option>
                  <option value="delivery">Livreur</option>
                  <option value="supplier">Fournisseur</option>
                </select>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full mb-2">
                  {isLogin ? "Se connecter" : "S'inscrire"}
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full text-sm text-muted-foreground hover:text-primary"
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
