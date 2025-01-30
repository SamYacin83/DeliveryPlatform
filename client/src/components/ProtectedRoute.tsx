import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { handleToast } from '@/utils/auth';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from "lucide-react";
import { validateStoredUser } from '@/utils/authValidation';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // Si l'authentification est en cours de chargement, on attend
        if (isLoading) return;

        // Si on a déjà un utilisateur dans le contexte, pas besoin de valider
        if (user) {
          setIsValidating(false);
          return;
        }

        // Sinon, on essaie de valider l'utilisateur stocké
        const validatedUser = await validateStoredUser();
        if (!validatedUser) {
          handleToast(
            toast,
            "Accès refusé",
            "Veuillez vous connecter pour accéder à cette page",
            true
          );
          setLocation('/auth');
        }
      } catch (error) {
        handleToast(
          toast,
          "Session expirée",
          "Votre session a expiré. Veuillez vous reconnecter.",
          true
        );
        setLocation('/auth');
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, [user, isLoading, setLocation, toast]);

  // Pendant le chargement initial ou la validation, on affiche un loader
  if (isLoading || isValidating) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Si l'utilisateur est authentifié, on affiche le contenu
  if (user) {
    return <>{children}</>;
  }

  // Dans tous les autres cas, on ne rend rien
  return null;
};

export default ProtectedRoute;
