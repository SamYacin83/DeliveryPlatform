import { User } from '@/types';
import { AppError } from './errorHandler';
import axiosManager, { ServiceAPI } from '../api/axiosManager';

export const isValidToken = async (): Promise<boolean> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    await authApi.get('validate-token', { withCredentials: true });
    return true;
  } catch (error) {
    return false;
  }
};

export const validateStoredUser = async (): Promise<User | null> => {
  try {
    const storedUserData = localStorage.getItem('user');
    if (!storedUserData) {
      return null;
    }

    const user = JSON.parse(storedUserData) as User;
    
    // Vérifie si le token est toujours valide
    const isValid = await isValidToken();
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
