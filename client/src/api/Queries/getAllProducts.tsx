// Importation des dépendances nécessaires de React Query
import { QueryKey } from '@tanstack/react-query';
import axiosManager, { ServiceAPI } from '../axiosManager';
import { Product } from '@/types/product';

// Récupération de l'instance axios configurée pour l'API de livraison
const productsApi = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

// Définition des clés de requête pour les produits
// Ces clés sont utilisées par React Query pour la mise en cache et l'invalidation
export const productsKeys = {
  // Clé pour tous les produits
  all: ['products'] as QueryKey,
  // Clé pour un produit spécifique par ID
  byId: (id: string) => ['products', id] as QueryKey,
};
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
      id: backendProduct.categoryId, // Même ID
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
// Fonction pour récupérer tous les produits
// Cette fonction sera utilisée comme queryFn dans useQuery
export const getProducts = async () => {
  const { data } = await productsApi.get<BackendProduct[]>('GetAllProduct');
  return data.map(mapBackendProductToFrontend);
};

// Fonction pour récupérer un produit spécifique par son ID
export const getProductById = async (id: string) => {
  const { data } = await productsApi.get<BackendProduct>(`GetProduct`, {
    params: {
      productId: id
    }
  });
  return mapBackendProductToFrontend(data);
};

// Options de configuration pour les requêtes de produits
export const productsOptions = {
  // Durée pendant laquelle les données sont considérées comme "fraîches"
  staleTime: 1000 * 60 * 5, // 5 minutes
  
  // Durée pendant laquelle les données inactives restent en cache
  cacheTime: 1000 * 60 * 30, // 30 minutes
};