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
  type: "Particulier" | "SOGIK";
  imageUrl: string;
}

export interface Order {
  id: number;
  userId: number;
  status: 'pending' | 'accepted' | 'in_delivery' | 'delivered' | 'canceled';
  items: Article[];
  total: number;
  createdAt: string;
  location?: DeliveryLocation;  // Optional car toutes les commandes n'ont pas forcément une localisation
}

export interface DeliveryLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface DeliveryTracking {
  id: number;
  driver: string;
  status: string;
  location: {
    lat: number;
    lng: number;
  };
  estimatedDelivery: string;
}

export interface Supplier {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
}
