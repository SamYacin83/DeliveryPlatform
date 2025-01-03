import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Bell, User as UserIcon, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CartDropdown from "./CartDropdown";
import { HamburgerIcon } from "./HamburgerIcon";

// Typage minimaliste d'un user
interface User {
  id: number | string;
  username: string;
}

interface NavigationProps {
  readonly  user: User | null; // Peut être null
  readonly  logout?: () => void;
}

export default function Navigation({ user, logout }: NavigationProps) {
  const [notifications, setNotifications] = useState<
    Array<{ id: number; message: string }>
  >([]);
  const [hasUnread, setHasUnread] = useState(false);

  // Contrôle du menu mobile (hamburger)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Ex. : écouter des events de notification via socket.io
  // On vérifie si user est null avant d’utiliser user.id
  useEffect(() => {
    if (!user) {
      // Si pas connecté, on ne fait rien
      return;
    }

    const handleNotifications = () => {
      setNotifications([
        {
          id: 1,
          message: "Nouvelle commande #1234 confirmée"
        },
        {
          id: 2,
          message: "Commande #1234 en cours de livraison"
        }
      ]);
      setHasUnread(true);
    };
    // user !== null, on peut accéder à user.id
    // Déclencher les notifications
    handleNotifications();
    // On suppose que socket.io est disponible via window.io
    const socket = window.io?.({ path: "/socket.io" });
    if (socket) {
      socket.on(`delivery_updated_${user.id}`, (delivery: { orderId: number; status: string }) => {
        setNotifications(prev => [
          {
            id: Date.now(),
            message: `Commande #${delivery.orderId}: ${delivery.status}`
          },
          ...prev
        ]);
        setHasUnread(true);
      });

      return () => {
        socket.off(`delivery_updated_${user.id}`);
        socket.disconnect();
      };
    }
  }, [user]); // On surveille user lui-même, pas user.id

  // Ferme le menu mobile après un clic (sur un lien ou un bouton)
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        {/* Barre horizontale */}
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-[hsl(252,85%,60%)] hover:text-[hsl(252,85%,55%)] transition-colors"
          >
            RapidLivre
          </Link>

          {/* Groupe de droite */}
          <div className="flex items-center ml-auto gap-4">
            {/* Liens de navigation (desktop) */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/services"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Services
              </Link>
              <Link
                href="/how-it-works"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Comment ça marche
              </Link>
              <Link
                href="/testimonials"
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                Témoignages
              </Link>
              {/* Affiche "Mes commandes" seulement si user connecté */}
              {user && (
                <Link
                  href="/dashboard"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  Mes commandes
                </Link>
              )}
            </nav>

            {/* Panier (desktop) */}
            <div className="hidden md:block">
              <CartDropdown />
            </div>

            {/* Notifications (desktop), seulement si user connecté */}
            {user && (
              <div className="hidden md:block">
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
                        >
                          {notifications.length}
                        </Badge>
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
                        notifications.map((notification) => (
                          <DropdownMenuItem
                            key={notification.id}
                            className="py-3 px-4 hover:bg-primary/5 cursor-pointer"
                          >
                            <div className="flex flex-col gap-1">
                              <span className="font-medium">
                                {notification.message}
                              </span>
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
            )}

            {/* Profil / Connexion (desktop) */}
            <div className="hidden md:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {/* Première lettre du pseudo */}
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center cursor-pointer">
                          <UserIcon className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => logout && logout()}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <Button>Connexion</Button>
                </Link>
              )}
            </div>

            {/* Hamburger (mobile) */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <HamburgerIcon isOpen={isMobileMenuOpen} />
              </Button>
            </div>
          </div>
        </div>

        {/* Menu mobile (si ouvert) */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 border-t">
            <div className="flex flex-col space-y-4 px-4 py-4">
              <Link
                href="/services"
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={handleMobileLinkClick}
              >
                Services
              </Link>
              <Link
                href="/how-it-works"
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={handleMobileLinkClick}
              >
                Comment ça marche
              </Link>
              <Link
                href="/testimonials"
                className="text-foreground/80 hover:text-primary transition-colors"
                onClick={handleMobileLinkClick}
              >
                Témoignages
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="text-foreground/80 hover:text-primary transition-colors"
                  onClick={handleMobileLinkClick}
                >
                  Mes commandes
                </Link>
              )}

              {/* Panier (mobile) */}
              <div className="pt-4 border-t">
                <CartDropdown />
              </div>

              {/* Notifications (mobile), seulement si user connecté */}
              {user && (
                <div className="pt-4 border-t">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="relative"
                      >
                        <Bell className="h-5 w-5" />
                        {hasUnread && (
                        <Badge
                          variant="default"
                          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground"
                        >
                          {notifications.length}
                        </Badge>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-80">
                      <DropdownMenuGroup>
                        {notifications.length === 0 ? (
                          <DropdownMenuItem className="text-muted-foreground text-center py-4">
                            Aucune notification
                          </DropdownMenuItem>
                        ) : (
                          notifications.map((notification) => (
                            <DropdownMenuItem
                              key={notification.id}
                              className="py-3 px-4 hover:bg-primary/5 cursor-pointer"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="font-medium">
                                  {notification.message}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Il y a{" "}
                                  {Math.floor(Math.random() * 10) + 1} minutes
                                </span>
                              </div>
                            </DropdownMenuItem>
                          ))
                        )}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}

              {/* Auth (mobile) */}
              <div className="pt-4 border-t">
                {user ? (
                    <Button
                      variant="outline"
                      className="w-full mb-2"
                      onClick={() => {
                        logout && logout();
                        handleMobileLinkClick();
                      }}
                    >
                      Déconnexion
                    </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => {
                      handleMobileLinkClick();
                      window.location.href = "/auth";
                    }}
                  >
                    Connexion
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
