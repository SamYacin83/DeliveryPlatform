import { useQuery } from "@tanstack/react-query";
import { Order } from "../types";
import DeliveryMap from "../components/DeliveryMap";
import { mockOrders } from "../mocks/data";
import { Button } from "@/components/ui/button";
import { Package, ChevronDown, Clock, CheckCircle2, XCircle } from "lucide-react";
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

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'delivered':
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          text: "Livré",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-l-green-500"
        };
      case 'pending':
        return {
          icon: <Clock className="h-5 w-5 text-orange-500" />,
          text: "En attente",
          bgColor: "bg-orange-50",
          textColor: "text-orange-700",
          borderColor: "border-l-orange-500"
        };
      case 'accepted':
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-blue-500" />,
          text: "Accepté",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-l-blue-500"
        };
      case 'in_delivery':
        return {
          icon: <Package className="h-5 w-5 text-indigo-500" />,
          text: "En cours de livraison",
          bgColor: "bg-indigo-50",
          textColor: "text-indigo-700",
          borderColor: "border-l-indigo-500"
        };
      case 'canceled':
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          text: "Annulé",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-l-red-500"
        };
      default:
        return {
          icon: <Package className="h-5 w-5 text-gray-500" />,
          text: status,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-l-gray-500"
        };
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vos commandes</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="space-y-8">
            {/* En-tête avec le nombre de commandes */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{orders?.length || 0} commande{orders?.length !== 1 ? 's' : ''}</span>
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
              {orders?.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                return (
                  <div key={order.id} className={`rounded-lg space-y-6 ${statusInfo.bgColor} border border-l-4 ${statusInfo.borderColor}`}>
                    {/* En-tête de la commande */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white shadow-100 p-4 md:p-6 rounded-t-lg">
                      <div>
                        <div className="text-muted-foreground text-sm">COMMANDE EFFECTUÉE LE</div>
                        <div className="font-medium">{formatDate(order.createdAt)}</div>
                      </div>
                      <div className="md:text-center">
                        <div className="text-muted-foreground text-sm">TOTAL</div>
                        <div className="font-medium">{order.total.toFixed(2)} DJF</div>
                      </div>
                      <div className="md:text-right">
                        <div className="text-muted-foreground text-sm">COMMANDE N°</div>
                        <div className="font-medium">{order.id}-{Math.random().toString().slice(2, 10)}</div>
                      </div>
                    </div>

                    {/* Détails de la commande */}
                    <div className="flex flex-col md:flex-row items-start gap-6 px-4 md:px-6 pb-6">
                      <div className="w-full md:w-24 h-24 flex items-center justify-center">
                        <Package className={`h-12 w-12 ${statusInfo.textColor}`} />
                      </div>
                      <div className="flex-grow space-y-2">
                        <div className="flex items-center gap-2 mb-2">
                          {statusInfo.icon}
                          <h3 className={`font-medium text-lg ${statusInfo.textColor}`}>
                            {statusInfo.text} le {formatDate(new Date(Date.now() + 3*24*60*60*1000).toISOString())}
                          </h3>
                        </div>
                        {order.items.map((item) => (
                          <div key={item.id} className="text-muted-foreground">
                            {item.title}
                          </div>
                        ))}
                      </div>
                      <div className="w-full md:w-auto space-y-2">
                        <Button 
                          variant="outline" 
                          className="w-full border-[hsl(252,85%,60%)] text-[hsl(252,85%,60%)] hover:bg-[hsl(252,85%,60%)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={order.status === 'in_delivery' || order.status === 'canceled'}
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
                );
              })}
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