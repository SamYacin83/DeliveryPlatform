import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { handleToast } from '@/utils/auth';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from "lucide-react";
import { validateStoredUser } from '@/utils/authValidation';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // Si l'authentification est en cours de chargement, on attend
        if (isLoading) return;

        // Si on a déjà un utilisateur dans le contexte, on vérifie les rôles
        if (user) {
          if (allowedRoles && !allowedRoles.includes(user.roles)) {
            handleToast(
              toast,
              "Accès refusé",
              "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
              true
            );
            setLocation('/');
            return;
          }
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
          return;
        }

        // Vérifier les rôles pour l'utilisateur validé
        if (allowedRoles && !allowedRoles.includes(validatedUser.roles)) {
          handleToast(
            toast,
            "Accès refusé",
            "Vous n'avez pas les permissions nécessaires pour accéder à cette page",
            true
          );
          setLocation('/');
          return;
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
  }, [user, isLoading, setLocation, toast, allowedRoles]);

  if (isValidating || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
