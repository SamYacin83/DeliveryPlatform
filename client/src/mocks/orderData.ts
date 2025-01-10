import { DashboardOrder } from "@/types";

// Coordonnées réelles de points à Djibouti
const djiboutiLocations = [
  {
    address: "Boulevard de la République, Djibouti",
    coordinates: [11.5892, 43.1456] // Centre-ville
  },
  {
    address: "Rue de Venise, Djibouti",
    coordinates: [11.5947, 43.1477] // Quartier européen
  },
  {
    address: "Avenue 13, Balbala",
    coordinates: [11.5558, 43.1393] // Balbala
  },
  {
    address: "Boulevard de Gaulle, Djibouti",
    coordinates: [11.5885, 43.1448] // Près du port
  },
  {
    address: "Rue d'Ethiopie, Djibouti",
    coordinates: [11.5864, 43.1502] // Quartier commercial
  },
  {
    address: "Quartier 7, Balbala",
    coordinates: [11.5597, 43.1367] // Balbala sud
  }
];

// Livreurs disponibles
const deliveryDrivers = [
  {
    id: "DRV-001",
    name: "Mohamed Ali",
    phone: "+253 77 12 34 56",
    currentLocation: [11.5872, 43.1450], // Position simulée
    status: "delivering"
  },
  {
    id: "DRV-002",
    name: "Ahmed Hassan",
    phone: "+253 77 23 45 67",
    currentLocation: [11.5660, 43.1380], // Position simulée
    status: "delivering"
  },
  {
    id: "DRV-003",
    name: "Farah Omar",
    phone: "+253 77 34 56 78",
    currentLocation: [11.5920, 43.1470], // Position simulée
    status: "delivering"
  }
];

// Fonction pour obtenir une localisation aléatoire
const getRandomLocation = () => {
  return djiboutiLocations[Math.floor(Math.random() * djiboutiLocations.length)];
};

// Fonction pour attribuer un livreur aléatoire
const getRandomDriver = () => {
  return deliveryDrivers[Math.floor(Math.random() * deliveryDrivers.length)];
};

// Articles disponibles pour les commandes
const availableItems = [
  {
    id: "1",
    title: "Café Premium",
    price: 1500,
    type: "SOGIK" as const,
    imageUrl: "/images/products/coffee-premium.jpg"
  },
  {
    id: "2",
    title: "Thé Vert Bio",
    price: 800,
    type: "Particulier" as const,
    imageUrl: "/images/products/green-tea.jpg"
  },
  {
    id: "3",
    title: "Pack Eau Minérale",
    price: 2000,
    type: "SOGIK" as const,
    imageUrl: "/images/products/water-pack.jpg"
  },
  {
    id: "4",
    title: "Jus d'Orange Frais",
    price: 1200,
    type: "Particulier" as const,
    imageUrl: "/images/products/orange-juice.jpg"
  }
];

// Fonction pour générer une date aléatoire dans les 3 derniers mois
const getRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  return new Date(
    threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  ).toISOString();
};

// Génération de commandes mock
export const mockOrders: DashboardOrder[] = Array.from({ length: 20 }, (_, index) => {
  const location = getRandomLocation();
  const driver = index < 3 ? getRandomDriver() : null; // Attribue des livreurs aux 3 premières commandes
  const date = index < 3 ? new Date().toISOString() : getRandomDate(); // Les 3 premières commandes sont d'aujourd'hui

  // Sélection aléatoire de 1 à 3 articles pour la commande
  const orderItems = Array.from(
    { length: Math.floor(Math.random() * 3) + 1 },
    () => {
      const item = availableItems[Math.floor(Math.random() * availableItems.length)];
      return {
        id: `item-${Math.random().toString(36).substr(2, 9)}`,
        articleId: item.id,
        title: item.title,
        quantity: Math.floor(Math.random() * 5) + 1,
        price: item.price,
        type: item.type
      };
    }
  );

  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Les 3 premières commandes sont en cours de livraison
  const status = index < 3 ? "pending" : (Math.random() > 0.1 ? "delivered" : "cancelled");
  
  return {
    id: `ORD-${(index + 1).toString().padStart(5, '0')}`,
    date,
    status,
    total,
    items: orderItems,
    deliveryAddress: location.address,
    coordinates: location.coordinates,
    trackingNumber: `DJB-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
    estimatedDelivery: status === "pending" 
      ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString()
      : undefined,
    driver: driver ? {
      id: driver.id,
      name: driver.name,
      phone: driver.phone,
      currentLocation: driver.currentLocation
    } : undefined
  };
});

// Tri des commandes par date (plus récentes en premier)
mockOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
