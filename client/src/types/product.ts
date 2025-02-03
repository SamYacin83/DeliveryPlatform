export interface Category {
  categoryId: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
/*
"id": "45b3315a-3795-4f2c-98e9-13ee1eb7cb92",
    "name": "Particulier",
    "description": "Particulier"
*/
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
