import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password reset logic
    console.log("Reset password for:", email);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full flex items-center justify-center">
      <Card className="w-full max-w-sm mx-4 shadow-sm">
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
          <Button type="submit" className="w-full">
            Réinitialiser le mot de passe
          </Button>
          <Button variant="ghost" className="w-full flex items-center gap-2" asChild>
            <Link href="/auth">
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
