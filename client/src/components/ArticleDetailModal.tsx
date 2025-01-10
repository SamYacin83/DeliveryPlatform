import { Article } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import CustomButton from "@/components/ui/custom-button";
import { ShoppingCart, Clock, MapPin, Star, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface ArticleDetailModalProps {
  article: Article;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ArticleDetailModal({
  article,
  open,
  onOpenChange,
}: ArticleDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Ajouter l'article au panier
    addItem({
      ...article,
      quantity: quantity
    });

    // Afficher la notification
    toast({
      title: "Ajouté au panier",
      description: `${quantity} × ${article.title} ajouté au panier`,
    });
    
    // Fermer le modal
    onOpenChange(false);
  };

  const features = [
    {
      icon: Clock,
      text: "Livraison en 30 minutes",
    },
    {
      icon: MapPin,
      text: "Suivi en temps réel",
    },
    {
      icon: Star,
      text: "Qualité garantie",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Détails de l'article</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Image Section */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <Badge 
                variant={article.type === "SOGIK" ? "destructive" : "secondary"}
                className="absolute top-2 right-2"
              >
                {article.type}
              </Badge>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">{article.title}</h3>
              <p className="text-muted-foreground mt-2">{article.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{article.price.toFixed(2)} DJF</span>
                <Badge variant="outline">Stock: {article.stock}</Badge>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantité:</span>
                <div className="flex items-center gap-2">
                  <CustomButton
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </CustomButton>
                  <span className="w-12 text-center">{quantity}</span>
                  <CustomButton
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setQuantity(Math.min(article.stock, quantity + 1))}
                    disabled={quantity >= article.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </CustomButton>
                </div>
              </div>

              {/* Add to Cart Button */}
              <div className="pt-4">
                <CustomButton
                  className="w-full"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={article.stock === 0}
                  leftIcon={<ShoppingCart className="w-4 h-4" />}
                >
                  Ajouter au panier
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
