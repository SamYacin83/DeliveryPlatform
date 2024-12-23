import { useQuery } from "@tanstack/react-query";
import { Order } from "../types";
import DeliveryMap from "../components/DeliveryMap";
import { mockOrders } from "../mocks/data";
import { Button } from "@/components/ui/button";
import { Package,ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  // Simuler les données de commandes avec mockOrders
  const { data: orders } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
    queryFn: async () => mockOrders
  });

  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vos commandes</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="space-y-8">
        {/* En-tête avec le nombre de commandes */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">1 commande</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm">
                ces 3 derniers mois <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem>ces 30 derniers jours</DropdownMenuItem>
              <DropdownMenuItem>ces 3 derniers mois</DropdownMenuItem>
              <DropdownMenuItem>en 2024</DropdownMenuItem>
              <DropdownMenuItem>en 2023</DropdownMenuItem>
              <DropdownMenuItem>en 2022</DropdownMenuItem>
              <DropdownMenuItem>en 2021</DropdownMenuItem>
              <DropdownMenuItem>en 2020</DropdownMenuItem>
              <DropdownMenuItem>en 2019</DropdownMenuItem>
              <DropdownMenuItem>en 2018</DropdownMenuItem>
              <DropdownMenuItem>en 2017</DropdownMenuItem>
              <DropdownMenuItem>en 2016</DropdownMenuItem>
              <DropdownMenuItem>en 2015</DropdownMenuItem>
              <DropdownMenuItem>Commandes archivées</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-4">
          {orders?.map((order) => (
            <div key={order.id} className="bg-muted/10 rounded-lg p-6 space-y-6">
              {/* En-tête de la commande */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-muted-foreground text-sm">COMMANDE EFFECTUÉE LE</div>
                  <div>{formatDate(order.createdAt)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground text-sm">TOTAL</div>
                  <div>{order.total.toFixed(2)} DJF</div>
                </div>
                <div className="text-right">
                  <div className="text-muted-foreground text-sm">COMMANDE N°</div>
                  <div>{order.id}-{Math.random().toString().slice(2, 10)}</div>
                </div>
              </div>

              {/* Détails de la commande */}
              <div className="flex items-start gap-6 border-t pt-6">
                <div className="h-24 w-24 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="h-12 w-12 text-primary" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-lg mb-2">
                    Livré le {formatDate(new Date(Date.now() + 3*24*60*60*1000).toISOString())}
                  </h3>
                  {order.items.map((item) => (
                    <div key={item.id} className="text-muted-foreground">
                      {item.title}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">             
                  <Button 
                    variant="outline" 
                    className="w-full border-[hsl(252,85%,60%)] text-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,60%)] hover:text-white"
                  >
                    Retourner les articles
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[hsl(252,85%,60%)] text-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,60%)] hover:text-white"
                  >
                    Facture
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Carte de livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryMap orders={orders || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}