import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/mutation/auth';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AUTH_COOKIE_NAME = '.AspNetCoreIdentity.Application';
const USER_DATA_KEY = 'userData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem(USER_DATA_KEY);
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      // Vérifier si le cookie d'authentification existe
      const hasAuthCookie = document.cookie
        .split(';')
        .some(item => item.trim().startsWith(`${AUTH_COOKIE_NAME}=`));

      if (!hasAuthCookie) {
        // Si pas de cookie, on déconnecte l'utilisateur
        setUser(null);
        localStorage.removeItem(USER_DATA_KEY);
      } else if (!user) {
        // Si cookie présent mais pas d'utilisateur en state, on récupère du localStorage
        const savedUser = localStorage.getItem(USER_DATA_KEY);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userData = await apiLogin({ email, password });
      setUser(userData.user);
      // Sauvegarder les données utilisateur dans le localStorage
      localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData.user));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      // Nettoyer le localStorage
      localStorage.removeItem(USER_DATA_KEY);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout
    }),
    [user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
