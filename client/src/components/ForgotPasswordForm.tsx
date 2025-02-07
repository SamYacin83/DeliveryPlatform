import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simuler un délai pour démontrer l'animation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // TODO: Implement actual password reset logic here
      toast({
        description: "Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-4 px-4 bg-background">
      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Mot de passe oublié</CardTitle>
          <CardDescription className="text-center">
            Entrez l'adresse email associée à votre compte et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-9"
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Réinitialiser le mot de passe"
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full flex items-center gap-2" 
              asChild
              disabled={isLoading}
            >
              <Link to="/auth">
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
