import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import OnboardingDialog from "../components/OnboardingDialog";


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
      <OnboardingDialog />
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
                <Button size="lg" variant="outline" className="px-8" asChild>
                  <Link href="/about">En savoir plus</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative h-[400px] w-full flex items-center justify-center">
                <div className="w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                  <svg
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-xl"
                  >
                    {/* Fond avec gradient */}
                    <rect width="800" height="600" fill="url(#gradient)" rx="20" />
                    
                    {/* Smartphone */}
                    <rect x="100" y="100" width="300" height="500" rx="20" fill="#1F2937" />
                    <rect x="110" y="110" width="280" height="480" rx="15" fill="#F8FAFC" />
                    
                    {/* Carte sur l'écran */}
                    <rect x="120" y="120" width="260" height="400" rx="10" fill="#E5E7EB" />
                    
                    {/* Route */}
                    <path
                      d="M150,300 Q250,200 350,300"
                      stroke="hsl(252,85%,60%)"
                      strokeWidth="4"
                      strokeDasharray="8,8"
                      strokeLinecap="round"
                    />
                    
                    {/* Points de départ et d'arrivée */}
                    <circle cx="150" cy="300" r="8" fill="hsl(252,85%,60%)" />
                    <circle cx="350" cy="300" r="8" fill="hsl(252,85%,60%)" />
                    
                    {/* Scooter et livreur */}
                    <g transform="translate(450, 250)">
                      {/* Scooter */}
                      <rect x="0" y="100" width="200" height="80" rx="20" fill="hsl(252,85%,60%)" />
                      <circle cx="50" cy="180" r="30" fill="#1F2937" />
                      <circle cx="150" cy="180" r="30" fill="#1F2937" />
                      
                      {/* Livreur */}
                      <circle cx="100" cy="80" r="40" fill="#1F2937" />
                      <rect x="60" y="120" width="80" height="100" rx="20" fill="hsl(252,85%,60%)" />
                    </g>
                    
                    {/* Gradient définition */}
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="800" y2="600">
                        <stop offset="0%" stopColor="#F8FAFC" />
                        <stop offset="100%" stopColor="#F1F5F9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
              ))}
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
      <OnboardingDialog /> {/* Added OnboardingDialog here */}
    </div>
  );
}