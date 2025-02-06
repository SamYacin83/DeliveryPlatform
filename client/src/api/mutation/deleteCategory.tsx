import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosManager, { ServiceAPI } from '../axiosManager';

const deleteCategory = async (id: string): Promise<void> => {
    const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    await axios.delete(`DeleteProductCat`, {
        params: {
            categoryId : id
        }
    });
};

const useDeleteCategory = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: deleteCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories'] });
      },
    });
  
    return {
      deleteCategory: mutation.mutateAsync,
    };
  };
  
  export default useDeleteCategory;