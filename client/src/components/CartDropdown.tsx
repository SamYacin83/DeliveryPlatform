import { Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";

export default function CartDropdown() {
  const { items, removeItem, getItemCount } = useCart();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-primary/5 transition-colors"
        >
          <ShoppingCart className="h-5 w-5 text-foreground/80" />
          {getItemCount() > 0 && (
            <Badge 
              variant="default"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-primary text-primary-foreground"
            >
              {getItemCount()}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuGroup>
          {items.length === 0 ? (
            <div className="py-4 px-2 text-center text-muted-foreground">
              Votre panier est vide
            </div>
          ) : (
            <>
              {items.map((item) => (
                <DropdownMenuItem key={item.id} className="flex items-center justify-between p-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">
                      {Number(item.price).toFixed(2)} €
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive/90"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuItem>
              ))}
              <div className="p-4 border-t">
                <Button className="w-full" asChild>
                  <Link href="/checkout">
                    Commander ({getItemCount()} article{getItemCount() > 1 ? 's' : ''})
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
