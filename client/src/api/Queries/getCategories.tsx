
import axiosManager, { ServiceAPI } from '../axiosManager';
import { Category } from '@/types/product';
import { queryOptions } from '@tanstack/react-query';

const queryKeys: string[] = ['categories'];
const getCategories = async () => {
  const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const response = await axios.get('GetAllCatProduct');
  const data: Category[] = response.data;

  return {
    items: data.map((group: Category) => ({
      categoryId: group.categoryId,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt
    })),
  };
 };

 export const getCategoriesOptions = () =>
  queryOptions({
    queryKey: queryKeys,
    queryFn: getCategories,
  });
  