import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import { Product, BackendProduct } from '../Interfaces/Product';
import axiosManager, { ServiceAPI } from '../axiosManager';
import { toast } from '@/components/ui/use-toast';
import { NotFoundError } from './errors/NotFoundError';
import { handleBadRequestStatus, handleConflictStatus } from './errors/errorHandlers';

interface UseProductMutationResult {
  saveProduct: (product: Product) => Promise<void>;
  isPending: boolean;
}

const addProduct = async (product: Product) => {
  const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  console.log(' AddProduct ',product);
  const { data } = await axiosInstance.post<BackendProduct>('AddProduct', product);
  return data;
};

export default function useProduct(): UseProductMutationResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, { product: Product }>({
    mutationFn: async ({ product }) => {
      const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
      if (product.id) {
        //Modification mode
        await axiosInstance.put<BackendProduct>('UpdateProduct', product);
      } else {
        await addProduct(product);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
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
        else {
          toast({
            title: "Erreur",
            description: "Une erreur inattendue s'est produite",
            variant: "destructive",
          });
        }
      }
      throw error;
    }
  });
  
  const saveProduct = async (product: Product) => {
    await mutation.mutateAsync({ product });
  };
  
  return {
    saveProduct,
    isPending: mutation.isPending,
  };
}