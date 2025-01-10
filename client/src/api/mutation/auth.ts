import axiosManager, { ServiceAPI } from '../axiosManager';

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (credentials: LoginRequest): Promise<void> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    console.log('Sending login request');
    await authApi.post('login?useCookies=true', credentials, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log('Login successful, checking cookies:', document.cookie);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  return authApi.post('logout', {}, { withCredentials: true });
};

export default {
  login,
  logout
};
