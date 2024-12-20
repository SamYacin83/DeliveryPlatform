import { Link } from "wouter";
import { User } from "../types";
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/use-user";

interface NavigationProps {
  user: User;
}

export default function Navigation({ user }: NavigationProps) {
  const { logout } = useUser();

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
