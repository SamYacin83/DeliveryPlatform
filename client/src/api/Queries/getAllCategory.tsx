
import axiosManager, { ServiceAPI } from '../axiosManager';
import { ProductType } from '@/types/product';

const productsApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

export const getAllCatProduct = async () => {
    const { data } = await productsApi.get<ProductType[]>('GetAllCatProduct');
    return data;
  };
  