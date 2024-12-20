import { Link } from "wouter";
import type { User as UserType } from "../types";
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/use-user";
import { Bell, User as UserIcon, LogOut } from "lucide-react";
import CartDropdown from "./CartDropdown";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  user: UserType;
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
          
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-6">
                <Link href="/services" className="text-foreground/80 hover:text-primary transition-colors">
                  Services
                </Link>
                <Link href="/how-it-works" className="text-foreground/80 hover:text-primary transition-colors">
                  Comment ça marche
                </Link>
                <Link href="/testimonials" className="text-foreground/80 hover:text-primary transition-colors">
                  Témoignages
                </Link>
                {user && (
                  <Link 
                    href="/dashboard" 
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    Mes commandes
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-2">
              <CartDropdown />

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
          </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuGroup>
                  <div className="px-2 py-1.5 text-sm font-semibold">Profile</div>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="flex items-center">
                      <i className="mr-2 h-4 w-4">⌘</i>
                      CLUI
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => logout()}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
