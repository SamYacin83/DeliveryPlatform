import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, UserRole } from '../types';

interface AuthData {
  username: string;
  password: string;
  email?: string;
  role: UserRole;
}

type AuthResponse = 
  | { ok: true; user: User }
  | { ok: false; message: string };

async function handleAuthRequest(
  url: string,
  data: AuthData
): Promise<AuthResponse> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!response.ok) {
      if (response.status >= 500) {
        return { ok: false, message: response.statusText };
      }

      const message = await response.text();
      return { ok: false, message };
    }

    const user = await response.json();
    return { ok: true, user };
  } catch (error: any) {
    return { ok: false, message: error.toString() };
  }
}

async function fetchUser(): Promise<User | null> {
  const response = await fetch('/api/user', {
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status === 401) {
      return null;
    }
    throw new Error(await response.text());
  }

  return response.json();
}

export function useUser() {
  const queryClient = useQueryClient();

  const { data: user, error, isLoading } = useQuery<User | null>({
    queryKey: ['/api/user'],
    queryFn: fetchUser,
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (data: AuthData) => handleAuthRequest('/api/login', data),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.setQueryData(['/api/user'], response.user);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: AuthData) => handleAuthRequest('/api/register', data),
    onSuccess: (response) => {
      if (response.ok) {
        queryClient.setQueryData(['/api/user'], response.user);
      }
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error(await response.text());
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(['/api/user'], null);
    },
  });

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
}
