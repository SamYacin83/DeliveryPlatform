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

const mapBackendProductToFrontend = (backendProduct: any): Product => ({
  id: backendProduct.id,
  name: backendProduct.name,
  description: backendProduct.description,
  price: backendProduct.priceAmount, 
  quantity: backendProduct.stockQuantity,
  typeId: backendProduct.categoryId,
  type: {
    id: backendProduct.categoryId,
    name: backendProduct.nameCategory,
    createdAt: new Date(), 
    updatedAt: new Date()  
  },
  imageUrl: backendProduct.pictureUrl,
  createdAt: new Date(), 
  updatedAt: new Date()  
});

// Fonction pour récupérer tous les produits
// Cette fonction sera utilisée comme queryFn dans useQuery
export const getProducts = async () => {
  const { data } = await productsApi.get<Product[]>('GetAllProduct');
  return data.map(mapBackendProductToFrontend);
};

// Fonction pour récupérer un produit spécifique par son ID
export const getProductById = async (id: string) => {
  const { data } = await productsApi.get<Product>(`GetProduct`, {
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