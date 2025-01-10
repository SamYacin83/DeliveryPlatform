import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";

// Données mockées pour les articles
const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Pizza Margherita",
    description: "Délicieuse pizza traditionnelle avec sauce tomate, mozzarella et basilic frais",
    price: 12.99,
    supplierId: 1,
    stock: 10,
  },
  {
    id: 2,
    title: "Burger Gourmet",
    description: "Burger artisanal avec steak haché frais, cheddar, bacon et sauce maison",
    price: 15.99,
    supplierId: 1,
    stock: 10,
  },
  {
    id: 3,
    title: "Salade César",
    description: "Salade fraîche avec poulet grillé, croûtons, parmesan et sauce césar maison",
    price: 10.99,
    supplierId: 5,
    stock: 10,
  },
  {
    id: 4,
    title: "Pâtes Carbonara",
    description: "Pâtes fraîches avec sauce carbonara, pancetta et parmesan",
    price: 13.99,
    supplierId: 3,
    stock: 10,
  },
  {
    id: 5,
    title: "Sushi Mix",
    description: "Assortiment de sushis avec saumon, thon et crevettes",
    price: 24.99,
    supplierId: 2,
    stock: 10,
  },
  {
    id: 6,
    title: "Poulet Tikka Masala",
    description: "Poulet mariné cuit au tandoor avec sauce curry crémeuse et riz basmati",
    price: 16.99,
    supplierId: 1,
    stock: 10,
  }
];

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un temps de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredArticles = MOCK_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderArticlesContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (filteredArticles.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          Aucun article trouvé
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header avec recherche */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nos Articles</h1>
            <p className="text-muted-foreground">
              Découvrez notre sélection de produits frais et délicieux
            </p>
          </div>
          <div className="w-full md:w-72">
            <div className="relative">
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
        </div>

        {/* Filtres (à implémenter plus tard) */}
        <div className="mb-8">
          {/* Ajouter des filtres par catégorie, prix, etc. */}
        </div>

        {/* Liste des articles */}
        {renderArticlesContent()}
      </div>
    </div>
  );
}
