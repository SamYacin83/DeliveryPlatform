import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";

const routes: Record<string, string> = {
  '/': 'Accueil',
  '/about': 'À propos',
  '/auth': 'Authentification',
  '/auth/forgot-password': 'Mot de passe oublié',
  '/dashboard': 'Tableau de bord',
  '/articles': 'Articles',
};

export default function Breadcrumb() {
  const [location] = useLocation();
  
  if (location === '/') return null;
  
  const pathSegments = location.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((_, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    return { path, label: routes[path] || path };
  });

  return (
    <div className="bg-gradient-to-r from-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center text-sm">
          <Link 
            href="/" 
            className="flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <Home className="h-4 w-4" />
            <span className="ml-1.5">Accueil</span>
          </Link>
          {breadcrumbItems.map((item, index) => (
            <div key={item.path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="font-medium text-foreground">{item.label}</span>
              ) : (
                <Link
                  href={item.path}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
