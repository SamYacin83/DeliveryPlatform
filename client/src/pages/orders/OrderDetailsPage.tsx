import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { useLocation, useRoute } from "wouter";
import { useState } from "react";

interface OrderItem {
  id: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: Date;
  status: "pending" | "processing" | "completed" | "cancelled";
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
}

const statusColors = {
  pending: "bg-yellow-500",
  processing: "bg-blue-500",
  completed: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusLabels = {
  pending: "En attente",
  processing: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

export default function OrderDetailsPage() {
  const [params] = useRoute("/orders/:id");
  const [location] = useLocation();
  const [order, setOrder] = useState<OrderDetails | null>(null);

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">Chargement de la commande...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <Button
        variant="ghost"
        className="mb-4"
        onClick={() => location.push("/orders")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour aux commandes
      </Button>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Commande #{order.orderNumber}</CardTitle>
                <CardDescription>
                  {new Date(order.date).toLocaleDateString()}
                </CardDescription>
              </div>
              <Badge
                variant="secondary"
                className={statusColors[order.status]}
              >
                {statusLabels[order.status]}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Client</h3>
                <p>{order.customerName}</p>
                <p>{order.customerEmail}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Articles commandés</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produit</TableHead>
                  <TableHead className="text-right">Prix unitaire</TableHead>
                  <TableHead className="text-right">Quantité</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className="text-right">
                      {item.unitPrice.toFixed(2)} €
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      {item.total.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    Sous-total
                  </TableCell>
                  <TableCell className="text-right">
                    {order.subtotal.toFixed(2)} €
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-medium">
                    TVA
                  </TableCell>
                  <TableCell className="text-right">
                    {order.tax.toFixed(2)} €
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={3} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    {order.total.toFixed(2)} €
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
