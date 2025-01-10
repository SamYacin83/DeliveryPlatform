import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Package, PackagePlus, Plus, List } from "lucide-react";
import { useLocation } from "wouter";

export default function ProductMenu() {
  const [location, setLocation] = useLocation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-9 w-9 p-0">
          <Package className="h-5 w-5" />
          <span className="sr-only">Menu Produits</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLocation("/products")}>
          <List className="mr-2 h-4 w-4" />
          <span>Liste des produits</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocation("/products/add")}>
          <PackagePlus className="mr-2 h-4 w-4" />
          <span>Ajouter un produit</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setLocation("/product-types")}>
          <List className="mr-2 h-4 w-4" />
          <span>Types de produits</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLocation("/product-types/add")}>
          <Plus className="mr-2 h-4 w-4" />
          <span>Ajouter un type</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
