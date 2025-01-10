import axiosManager, { ServiceAPI } from '../axiosManager';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  refreshToken: string;
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.auth);
    console.log('Sending login request with:', credentials);
    const response = await authApi.post('login?useCookies=true', credentials);
    console.log('Login response:', response.data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Une erreur est survenue lors de la connexion');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export default {
  login,
  logout,
};
