import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosManager, { ServiceAPI } from '../axiosManager';

const deleteProduct = async (id: string): Promise<void> => {
    const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    await axios.delete(`DeleteProduct`, {
        params: {
            id : id
        }
    });
};

const useDeleteProduct = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['products'] });
      },
    });
  
    return {
      deleteProduct: mutation.mutateAsync,
    };
  };
  
  export default useDeleteProduct;