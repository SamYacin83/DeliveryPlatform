export interface Category {
  categoryId: string | null;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  categoryId: string;
  category?: Category;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductTypeDto {
  name: string;
  description?: string;
}

export interface CreateProductDto {
  name: string;
  description?: string;
  price: number;
  quantity: number;
  typeId: string;
  imageUrl?: string;
}
