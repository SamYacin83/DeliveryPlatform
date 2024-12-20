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
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
            RapidLivre
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/dashboard" 
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Mes commandes
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative hover:bg-primary/5 transition-colors"
                >
                  <Bell className="h-5 w-5 text-foreground/80" />
                  {hasUnread && (
                    <Badge 
                      variant="default"
                      className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground"
                    />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuGroup>
                  {notifications.length === 0 ? (
                    <DropdownMenuItem className="text-muted-foreground text-center py-4">
                      Aucune notification
                    </DropdownMenuItem>
                  ) : (
                    notifications.map(notification => (
                      <DropdownMenuItem 
                        key={notification.id}
                        className="py-3 px-4 hover:bg-primary/5 cursor-pointer"
                      >
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{notification.message}</span>
                          <span className="text-xs text-muted-foreground">
                            Il y a {Math.floor(Math.random() * 10) + 1} minutes
                          </span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-4 border-l pl-4">
              <div className="flex flex-col items-end">
                <span className="font-medium text-sm">{user.username}</span>
                <Badge variant="secondary" className="font-normal text-xs">
                  {user.role === 'client' ? 'Client' : 
                   user.role === 'delivery' ? 'Livreur' : 'Fournisseur'}
                </Badge>
              </div>
              <Button 
                variant="outline" 
                onClick={() => logout()}
                className="hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30 transition-colors"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
