import { handleToast } from './auth';

export interface ErrorConfig {
  userMessage?: string;
  logError?: boolean;
}

export class AppError extends Error {
  constructor(
    message: string,
    public config: ErrorConfig = {}
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const errorMessages = {
  auth: {
    noUserInfo: "L'utilisateur n'est pas reconnu. Veuillez réessayer.",
    loginFailed: "La connexion a échoué. Veuillez réessayer plus tard.",
    technicalError: "Une erreur technique est survenue. Veuillez réessayer plus tard."
  }
};

export const handleError = (error: unknown, toast: any) => {
  if (error instanceof AppError) {
    const { message, config } = error;
    const userMessage = config.userMessage || errorMessages.auth.technicalError;
    
    if (config.logError) {
      console.error(message);
    }
    
    handleToast(toast, "Erreur", userMessage, true);
    return;
  }

  if (error instanceof Error) {
    // Gestion spécifique des erreurs d'authentification
    if (error.message === 'No user info returned from login or GetUserInfo.') {
      handleToast(toast, "Erreur", errorMessages.auth.noUserInfo, true);
      return;
    }

    // Pour toutes les autres erreurs
    console.error(error);
    handleToast(toast, "Erreur", errorMessages.auth.technicalError, true);
  }
};
