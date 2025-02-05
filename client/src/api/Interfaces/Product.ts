export interface BackendProduct {
    id: string;
    name: string;
    description: string;
    priceAmount: number;
    currency: string;
    pictureUrl: string;
    categoryId: string;      
    nameCategory: string;    
    stockQuantity: number;
    isAvailable: boolean;
  }