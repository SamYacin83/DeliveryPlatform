import { Article, User, UserRole } from '../types';

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

export const mockOrders = [
  {
    id: '1',
    articleId: '1',
    userId: '1',
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];
