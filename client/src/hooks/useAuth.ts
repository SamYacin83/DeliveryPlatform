import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../api/mutation/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => {
      console.log("useAuth mutation called with:", credentials);
      return loginApi(credentials);
    },
    onSuccess: (data) => {
      console.log('Connexion réussie', data);
    },
    onError: (error) => {
      console.error('Erreur de connexion:', error);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
};

export default useAuth;
