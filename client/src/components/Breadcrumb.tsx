import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RouteInfo {
  label: string;
  description: string;
}

const routes: Record<string, RouteInfo> = {
  '/': {
    label: 'Accueil',
    description: 'Page d\'accueil de RapidLivre'
  },
  '/products': {
    label: 'Produits',
    description: 'Liste de tous les produits'
  },
  '/products/add': {
    label: 'Nouveau produit',
    description: 'Créer un nouveau produit'
  },
  '/products/edit': {
    label: 'Modifier le produit',
    description: 'Modifier les informations du produit'
  },
  '/about': {
    label: 'À propos',
    description: 'En savoir plus sur RapidLivre et notre mission'
  },
  '/auth': {
    label: 'Authentification',
    description: 'Connexion ou création de compte'
  },
  '/auth/forgot-password': {
    label: 'Mot de passe oublié',
    description: 'Réinitialisation de votre mot de passe'
  },
  '/dashboard': {
    label: 'Tableau de bord',
    description: 'Gérez vos livraisons et suivez vos commandes'
  },
  '/articles': {
    label: 'Articles',
    description: 'Actualités et informations sur nos services'
  },
  '/how-it-works': {
    label: 'Comment ça marche',
    description: 'Guide détaillé de notre processus de livraison'
  },
  '/services': {
    label: 'Services',
    description: 'Découvrez nos différentes options de livraison'
  },
  '/testimonials': {
    label: 'Témoignages',
    description: 'Avis et retours d\'expérience de nos clients'
  },
};

export default function Breadcrumb() {
  const [location] = useLocation();
  
  if (location === '/') return null;
  
  const pathSegments = location.split('/').filter(Boolean);
  const breadcrumbItems = [];

  // Toujours ajouter le lien vers les produits s'il est dans le chemin
  if (pathSegments[0] === 'products') {
    breadcrumbItems.push({
      path: '/products',
      label: 'Produits',
      description: 'Liste de tous les produits'
    });

    // Gérer les cas d'édition et de création
    if (pathSegments[1] === 'add') {
      // Mode création d'un nouveau produit
      breadcrumbItems.push({
        path: location,
        label: 'Nouveau produit',
        description: 'Créer un nouveau produit'
      });
    } else if (pathSegments[1] === 'edit' && pathSegments[2]) {
      // Mode édition d'un produit existant
      breadcrumbItems.push({
        path: location,
        label: 'Modifier le produit',
        description: 'Modifier les informations du produit'
      });
    }
  } else {
    // Pour les autres routes, utiliser la logique existante
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      const routeInfo = routes[path] || {
        label: segment.charAt(0).toUpperCase() + segment.slice(1),
        description: ''
      };
      breadcrumbItems.push({ path, ...routeInfo });
    });
  }

  return (
    <div className="bg-gradient-to-r from-primary/5 to-background border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/" 
                  className="flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <Home className="h-4 w-4" />
                  <span className="ml-1.5">{routes['/'].label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{routes['/'].description}</p>
              </TooltipContent>
            </Tooltip>

            {breadcrumbItems.map((item, index) => (
              <div key={item.path} className="flex items-center">
                <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </nav>
      </div>
    </div>
  );
}
