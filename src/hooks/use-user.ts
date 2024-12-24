import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, UserRole } from '../types';
import { mockUser } from '../mocks/data';

interface AuthData {
  username: string;
  password: string;
  email?: string;
  role: UserRole;
}

type AuthResponse = 
  | { ok: true; user: User }
  | { ok: false; message: string };

async function mockAuthRequest(data: AuthData): Promise<AuthResponse> {
  // Simuler un délai de réponse
  await new Promise(resolve => setTimeout(resolve, 500));
  
  if (data.username === 'user1' && data.password === 'password') {
    return { ok: true, user: mockUser };
  }
  
  return { ok: false, message: 'Identifiants invalides' };
}

async function mockFetchUser(): Promise<User | null> {
  // Simuler un délai de réponse
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockUser;
}

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, error, isLoading } = useQuery<User | null>({
    queryKey: ['user'],
    queryFn: mockFetchUser,
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: mockAuthRequest,
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.setQueryData(['user'], response.user);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: mockAuthRequest,
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.setQueryData(['user'], response.user);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true };
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
    },
  });

  return {
    user,
    error,
    isLoading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
    isAuthenticating: loginMutation.isPending || registerMutation.isPending,
  };
}
