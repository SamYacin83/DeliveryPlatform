import axiosManager, { ServiceAPI } from '../axiosManager';
import { AppError, errorMessages } from '../../utils/errorHandler';

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

interface RefreshTokenResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
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
      params: { useCookies: true }
    });

    // 2) Vérifie si le backend a renvoyé un user dans la réponse
    let user = response.data.user;
    const isLoggedIn = response.status === 200;

    // 3) Si on est loggé (status 200) mais que `user` n'est pas renvoyé,
    //    on fait un 2ᵉ appel : GET /GetUserInfo
    if (isLoggedIn && !user) {
      const userResponse = await authApi.get<User>('GetUserInfo', {});
      user = userResponse.data;
    }

    // 4) Stocker l'utilisateur si on l'a récupéré
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    }

    // Si on n'a pas pu récupérer l'utilisateur, on lance une erreur personnalisée
    throw new AppError('No user info returned from login or GetUserInfo.', {
      userMessage: errorMessages.auth.noUserInfo,
      logError: true
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    // Pour les autres types d'erreurs
    throw new AppError('Login failed', {
      userMessage: errorMessages.auth.loginFailed,
      logError: true
    });
  }
};

export const logout = () => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  return authApi.post('logout', {});
};

export const refreshToken = async (): Promise<RefreshTokenResponse> => {
  const authApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

  // On ne passe aucun token en body si le refresh token est dans un cookie HttpOnly
  const response = await authApi.post<RefreshTokenResponse>('refresh', {}, {
    withCredentials: true
  });

  // La réponse contient le nouvel access token (et éventuellement un nouveau refresh token)
  return response.data;
};


export default {
  login,
  logout,
  refreshToken
};
