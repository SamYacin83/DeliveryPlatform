import { useUser } from "../hooks/use-user";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../types";
import DeliveryMap from "../components/DeliveryMap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { data: orders } = useQuery<Order[]>({
    queryKey: ['/api/orders'],
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {orders?.map((order) => (
                <li key={order.id} className="flex justify-between items-center">
                  <span>Order #{order.id}</span>
                  <span className="capitalize">{order.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Map</CardTitle>
          </CardHeader>
          <CardContent>
            <DeliveryMap orders={orders || []} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
