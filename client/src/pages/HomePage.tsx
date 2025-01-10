import { useState, useEffect } from "react";
import { Link } from "wouter";
import ArticleCard from "../components/ArticleCard";
import { Article } from "../types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Clock, Shield, CalendarClock, Star, TrendingUp, Truck, Phone } from "lucide-react";
import ArticleCardSkeleton from "../components/ArticleCardSkeleton";
import OnboardingDialog from "../components/OnboardingDialog";
import { motion } from "framer-motion";

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

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Simuler un temps de chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []); // Tableau de dépendances vide pour ne l'exécuter qu'une fois au montage

  const filteredArticles = MOCK_ARTICLES.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderArticlesContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <OnboardingDialog />
      {/* Hero Section avec CTA */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Livraison rapide à portée de main
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Des courses aux documents, nous assurons une livraison rapide et sécurisée en quelques clics
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button size="lg" className="text-lg" asChild>
                <Link href="/articles">
                  Commander maintenant
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <Link href="/services">
                  Nos services
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi choisir RapidLivre ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Livraison ultra-rapide</h3>
              <p className="text-muted-foreground">
                Livraison en moins de 30 minutes pour les commandes urgentes
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Sécurisé</h3>
              <p className="text-muted-foreground">
                Suivi en temps réel et assurance sur toutes les livraisons
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Service Premium</h3>
              <p className="text-muted-foreground">
                Une équipe dédiée et un support client 24/7
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">1. Commandez en ligne</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez vos articles et passez commande
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">2. Préparation rapide</h3>
              <p className="text-sm text-muted-foreground">
                Nos partenaires préparent votre commande
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">3. Suivi en temps réel</h3>
              <p className="text-sm text-muted-foreground">
                Suivez votre livraison sur la carte
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarClock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">4. Livraison express</h3>
              <p className="text-sm text-muted-foreground">
                Recevez votre commande en un temps record
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie M.",
                role: "Cliente régulière",
                content: "Service impeccable ! Ma commande est toujours livrée dans les temps."
              },
              {
                name: "Thomas L.",
                role: "Entrepreneur",
                content: "RapidLivre a révolutionné la gestion de mes livraisons urgentes."
              },
              {
                name: "Marie D.",
                role: "Commerçante",
                content: "Un service client exceptionnel et des livreurs très professionnels."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">{testimonial.name[0]}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
                <div className="mt-4 flex text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à essayer RapidLivre ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de clients satisfaits dès aujourd'hui
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link href="/articles">
                Voir nos articles
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-transparent border-white hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}