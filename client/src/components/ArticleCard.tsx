import { Article } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const orderMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId: article.id }),
      });
      if (!res.ok) throw new Error('Échec de la commande');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Succès",
        description: "Votre commande a été passée avec succès",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
          <Badge variant="secondary">
            <Package className="w-3 h-3 mr-1" />
            {article.stock > 0 ? "En stock" : "Rupture"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">
          {article.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 border-t">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">{article.price.toFixed(2)} €</span>
          <span className="text-xs text-muted-foreground">TTC, livraison incluse</span>
        </div>
        <Button
          onClick={() => orderMutation.mutate()}
          disabled={orderMutation.isPending || article.stock === 0}
          className="flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          {orderMutation.isPending ? "En cours..." : "Commander"}
        </Button>
      </CardFooter>
    </Card>
  );
}
