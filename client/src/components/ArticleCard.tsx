import { Article } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import CustomButton from "@/components/ui/custom-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from 'react-i18next';
import { mockOrders } from "../mocks/data";
import { motion } from "framer-motion";
import { useState } from "react";
import ArticleDetailModal from "./ArticleDetailModal";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const [showDetail, setShowDetail] = useState(false);
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const orderMutation = useMutation({
    mutationFn: async () => {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newOrder = {
        id: mockOrders.length + 1,
        items: [
          {
            articleId: article.id,
            quantity: 1,
            price: article.price,
          },
        ],
        status: "pending",
        total: article.price,
        createdAt: new Date().toISOString(),
        estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(), // +30 minutes
      };
      mockOrders.push(newOrder);
      return newOrder;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: t("toast.orderSuccess"),
        description: t("toast.orderSuccessDescription"),
      });
    },
  });

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
          {/* Image */}
          <div 
            className="relative h-48 overflow-hidden cursor-pointer"
            onClick={() => setShowDetail(true)}
          >
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
              <h3 className="font-semibold text-lg leading-none cursor-pointer hover:text-primary"
                  onClick={() => setShowDetail(true)}>
                {article.title}
              </h3>
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
            <CustomButton 
              className="w-full" 
              size="lg"
              variant="default"
              elevation="md"
              leftIcon={<ShoppingCart className="h-4 w-4" />}
              onClick={() => orderMutation.mutate()}
              disabled={article.stock === 0 || orderMutation.isPending}
              loading={orderMutation.isPending}
            >
              {orderMutation.isPending ? t("button.pending") : t("button.addToCart")}
            </CustomButton>
          </CardFooter>
        </Card>
      </motion.div>

      <ArticleDetailModal
        article={article}
        open={showDetail}
        onOpenChange={setShowDetail}
      />
    </>
  );
}
