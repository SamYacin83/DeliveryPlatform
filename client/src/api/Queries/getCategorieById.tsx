import axiosManager, { ServiceAPI } from '../axiosManager';
import { Category } from '@/types/product';

const queryKey = 'category';

const getCategoryById = async (categoryId: string | undefined) => {
    if (!categoryId) return null;
    
    const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
    const response = await axios.get<Category>(`GetProductCat`,
        {
            params: {
                categoryId : categoryId
            }
        }
    );
    const { data } = response;

    return {
        id: data.categoryId,
        name: data.name,
        description: data.description
    };
};

export const queryOptionsGetCategoryById = (categoryId: string | undefined) => ({
    queryKey: [queryKey, categoryId],
    queryFn: () => getCategoryById(categoryId),
    enabled: !!categoryId
});