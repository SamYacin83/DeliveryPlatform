import { Article } from "../types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockOrders } from "../mocks/data";
import { useTranslation } from 'react-i18next';

interface ArticleCardProps {
  readonly article: Article;
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
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
          <Badge variant="secondary">
            <Package className="w-3 h-3 mr-1" />
            {article.stock > 0 ? t("badge.inStock") : t("badge.outOfStock")}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-600">{article.description}</p>
        <p className="mt-4 text-lg font-semibold">{article.price} DJF</p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={() => orderMutation.mutate()}
          disabled={article.stock === 0 || orderMutation.isPending}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {orderMutation.isPending ? t("button.pending") : t("button.addToCart")}
        </Button>
      </CardFooter>
    </Card>
  );
}
