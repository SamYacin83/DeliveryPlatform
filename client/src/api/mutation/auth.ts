import axios from 'axios';
import axiosManager, { ServiceAPI } from '../axiosManager';

interface LoginRequest {
  email: string;
  password: string;
}

interface User {
id: string;
  email: string;
  userName?: string;
  role?: string | string[];
}

interface LoginResponse {
  user: User;
  accessToken?: string;
}
/*
export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    const response = await authApi.post('login', credentials, {
      params: { useCookies: true }
    }).then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
  
      return response.data;
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Login error:', error);
    throw error;
  }
};
*//*
export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    const response = await authApi.post('login', credentials, {
      params: { useCookies: true },
      withCredentials: true
    });

    // Log complet de la réponse pour debug
    console.log('Complete response:', response);

    // Si data est une chaîne vide mais que le login est réussi (statut 200)
    if (response.status === 200) {
      // Vérifions s'il y a des informations dans les headers
      console.log('Response headers:', response.headers);
      
      // On peut essayer de récupérer les cookies
      const cookies = response.headers['set-cookie'];
      console.log('Cookies:', cookies);

      // Si nous avons un cookie d'authentification mais pas de data
      // On pourrait faire une requête supplémentaire pour obtenir les infos utilisateur
      try {
        const userResponse = await authApi.get<User>('account/user-info', {
          withCredentials: true
        });
        if (userResponse.data) {
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          return userResponse.data;
        }
      } catch (userError) {
        console.error('Error fetching user data:', userError);
      }
    }

    throw new Error('No user data received from server');

  } catch (error: unknown) {
    console.error('Login error:', error);
    if (axios.isAxiosError(error)) {
      console.log('Error response:', error.response);
      throw new Error(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    }
    throw error;
  }
};
*/
export const login = async (credentials: LoginRequest): Promise<User> => {
  try {
    const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    
    // Login
    const loginResponse = await authApi.post('login', credentials, {
      params: { useCookies: true },
      withCredentials: true
    });

    if (loginResponse.status === 200) {
      // Attendre un peu pour laisser le cookie être défini
      await new Promise(resolve => setTimeout(resolve, 100));

      try {
        // Essayer d'abord manage/info
        const userResponse = await authApi.get<User>('manage/info', {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'X-XSRF-TOKEN': document.cookie.match(/XSRF-TOKEN=(.*?);/)?.[1] || ''
          }
        }).catch(async () => {
          // Si ça échoue, essayer api/user
          return await authApi.get<User>('api/user', {
            withCredentials: true
          });
        });

        if (userResponse?.data) {
          localStorage.setItem("user", JSON.stringify(userResponse.data));
          return userResponse.data;
        }
      } catch (userError) {
        console.error('Error fetching user data:', userError);
        // Log détaillé des cookies pour debug
        console.log('Cookies:', document.cookie);
      }
    }

    throw new Error('No user data received from server');

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Log détaillé de l'erreur
      console.log('Full error details:', {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        cookies: document.cookie
      });
      
      throw new Error(
        error.response?.data?.message || 
        'Login failed. Please check your credentials.'
      );
    }
    throw error;
  }
};
export const logout = () => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  return authApi.post('logout', {}, { withCredentials: true });
};

export const refreshToken = async (): Promise<LoginResponse> => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const response = await authApi.post<LoginResponse>('refresh-token', {}, { 
    withCredentials: true 
  });
  return response.data;
};

export default {
  login,
  logout,
  refreshToken
};
