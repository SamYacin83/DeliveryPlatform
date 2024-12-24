import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { io, Socket } from 'socket.io-client';
import { useUser } from '../hooks/use-user';

let socket: Socket | null = null;

export default function NotificationProvider() {
  const { toast } = useToast();
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    // Initialize socket connection
    socket = io({
      path: '/socket.io',
    });

    // Listen for delivery updates
    socket.on(`delivery_updated_${user.id}`, (delivery: {
      orderId: number;
      status: string;
      location?: { lat: number; lng: number };
    }) => {
      toast({
        title: `Delivery Update for Order #${delivery.orderId}`,
        description: `Status: ${delivery.status}`,
        duration: 5000,
      });
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [user]);

  return null;
}
