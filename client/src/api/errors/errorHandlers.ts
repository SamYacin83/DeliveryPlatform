import { AxiosError } from 'axios';
import { toast } from '@/components/ui/use-toast';

interface FieldError {
  detail: string;
  status: string;
  title: string;
  type: string;
}

export const handleBadRequestStatus = (error: AxiosError) => {
  const errors = error.response?.data as FieldError[];
  if (errors && Array.isArray(errors)) {
    errors.forEach((err) => {
      toast({
        title: err.title,
        description: `${err.detail}`,
        variant: "destructive",
      });
    });
  }
};

export const handleConflictStatus = (error: AxiosError) => {
  const errors = error.response?.data as FieldError[];
  if (errors && Array.isArray(errors)) {
    errors.forEach((err) => {
      toast({
        title: err.title,
        description: `${err.detail}`,
        variant: "destructive",
      });
    });
  }
};
