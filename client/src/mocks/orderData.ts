import { DashboardOrder } from "@/types";

// Fonction pour générer une date aléatoire dans les 3 derniers mois
const getRandomDate = () => {
  const now = new Date();
  const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  return new Date(
    threeMonthsAgo.getTime() + Math.random() * (now.getTime() - threeMonthsAgo.getTime())
  ).toISOString();
};

// Adresses à Djibouti pour la démonstration
const djiboutiAddresses = [
  "Rue de Venise, Djibouti",
  "Avenue 13, Balbala",
  "Boulevard de Gaulle, Djibouti",
  "Rue d'Ethiopie, Djibouti",
  "Quartier 7, Balbala",
  "Rue de Rome, Djibouti",
  "Avenue 26, Quartier 7bis",
  "Boulevard de la République, Djibouti"
];

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

// Génération de commandes mock
export const mockOrders: DashboardOrder[] = Array.from({ length: 20 }, (_, index) => {
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

  // Calcul du total de la commande
  const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Détermination du statut en fonction de la date
  const date = getRandomDate();
  const daysSinceOrder = (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24);
  
  let status: "pending" | "delivered" | "cancelled";
  if (daysSinceOrder < 1) {
    status = "pending";
  } else if (daysSinceOrder < 30) {
    status = Math.random() > 0.1 ? "delivered" : "cancelled";
  } else {
    status = "delivered";
  }

  // Génération du numéro de suivi
  const trackingNumber = `DJB-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  return {
    id: `ORD-${(index + 1).toString().padStart(5, '0')}`,
    date,
    status,
    total,
    items: orderItems,
    deliveryAddress: djiboutiAddresses[Math.floor(Math.random() * djiboutiAddresses.length)],
    trackingNumber,
    estimatedDelivery: status === "pending" 
      ? new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000).toISOString() // +24h pour les commandes en attente
      : undefined
  };
});

// Tri des commandes par date (plus récentes en premier)
mockOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
