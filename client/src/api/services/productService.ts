import axiosManager, { ServiceAPI } from '../axiosManager';
import { CreateProductDto, CreateProductTypeDto, Product, ProductType } from '@/types/product';

const api = axiosManager.getInstance(ServiceAPI.DeliveryPlatform);

export const productService = {
  // Produits
  getProducts: () => api.get<Product[]>('products'),
  getProduct: (id: string) => api.get<Product>(`products/${id}`),
  createProduct: (product: CreateProductDto) => api.post<Product>('products', product),
  updateProduct: (id: string, product: CreateProductDto) => api.put<Product>(`products/${id}`, product),
  deleteProduct: (id: string) => api.delete(`products/${id}`),

  // Types de produits
  getProductTypes: () => api.get<ProductType[]>('product-types'),
  getProductType: (id: string) => api.get<ProductType>(`product-types/${id}`),
  createProductType: (type: CreateProductTypeDto) => api.post<ProductType>('product-types', type),
  updateProductType: (id: string, type: CreateProductTypeDto) => api.put<ProductType>(`product-types/${id}`, type),
  deleteProductType: (id: string) => api.delete(`product-types/${id}`),
};
