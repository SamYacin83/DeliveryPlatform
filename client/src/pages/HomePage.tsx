import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  const filteredArticles = articles?.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-16">
      <section className="relative bg-gradient-to-b from-primary/5 to-background pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 pt-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                Livraison rapide à<br />
                <span className="text-primary">portée de main</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                Faites-vous livrer tout ce dont vous avez besoin en quelques minutes. Des courses aux documents, nous assurons une livraison fiable et rapide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="px-8">
                  Commencer
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/hero-image.jpg"
                  alt="Livraison rapide"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Nos Articles</h2>
            <div className="w-72 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="mt-4 text-muted-foreground">Chargement des articles...</p>
            </div>
          ) : filteredArticles?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun article trouvé
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}