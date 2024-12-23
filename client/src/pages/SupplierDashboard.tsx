import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  Clock, 
  Bell,
  MapPin,
  TrendingUp,
  Leaf,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";

interface Order {
  id: number;
  productName: string;
  category: string;
  quantity: number;
  totalPrice: number;
  status: string;
  client: string;
  address: string;
  createdAt: string;
  urgency: string;
}

export default function SupplierDashboard() {
  const [period, setPeriod] = useState("today");
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { data: orders } = useQuery({
    queryKey: ["supplier-orders", period],
    queryFn: async () => {
      // Simulation d'appel API
      return [
        {
          id: 1,
          productName: "Aloe Vera Bio",
          category: "SOGIK",
          quantity: 2,
          totalPrice: 3198,
          status: "pending",
          client: "Marie Dupont",
          address: "123 Rue de la Santé, Paris",
          createdAt: new Date().toISOString(),
          urgency: "high"
        },
        // ... autres commandes
      ];
    },
  });

  const { data: deliveries } = useQuery({
    queryKey: ["active-deliveries"],
    queryFn: async () => {
      return [
        {
          id: 1,
          driver: "Jean Martin",
          status: "en route",
          location: { lat: 48.8566, lng: 2.3522 },
          estimatedDelivery: "15:30"
        }
      ];
    }
  });

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
    });
};

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* En-tête avec notifications */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord Fournisseur</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              3
            </span>
          </Button>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sélectionner la période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Aujourd'hui</SelectItem>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Nouvelles commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold">8</span>
              </div>
              <Badge className="bg-orange-100 text-orange-700">+3 dernière heure</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Chiffre d'affaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-8 w-8 text-green-500" />
                <span className="text-2xl font-bold">152,300 DA</span>
              </div>
              <Badge className="bg-green-100 text-green-700">+12% aujourd'hui</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Livraisons actives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="h-8 w-8 text-blue-500" />
                <span className="text-2xl font-bold">5</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700">3 en retard</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Stock critique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <span className="text-2xl font-bold">3</span>
              </div>
              <Button size="sm" variant="destructive">
                Voir
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs principales */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Commandes
          </TabsTrigger>
          <TabsTrigger value="deliveries" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Livraisons
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Inventaire
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          {/* Section des nouvelles commandes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Bell className="h-5 w-5 text-orange-500" />
                Nouvelles commandes à valider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Urgence</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Heure</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <Badge 
                            variant={order.urgency === 'high' ? 'destructive' : 'default'}
                          >
                            {order.urgency === 'high' ? 'Urgent' : 'Normal'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{order.productName}</span>
                            <span className="text-sm text-gray-500">{order.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{order.client}</span>
                            <span className="text-sm text-gray-500">{order.address}</span>
                          </div>
                        </TableCell>
                        <TableCell>{order.totalPrice} DA</TableCell>
                        <TableCell>{formatDate(order.createdAt)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowOrderDialog(true);
                              }}
                            >
                              Valider
                            </Button>
                            <Button size="sm" variant="destructive">
                              Refuser
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries">
          {/* Carte avec la carte des livraisons */}
          <Card>
            <CardHeader>
              <CardTitle>Livraisons en cours</CardTitle>
              <CardDescription>Vue en temps réel des livreurs</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              {/* Intégrer ici la carte avec les positions des livreurs */}
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
                Carte des livraisons en cours
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de validation de commande */}
      {selectedOrder && (
        <AlertDialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Valider la commande</AlertDialogTitle>
              <AlertDialogDescription>
                Voulez-vous valider la commande de {selectedOrder.productName} pour {selectedOrder.client} ?
                Un livreur sera automatiquement assigné.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Annuler</AlertDialogCancel>
              <AlertDialogAction>Valider</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}