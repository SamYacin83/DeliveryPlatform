import axiosManager, { ServiceAPI } from '../axiosManager';
import { queryOptions } from '@tanstack/react-query';
import { BackendProduct } from '../Interfaces/Product';

const queryKeys: string[] = ['products'];

const getProducts = async () => {
  const axios = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);
  const response = await axios.get('GetAllProduct');
  const data: BackendProduct[] = response.data;

  return {
    items: data.map((product: BackendProduct) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.priceAmount,
      quantity: product.stockQuantity,
      categoryId: product.categoryId,
      category: {
        categoryId: product.categoryId,
        name: product.nameCategory,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      imageUrl: product.pictureUrl,
      createdAt: new Date(),
      updatedAt: new Date()
    })),
  };
 };

export const getProductsOptions = () =>
  queryOptions({
    queryKey: queryKeys,
    queryFn: getProducts,
  });