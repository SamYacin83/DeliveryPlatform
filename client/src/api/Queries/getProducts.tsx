import axiosManager, { ServiceAPI } from '../axiosManager';
import { Product } from '@/types/product';
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

// Récupération de l'instance axios configurée pour l'API de livraison
const productsApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

const mapBackendProductToFrontend = (backendProduct: any): Product => {
  const mappedProduct = {
    id: backendProduct.id,
    name: backendProduct.name,
    description: backendProduct.description,
    price: backendProduct.priceAmount, 
    quantity: backendProduct.stockQuantity,
    categoryId: backendProduct.categoryId, 
    category: {
      categoryId: backendProduct.categoryId, 
      name: backendProduct.nameCategory,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    imageUrl: backendProduct.pictureUrl,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return mappedProduct;
};

/*const mapFrontendProductToBackend = (frontendProduct: Product): BackendProduct => {
  const mappedProduct = {
    id: frontendProduct.id,
    name: frontendProduct.name,
    description: frontendProduct.description,
    priceAmount: frontendProduct.price,
    currency: 'FDJ',
    pictureUrl: frontendProduct.imageUrl,
    categoryId: frontendProduct.categoryId,
    nameCategory: frontendProduct.category?.name || '',
    stockQuantity: frontendProduct.quantity,
    isAvailable: true,
  };
  return mappedProduct;
};*/

/*
export const getProductById = async (id: string) => {
  const { data } = await productsApi.get<BackendProduct>(`GetProduct`, {
    params: {
      productId: id
    }
  });
  return mapBackendProductToFrontend(data);
};
*/
export const addProduct = async (product: Product) => {
  const { data } = await productsApi.post<BackendProduct>('AddProduct', product);
  return mapBackendProductToFrontend(data);
};