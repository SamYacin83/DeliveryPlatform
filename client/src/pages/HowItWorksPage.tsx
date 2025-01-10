import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Package,
  Clock,
  TrendingUp,
  CalendarClock,
  ArrowRight,
  Smartphone,
  CreditCard,
  MapPin,
  Bell,
  CheckCircle2
} from "lucide-react";

const steps = [
  {
    icon: Package,
    title: "1. Commandez en ligne",
    description: "Sélectionnez vos articles et passez commande en quelques clics",
    details: [
      "Choix parmi une large sélection de produits",
      "Interface de commande simple et intuitive",
      "Panier sauvegardé automatiquement",
      "Options de livraison flexibles"
    ]
  },
  {
    icon: Clock,
    title: "2. Préparation rapide",
    description: "Nos partenaires préparent votre commande avec soin",
    details: [
      "Préparation immédiate de votre commande",
      "Vérification qualité systématique",
      "Emballage sécurisé",
      "Notification dès que c'est prêt"
    ]
  },
  {
    icon: TrendingUp,
    title: "3. Suivi en temps réel",
    description: "Suivez votre livraison sur la carte en temps réel",
    details: [
      "Suivi GPS en direct",
      "Estimation du temps d'arrivée",
      "Notifications d'étapes",
      "Contact direct avec le livreur"
    ]
  },
  {
    icon: CalendarClock,
    title: "4. Livraison express",
    description: "Recevez votre commande en un temps record",
    details: [
      "Livraison en 30 minutes maximum",
      "Créneaux horaires respectés",
      "Livreurs professionnels",
      "Confirmation de livraison"
    ]
  }
];

const features = [
  {
    icon: Smartphone,
    title: "Application Mobile",
    description: "Commandez facilement depuis notre application mobile intuitive"
  },
  {
    icon: CreditCard,
    title: "Paiement Sécurisé",
    description: "Plusieurs options de paiement sécurisées disponibles"
  },
  {
    icon: MapPin,
    title: "Zone de Livraison",
    description: "Large couverture de livraison dans toute la ville"
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Restez informé à chaque étape de votre commande"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Comment ça marche ?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Découvrez comment commander et recevoir vos articles en quelques étapes simples
            </motion.p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                  <p className="text-muted-foreground mb-6 text-center">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commander ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Commencez dès maintenant et profitez de notre service de livraison rapide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link href="/articles">
                Commander maintenant
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-transparent border-white hover:bg-white/10" asChild>
              <Link href="/services">
                Voir nos services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
