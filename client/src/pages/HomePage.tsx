import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Clock, Shield, CalendarClock } from "lucide-react";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import OnboardingDialog from "../components/OnboardingDialog";
import { CartIcon } from "lucide-react";


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
    <div className="min-h-screen">
      <OnboardingDialog />
      {/* Hero section with illustration */}
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
              
              {/* Trust badges */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Livraison 24/7</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>100% Sécurisé</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Suivi en direct</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarClock className="w-4 h-4" />
                  <span>Planning flexible</span>
                </div>
              </div>
            </div>
            
            {/* Illustration */}
            <div className="flex-1">
              <div className="relative h-[400px] w-full flex items-center justify-center">
                <div className="w-full max-w-md transform hover:scale-105 transition-transform duration-300">
                  <svg
                    viewBox="0 0 800 600"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto drop-shadow-xl"
                  >
                    <rect width="800" height="600" fill="url(#gradient)" rx="20" />
                    <rect x="100" y="100" width="300" height="500" rx="20" fill="#1F2937" />
                    <rect x="110" y="110" width="280" height="480" rx="15" fill="#F8FAFC" />
                    <rect x="120" y="120" width="260" height="400" rx="10" fill="#E5E7EB" />
                    <path
                      d="M150,300 Q250,200 350,300"
                      stroke="hsl(252,85%,60%)"
                      strokeWidth="4"
                      strokeDasharray="8,8"
                      strokeLinecap="round"
                    />
                    <circle cx="150" cy="300" r="8" fill="hsl(252,85%,60%)" />
                    <circle cx="350" cy="300" r="8" fill="hsl(252,85%,60%)" />
                    <g transform="translate(450, 250)">
                      <rect x="0" y="100" width="200" height="80" rx="20" fill="hsl(252,85%,60%)" />
                      <circle cx="50" cy="180" r="30" fill="#1F2937" />
                      <circle cx="150" cy="180" r="30" fill="#1F2937" />
                      <circle cx="100" cy="80" r="40" fill="#1F2937" />
                      <rect x="60" y="120" width="80" height="100" rx="20" fill="hsl(252,85%,60%)" />
                    </g>
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

      {/* How it works section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Commandez en ligne</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez vos articles et passez commande
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Préparation</h3>
              <p className="text-sm text-muted-foreground">
                Nos partenaires préparent votre commande
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Suivi en temps réel</h3>
              <p className="text-sm text-muted-foreground">
                Suivez votre livraison sur la carte
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarClock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Livraison</h3>
              <p className="text-sm text-muted-foreground">
                Recevez votre commande rapidement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Nos Articles</h2>
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
    </div>
  );
}