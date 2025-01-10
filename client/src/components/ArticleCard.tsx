import { Article } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import { mockOrders } from "../mocks/data";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation();

  const orderMutation = useMutation({
    mutationFn: async () => {
      // Simuler un délai de réponse
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newOrder = {
        id: String(mockOrders.length + 1),
        articleId: article.id,
        userId: '1',
        status: 'PENDING',
        createdAt: new Date().toISOString(),
      };
      
      mockOrders.push(newOrder);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast({
        title: t("toast.success.title"),
        description: t("toast.success.description"),
      });
    },
    onError: (error: Error) => {
      toast({
        title: t("toast.error.title"),
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge 
          variant={article.type === "SOGIK" ? "destructive" : "secondary"}
          className="absolute top-2 right-2"
        >
          {article.type}
        </Badge>
      </div>

      <CardHeader>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-none">{article.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">{article.price.toFixed(2)} DJF</p>
          <p className="text-sm text-muted-foreground">
            Stock: {article.stock}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => orderMutation.mutate()}
          disabled={article.stock === 0 || orderMutation.isPending}
          size="lg"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {orderMutation.isPending ? t("button.pending") : t("button.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}
