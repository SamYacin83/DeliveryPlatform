import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";

const routes: Record<string, string> = {
  '/': 'Accueil',
  '/about': 'À propos',
  '/auth': 'Authentification',
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
    <div className="bg-muted/30">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            <span className="ml-1">Accueil</span>
          </Link>
          {breadcrumbItems.map((item, index) => (
            <div key={item.path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-2" />
              {index === breadcrumbItems.length - 1 ? (
                <span className="text-foreground">{item.label}</span>
              ) : (
                <Link
                  href={item.path}
                  className="hover:text-foreground transition-colors"
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
