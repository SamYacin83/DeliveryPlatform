import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, logout as apiLogout, refreshToken as apiRefreshToken } from '../api/mutation/auth';
import axiosManager, { ServiceAPI } from '../api/axiosManager';
import { validateStoredUser } from '@/utils/authValidation';
import { AppError, errorMessages } from '../utils/errorHandler';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios interceptor for authentication
  useEffect(() => {
    const instance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    
    // Add request interceptor to include authentication token
    instance.interceptors.request.use(
      (config) => {
        const user = localStorage.getItem('user');
        if (user) {
          const token = JSON.parse(user).token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for handling auth errors
    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            const userData = await apiRefreshToken();
            setUser(userData);
            
            // Update the token in the original request
            originalRequest.headers.Authorization = `Bearer ${userData.token}`;
            
            // Retry the original request
            return instance(originalRequest);
          } catch (refreshError) {
            // If refresh fails, logout
            setUser(null);
            localStorage.removeItem('user');
            throw new AppError('Session expirée', {
              userMessage: 'Votre session a expiré. Veuillez vous reconnecter.',
              logError: true
            });
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // D'abord, on essaie de valider l'utilisateur stocké
        const validatedUser = await validateStoredUser();
        if (validatedUser) {
          setUser(validatedUser);
          setIsLoading(false);
          return;
        }

        // Si pas d'utilisateur valide stocké, on essaie de rafraîchir le token
        const userData = await apiRefreshToken();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch (error) {
        // En cas d'erreur, on nettoie l'état
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Periodic token refresh
  useEffect(() => {
    if (user) {
      const refreshInterval = setInterval(async () => {
        try {
          // Valide d'abord l'utilisateur actuel
          const validatedUser = await validateStoredUser();
          if (validatedUser) {
            setUser(validatedUser);
            return;
          }

          // Si la validation échoue, essaie de rafraîchir le token
          const userData = await apiRefreshToken();
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
          if (error instanceof AppError) {
            // Si c'est une erreur de session expirée, on nettoie tout
            setUser(null);
            localStorage.removeItem('user');
          }
        }
      }, 4 * 60 * 1000); // Refresh every 4 minutes

      return () => clearInterval(refreshInterval);
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      const userData = await apiLogin(credentials);
      console.log('Logged in user:', userData);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      setUser(null);
      localStorage.removeItem('user');
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError('Erreur de connexion', {
        userMessage: errorMessages.auth.loginFailed,
        logError: true
      });
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (error) {
      // On log l'erreur technique mais on ne la propage pas
      if (error instanceof AppError) {
        console.error('Logout API error:', error.message);
      } else {
        console.error('Logout API error:', error);
      }
    } finally {
      // On nettoie toujours les données locales, que l'API ait réussi ou non
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;