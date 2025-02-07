import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import axiosManager, { ServiceAPI } from '../axiosManager';
import { toast } from '@/components/ui/use-toast';
import { NotFoundError } from '../errors/NotFoundError';
import { handleBadRequestStatus, handleConflictStatus } from '../errors/errorHandlers';
import { Customer } from '../Interfaces/Customer';

interface UseCustomerMutationResult {
  saveCustomer: (customer: Customer) => Promise<void>;
  isPending: boolean;
}

export default function useCustomer(): UseCustomerMutationResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, Customer>({
    mutationFn: async (customer) => {
      const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
        await axiosInstance.post<Customer>('AddCustomer', customer);
    
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      toast({
        title: "Succès",
        description: "Le client a été sauvegardé avec succès",
        variant: "default",
      });
    },
    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<unknown>;
        
        if (axiosError.response?.status === HttpStatusCode.NotFound) {
          throw new NotFoundError();
        } 
        else if (axiosError.response?.status === HttpStatusCode.BadRequest) {
          handleBadRequestStatus(axiosError);
        } 
        else if (axiosError.response?.status === HttpStatusCode.Conflict) {
          handleConflictStatus(axiosError);
        }
      }
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde",
        variant: "destructive",
      });
    },
  });

  return {
    saveCustomer: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}