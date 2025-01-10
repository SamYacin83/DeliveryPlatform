import { Article, User, UserRole, Order } from '../types';

export const mockUser: User = {
  id: '1',
  username: 'user1',
  email: 'user1@example.com',
  role: 'USER' as UserRole,
};

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Khat Sogik Premium',
    type: 'SOGIK',
    stock: 10,
    price: 1500,
    description: 'Khat frais de première qualité, récolté dans les montagnes de Tadjourah',
    imageUrl: 'https://www.middleeasteye.net/sites/default/files/styles/max_2600x2600/public/images/Khat%20in%20Yemen%20%28AFP%29.jpg',
    supplierId: 1
  },
  {
    id: '2',
    title: 'Khat Particulier',
    type: 'Particulier',
    stock: 15,
    price: 1200,
    description: 'Khat de qualité standard, idéal pour une consommation quotidienne',
    imageUrl: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12671/production/_89607104_89607103.jpg',
    supplierId: 1
  },
  {
    id: '3',
    title: 'Khat Sogik Select',
    type: 'SOGIK',
    stock: 8,
    price: 1800,
    description: 'Sélection spéciale de khat Sogik, cueilli à la main pour une qualité optimale',
    imageUrl: 'https://www.thenationalnews.com/image/policy:1.796766:1558094314/image/jpeg.jpg',
    supplierId: 2
  }
];

export const mockOrders: Order[] = [
  {
    id: 1,
    userId: 1,
    status: 'pending',
    items: [mockArticles[0]], // Khat Sogik Premium
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
    items: [mockArticles[1]], // Khat Particulier
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
    items: [mockArticles[2]], // Khat Sogik Select
    total: mockArticles[2].price,
    createdAt: new Date().toISOString(),
    location: {
      lat: 11.5892,
      lng: 43.1456,
      address: "Djibouti, Djibouti"
    }
  }
];
