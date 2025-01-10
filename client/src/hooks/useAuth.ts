import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../api/mutation/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      // Vous pouvez ajouter ici d'autres actions après une connexion réussie
      console.log('Connexion réussie', data);
    },
    onError: (error) => {
      // Gérer les erreurs de connexion ici
      console.error('Erreur de connexion:', error);
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};

export default useAuth;
