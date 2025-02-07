import { User } from '@/types';
import { AppError } from './errorHandler';
import 	{ getAuthStatusOptions } from '../api/Queries/getAuthState';

export const validateStoredUser = async (): Promise<User | null> => {
  try {
    const storedUserData = localStorage.getItem('user');
    if (!storedUserData) {
      return null;
    }

    const user = JSON.parse(storedUserData) as User;
    
    // Vérifie si le statut du connexions est toujours valide
    const isValid = getAuthStatusOptions();
    if (!isValid) {
      localStorage.removeItem('user');
      throw new AppError('Session expirée', {
        userMessage: 'Votre session a expiré. Veuillez vous reconnecter.',
        logError: true
      });
    }

    return user;
  } catch (error) {
    localStorage.removeItem('user');
    if (error instanceof AppError) {
      throw error;
    }
    return null;
  }
};
