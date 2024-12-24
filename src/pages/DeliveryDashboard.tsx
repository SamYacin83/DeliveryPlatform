import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { useState } from "react";

interface Delivery {
  id: number;
  orderId: number;
  status: string;
  estimatedDeliveryDate: string;
  actualDeliveryDate?: string;
  address: string;
  customerName: string;
}

export default function DeliveryDashboard() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: deliveries, refetch } = useQuery<Delivery[]>({
    queryKey: ["deliveries", statusFilter],
    queryFn: async () => {
      const response = await fetch("http://localhost:3001/api/deliveries");
      return response.json();
    },
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "delivered":
        return {
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          text: "Livré",
          bgColor: "bg-green-50",
          textColor: "text-green-700",
          borderColor: "border-l-green-500",
        };
      case "in_transit":
        return {
          icon: <Truck className="h-5 w-5 text-blue-500" />,
          text: "En transit",
          bgColor: "bg-blue-50",
          textColor: "text-blue-700",
          borderColor: "border-l-blue-500",
        };
      case "pending":
        return {
          icon: <Clock className="h-5 w-5 text-orange-500" />,
          text: "En attente",
          bgColor: "bg-orange-50",
          textColor: "text-orange-700",
          borderColor: "border-l-orange-500",
        };
      case "cancelled":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          text: "Annulé",
          bgColor: "bg-red-50",
          textColor: "text-red-700",
          borderColor: "border-l-red-500",
        };
      default:
        return {
          icon: <Package className="h-5 w-5 text-gray-500" />,
          text: status,
          bgColor: "bg-gray-50",
          textColor: "text-gray-700",
          borderColor: "border-l-gray-500",
        };
    }
  };

  const handleStatusUpdate = async (deliveryId: number, newStatus: string) => {
    try {
      await fetch(`http://localhost:3001/api/deliveries/${deliveryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      refetch();
    } catch (error) {
      console.error("Error updating delivery status:", error);
    }
  };

  const filteredDeliveries = deliveries?.filter((delivery) => {
    if (statusFilter === "all") return true;
    return delivery.status === statusFilter;
  }) || [];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Tableau de bord des livraisons</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="in_transit">En transit</SelectItem>
            <SelectItem value="delivered">Livré</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Liste des livraisons</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Commande</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Date estimée</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDeliveries.map((delivery) => {
                const statusInfo = getStatusInfo(delivery.status);
                return (
                  <TableRow
                    key={delivery.id}
                    className="cursor-pointer"
                    onClick={() => {
                      setSelectedDelivery(delivery);
                      setDialogOpen(true);
                    }}
                  >
                    <TableCell>{delivery.orderId}</TableCell>
                    <TableCell>{delivery.customerName}</TableCell>
                    <TableCell>{delivery.address}</TableCell>
                    <TableCell>{formatDate(delivery.estimatedDeliveryDate)}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${statusInfo.bgColor}`}>
                        {statusInfo.icon}
                        <span className={statusInfo.textColor}>{statusInfo.text}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusUpdate(delivery.id, "in_transit");
                        }}
                        disabled={delivery.status === "delivered" || delivery.status === "cancelled"}
                      >
                        Mettre à jour
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        {selectedDelivery && (
          <>
            <DialogHeader>
              <DialogTitle>Détails de la livraison #{selectedDelivery.orderId}</DialogTitle>
            </DialogHeader>
            <DialogContent>
              <div className="space-y-4">
                <div>
                  <label className="font-medium">Client</label>
                  <p>{selectedDelivery.customerName}</p>
                </div>
                <div>
                  <label className="font-medium">Adresse</label>
                  <p>{selectedDelivery.address}</p>
                </div>
                <div>
                  <label className="font-medium">Date de livraison estimée</label>
                  <p>{formatDate(selectedDelivery.estimatedDeliveryDate)}</p>
                </div>
                <div>
                  <label className="font-medium">Statut actuel</label>
                  <div className="mt-1">
                    {(() => {
                      const statusInfo = getStatusInfo(selectedDelivery.status);
                      return (
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${statusInfo.bgColor}`}>
                          {statusInfo.icon}
                          <span className={statusInfo.textColor}>{statusInfo.text}</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                {selectedDelivery.actualDeliveryDate && (
                  <div>
                    <label className="font-medium">Date de livraison effective</label>
                    <p>{formatDate(selectedDelivery.actualDeliveryDate)}</p>
                  </div>
                )}
              </div>
            </DialogContent>
            <DialogFooter className="space-x-2">
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Fermer
              </Button>
              {selectedDelivery.status !== "delivered" && selectedDelivery.status !== "cancelled" && (
                <Button
                  onClick={() => {
                    handleStatusUpdate(selectedDelivery.id, "delivered");
                    setDialogOpen(false);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Marquer comme livré
                </Button>
              )}
            </DialogFooter>
          </>
        )}
      </Dialog>
    </div>
  );
}