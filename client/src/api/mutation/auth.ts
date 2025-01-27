import axiosManager, { ServiceAPI } from '../axiosManager';
interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (credentials: LoginRequest): Promise<void> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    const response = await authApi.post('login', credentials, {
      params: { useCookies: true }
    });
    console.log('Login response:', response);
  } catch (error: unknown) {
    console.error('Login error:', error);
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
