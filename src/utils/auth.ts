import { DocumentProgress, AuthForm } from "../pages/types";

export const handleToast = (toast: any, title: string, description: string, isError = false) => {
  toast({
    title,
    description,
    variant: isError ? "destructive" : "default",
    duration: isError ? 3000 : 5000,
    className: isError ? undefined : "bg-primary text-primary-foreground",
  });
};

export const handleUploadProgress = (progress: number, documentType: keyof DocumentProgress) => {
  return {
    [documentType]: {
      progress: Math.min(progress, 100),
      status: progress >= 100 ? "completed" : "uploading",
    },
  };
};

export const TEMP_CREDENTIALS = {
  username: "admin",
  password: "Samatar1983",
};

export const validateCredentials = (data: AuthForm) => {
  return data.username === TEMP_CREDENTIALS.username && 
         data.password === TEMP_CREDENTIALS.password;
};