import axiosManager, { ServiceAPI } from '../axiosManager';
import { Product } from '@/types/product';

// Récupération de l'instance axios configurée pour l'API de livraison
const productsApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

interface BackendProduct {
  id: string;
  name: string;
  description: string;
  priceAmount: number;
  currency: string;
  pictureUrl: string;
  categoryId: string;      // Le vrai ID de catégorie
  nameCategory: string;    // Le vrai nom de catégorie
  stockQuantity: number;
  isAvailable: boolean;
}

const mapBackendProductToFrontend = (backendProduct: any): Product => {
  const mappedProduct = {
    id: backendProduct.id,
    name: backendProduct.name,
    description: backendProduct.description,
    price: backendProduct.priceAmount, 
    quantity: backendProduct.stockQuantity,
    categoryId: backendProduct.categoryId, // Devrait être "45b3315a-3795-4f2c-98e9-13ee1eb7cb92"
    category: {
      categoryId: backendProduct.categoryId, // Même ID
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

export const getProducts = async () => {
  const { data } = await productsApi.get<BackendProduct[]>('GetAllProduct');
  return data.map(mapBackendProductToFrontend);
};

export const getProductById = async (id: string) => {
  const { data } = await productsApi.get<BackendProduct>(`GetProduct`, {
    params: {
      productId: id
    }
  });
  return mapBackendProductToFrontend(data);
};

export const addProduct = async (product: Product) => {
  const { data } = await productsApi.post<BackendProduct>('AddProduct', product);
  return mapBackendProductToFrontend(data);
};