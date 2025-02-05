import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

interface FieldError {
  propertyName: string;
  errorCode: string;
}

export const handleBadRequestStatus = (error: AxiosError) => {
  const errors = error.response?.data as FieldError[];
  if (errors && Array.isArray(errors)) {
    errors.forEach((err) => {
      toast({
        title: "Erreur de validation",
        description: `${err.propertyName}: ${err.errorCode}`,
        variant: "destructive",
      });
    });
  }
};

export const handleConflictStatus = (error: AxiosError) => {
  toast({
    title: "Conflit",
    description: "Cette ressource existe déjà",
    variant: "destructive",
  });
};
