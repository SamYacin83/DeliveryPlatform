import axios from 'axios';
import axiosManager, { ServiceAPI } from '../axiosManager';

interface LoginRequest {
  email: string;
  password: string;
}
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginResponse {
  user: User;
  accessToken?: string;
}
export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

    // 1) Premier appel : POST /login
    const response = await authApi.post<LoginResponse>('login', credentials, {
      params: { useCookies: true },
      withCredentials: true, 
    });

    // 2) Vérifie si le backend a renvoyé un user dans la réponse
    let user = response.data.user;
    const isLoggedIn = response.status === 200;

    // 3) Si on est loggé (status 200) mais que `user` n'est pas renvoyé,
    //    on fait un 2ᵉ appel : GET /GetUserInfo
    if (isLoggedIn && !user) {
      const userResponse = await authApi.get<User>('GetUserInfo', {
        withCredentials: true,
      });
      user = userResponse.data;
    }

    // 4) Stocker l'utilisateur si on l'a récupéré
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return user; // On retourne l'objet User
    }

    // Si on n'a pas pu récupérer l'utilisateur, on lance une erreur
    throw new Error('No user info returned from login or GetUserInfo.');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  return authApi.post('logout', {}, { withCredentials: true });
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const response = await authApi.post<LoginResponse>('refresh', {}, { 
    withCredentials: true 
  });
  return response.data;
};

export default {
  login,
  logout,
  refreshToken
};
