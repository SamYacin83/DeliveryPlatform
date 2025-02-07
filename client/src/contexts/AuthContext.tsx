import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/mutation/auth';
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
        // If error is 401, clear user state and force re-login
        if (error.response?.status === 401) {
          setUser(null);
          localStorage.removeItem('user');
          throw new AppError('Session expirée', {
            userMessage: 'Votre session a expiré. Veuillez vous reconnecter.',
            logError: true
          });
        }
        return Promise.reject(error);
      }
    );
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const validatedUser = await validateStoredUser();
        if (validatedUser) {
          setUser(validatedUser);
        } else {
          // Si pas d'utilisateur valide, nettoyer l'état
          setUser(null);
          localStorage.removeItem('user');
        }
      } catch (error) {
        // En cas d'erreur, nettoyer l'état
        setUser(null);
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const credentials: LoginRequest = { email, password };
      const userData = await apiLogin(credentials);
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