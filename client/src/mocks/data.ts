import { Article, User, UserRole,Order } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'user1',
  email: 'user1@example.com',
  role: 'USER' as UserRole,
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Le Petit Prince',
    stock: 10,
    price: 15.99,
    description: 'Un classique de la littérature française',
  },
  {
    id: '2',
    title: '1984',
    stock: 5,
    price: 12.99,
    description: 'Le chef-d\'œuvre de George Orwell',
  },
  {
    id: '3',
    title: 'L\'Étranger',
    stock: 8,
    price: 11.99,
    description: 'Un roman d\'Albert Camus',
  },
];

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    status: 'pending',
    items: [mockArticles[0]], // Le Petit Prince
    total: mockArticles[0].price,
    createdAt: new Date().toISOString(),
    location: {
      lat: 11.5892,
      lng: 43.1456,
      address: "Djibouti, Djibouti"
    }
  },
  {
    id: 2,
    userId: 1,
    status: 'delivered',
    items: [mockArticles[1]], // Le Petit Prince
    total: mockArticles[1].price,
    createdAt: new Date().toISOString(),
    location: {
      lat: 11.5892,
      lng: 43.1456,
      address: "Djibouti, Djibouti"
    }
  },
  {
    id: 3,
    userId: 1,
    status: 'canceled',
    items: [mockArticles[2]], // Le Petit Prince
    total: mockArticles[2].price,
    createdAt: new Date().toISOString(),
    location: {
      lat: 11.5892,
      lng: 43.1456,
      address: "Djibouti, Djibouti"
    }
  }

];
