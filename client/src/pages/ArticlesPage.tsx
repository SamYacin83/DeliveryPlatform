import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomButton from "@/components/ui/custom-button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Données mockées pour les articles
const MOCK_ARTICLES: Article[] = [
  {
    id: 1,
    title: "Pizza Margherita",
    description: "Délicieuse pizza traditionnelle avec sauce tomate, mozzarella et basilic frais",
    price: 12.99,
    supplierId: 1,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&h=400&fit=crop"
  },
  {
    id: 2,
    title: "Burger Gourmet",
    description: "Burger artisanal avec steak haché frais, cheddar, bacon et sauce maison",
    price: 15.99,
    supplierId: 1,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Salade César",
    description: "Salade fraîche avec poulet grillé, croûtons, parmesan et sauce césar maison",
    price: 10.99,
    supplierId: 5,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500&h=400&fit=crop"
  },
  {
    id: 4,
    title: "Pâtes Carbonara",
    description: "Pâtes fraîches avec sauce carbonara, pancetta et parmesan",
    price: 13.99,
    supplierId: 3,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500&h=400&fit=crop"
  },
  {
    id: 5,
    title: "Sushi Mix",
    description: "Assortiment de sushis avec saumon, thon et crevettes",
    price: 24.99,
    supplierId: 2,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=400&fit=crop"
  },
  {
    id: 6,
    title: "Poulet Tikka Masala",
    description: "Poulet mariné cuit au tandoor avec sauce curry crémeuse et riz basmati",
    price: 16.99,
    supplierId: 1,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500&h=400&fit=crop"
  },
  {
    id: 7,
    title: "Ramen au Porc",
    description: "Ramen japonais avec porc char siu, œuf mollet et légumes",
    price: 14.99,
    supplierId: 4,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&h=400&fit=crop"
  },
  {
    id: 8,
    title: "Tacos au Bœuf",
    description: "Tacos mexicains avec bœuf épicé, guacamole et salsa",
    price: 11.99,
    supplierId: 3,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500&h=400&fit=crop"
  },
  {
    id: 9,
    title: "Poke Bowl Saumon",
    description: "Bowl hawaïen avec saumon frais, avocat, mangue et riz",
    price: 18.99,
    supplierId: 2,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=400&fit=crop"
  },
  {
    id: 10,
    title: "Pad Thai",
    description: "Nouilles de riz sautées aux crevettes et sauce tamarin",
    price: 15.99,
    supplierId: 5,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&h=400&fit=crop"
  },
  {
    id: 11,
    title: "Moussaka",
    description: "Gratin d'aubergines à la grecque avec viande hachée et béchamel",
    price: 17.99,
    supplierId: 1,
    stock: 10,
    type: "Particulier",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=400&fit=crop"
  },
  {
    id: 12,
    title: "Paella aux Fruits de Mer",
    description: "Paella espagnole avec crevettes, moules et calamars",
    price: 22.99,
    supplierId: 4,
    stock: 10,
    type: "SOGIK",
    imageUrl: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=500&h=400&fit=crop"
  }
];

const ITEMS_PER_PAGE = 6;

export default function ArticlesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un temps de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filtrer les articles en fonction de la recherche et du type
  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || article.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Calculer la pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Gérer le changement de page
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderArticlesContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
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
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <div className="flex items-center gap-2">
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="hidden sm:inline-flex h-8 w-8 p-0 items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
                <ChevronLeft className="h-4 w-4 -ml-2" />
              </CustomButton>
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </CustomButton>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(page => {
                    if (totalPages <= 5) return true;
                    if (page === 1 || page === totalPages) return true;
                    if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                    return false;
                  })
                  .map((page, index, array) => {
                    if (index > 0 && array[index - 1] !== page - 1) {
                      return [
                        <span
                          key={`ellipsis-${page}`}
                          className="w-8 text-center text-muted-foreground"
                        >
                          ...
                        </span>,
                        <CustomButton
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            "h-8 w-8 p-0",
                            currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/90"
                          )}
                        >
                          {page}
                        </CustomButton>
                      ];
                    }
                    return (
                      <CustomButton
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={cn(
                          "h-8 w-8 p-0",
                          currentPage === page && "bg-primary text-primary-foreground hover:bg-primary/90"
                        )}
                      >
                        {page}
                      </CustomButton>
                    );
                  })}
              </div>

              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </CustomButton>
              <CustomButton
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="hidden sm:inline-flex h-8 w-8 p-0 items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 -ml-2" />
              </CustomButton>
            </div>
            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              Page {currentPage} sur {totalPages} ({filteredArticles.length} articles)
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header avec recherche et filtre */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Nos Articles</h1>
            <p className="text-muted-foreground">
              Découvrez notre sélection de produits frais et délicieux
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher des articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Select
              value={selectedType}
              onValueChange={(value) => {
                setSelectedType(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Type de produit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="Particulier">Particulier</SelectItem>
                <SelectItem value="SOGIK">SOGIK</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Liste des articles */}
        {renderArticlesContent()}
      </div>
    </div>
  );
}
