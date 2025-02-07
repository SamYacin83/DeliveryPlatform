import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import axiosManager, { ServiceAPI } from '../axiosManager';
import { toast } from '@/components/ui/use-toast';
import { NotFoundError } from '../errors/NotFoundError';
import { handleBadRequestStatus, handleConflictStatus } from '../errors/errorHandlers';
import { Customer, CustomerFormData } from '../Interfaces/Customer';

interface UseCustomerMutationResult {
  saveCustomer: (customer: Customer) => Promise<void>;
  isPending: boolean;
}

const mapFormDataToCustomer = (formData: CustomerFormData): Customer => {
  return {
    firstName: formData.firstName,
    lastName: formData.lastName,
    birthDate: formData.birthDate,
    address: {
      street: formData.address.street,
      city: formData.address.city,
      postalCode: formData.address.postalCode,
      country: formData.address.country
    },
    account: {
      email: formData.email,
      password: formData.password
    }
  };
};

const mapCustomerToFormData = (customer: Customer): CustomerFormData => {
  return {
    email: customer.account.email,
    password: customer.account.password,
    confirmPassword: customer.account.password,
    firstName: customer.firstName,
    lastName: customer.lastName,
    birthDate: customer.birthDate,
    phone: '',
    role: 'customer',
    address: {
      street: customer.address.street,
      city: customer.address.city,
      postalCode: customer.address.postalCode,
      country: customer.address.country
    }
  };
};

export default function useCustomer(): UseCustomerMutationResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, CustomerFormData>({
    mutationFn: async (formData) => {
      const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
      const customerData = mapFormDataToCustomer(formData);
      await axiosInstance.post<Customer>('AddCustomer', customerData);
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

  const saveCustomer = async (customer: Customer) => {
    const formData = mapCustomerToFormData(customer);
    return mutation.mutateAsync(formData);
  };

  return {
    saveCustomer,
    isPending: mutation.isPending,
  };
}