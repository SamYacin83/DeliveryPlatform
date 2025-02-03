
import axiosManager, { ServiceAPI } from '../axiosManager';
import { Category } from '@/types/product';

const productsApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

export const getAllCatProduct = async () => {
    const { data } = await productsApi.get<Category[]>('GetAllCatProduct');
    console.log("Data getCatgories: ", data);
    return data;
  };
  