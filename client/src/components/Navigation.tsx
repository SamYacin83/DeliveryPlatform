import { Link } from "wouter";
import { User } from "../types";
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/use-user";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";

interface NavigationProps {
  user: User;
}

export default function Navigation({ user }: NavigationProps) {
  const { logout } = useUser();
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string }>>([]);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    const handleNotification = (delivery: { orderId: number; status: string }) => {
      setNotifications(prev => [
        { 
          id: Date.now(),
          message: `Commande #${delivery.orderId}: ${delivery.status}`
        },
        ...prev
      ]);
      setHasUnread(true);
    };

    const socket = window.io?.({ path: '/socket.io' });
    if (socket) {
      socket.on(`delivery_updated_${user.id}`, handleNotification);
      return () => {
        socket.off(`delivery_updated_${user.id}`);
        socket.disconnect();
      };
    }
  }, [user.id]);

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            RapidLivre
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Tableau de bord
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {hasUnread && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center"
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                  {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-muted-foreground">
                      Aucune notification
                    </DropdownMenuItem>
                  ) : (
                    notifications.map(notification => (
                      <DropdownMenuItem key={notification.id}>
                        {notification.message}
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{user.username}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {user.role === 'client' ? 'Client' : 
                 user.role === 'delivery' ? 'Livreur' : 'Fournisseur'}
              </span>
            </div>
            <Button variant="outline" onClick={() => logout()}>
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
