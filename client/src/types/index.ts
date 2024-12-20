export type UserRole = 'client' | 'delivery' | 'supplier';

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  price: number;
  supplierId: number;
  stock: number;
}

export interface Order {
  id: number;
  userId: number;
  status: 'pending' | 'accepted' | 'in_delivery' | 'delivered';
  items: Article[];
  total: number;
  createdAt: string;
}

export interface DeliveryLocation {
  lat: number;
  lng: number;
  address: string;
}
