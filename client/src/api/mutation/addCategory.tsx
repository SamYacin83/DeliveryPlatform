import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, HttpStatusCode } from 'axios';
import axiosManager, { ServiceAPI } from '../axiosManager';
import { toast } from '@/components/ui/use-toast';
import { NotFoundError } from '../errors/NotFoundError';
import { handleBadRequestStatus, handleConflictStatus } from '../errors/errorHandlers';
import { Category } from '@/types/product';
import { CategoryDto } from '../Interfaces/Category';

interface UseCategoryMutationResult {
  saveCategory: (category: Category) => Promise<void>;
  isPending: boolean;
}

const mapToCategoryDto = (category: Category): CategoryDto => {
  return {
    categoryId: category.categoryId,
    name: category.name,
    description: category.description
  };
};

const addCategory = async (category: Category) => {
  const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const categoryDto = mapToCategoryDto(category);
  const { data } = await axiosInstance.post<Category>('AddProductCat', categoryDto);
  return data;
};

export default function useCategory(): UseCategoryMutationResult {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, Category>({
    mutationFn: async (category) => {
      const axiosInstance = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
      const categoryDto = mapToCategoryDto(category);
      
      if (category.categoryId) {
        //Modification mode
        await axiosInstance.put<Category>('UpdateProductCat', categoryDto);
      } else {
        await addCategory(category);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast({
        title: "Succès",
        description: "La catégorie a été sauvegardée avec succès",
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
    saveCategory: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}