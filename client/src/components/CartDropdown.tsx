import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function CartDropdown() {
  const { items, removeItem, getItemCount } = useCart();
  const total = items.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-primary/5"
        >
          <ShoppingCart className="h-5 w-5" />
          <AnimatePresence>
            {getItemCount() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-1.5"
              >
                <Badge 
                  variant="default"
                  className="h-[18px] min-w-[18px] rounded-full p-0.5 text-xs flex items-center justify-center"
                >
                  <motion.span
                    key={getItemCount()}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {getItemCount()}
                  </motion.span>
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 z-[1000]">
        <div className="p-2 text-sm font-medium">Mon Panier</div>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-auto">
          {items.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              Votre panier est vide
            </div>
          ) : (
            <>
              {items.map((item) => (
                <DropdownMenuItem key={item.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 space-y-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{item.title}</p>
                      <span className="text-xs text-muted-foreground">×{item.quantity || 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Number(item.price).toFixed(2)} DJF × {item.quantity || 1} = {(Number(item.price) * (item.quantity || 1)).toFixed(2)} DJF
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </div>
        {items.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total</span>
                <span className="font-bold">{total.toFixed(2)} DJF</span>
              </div>
              <Button className="w-full" asChild>
                <Link href="/checkout">
                  Commander maintenant
                </Link>
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
