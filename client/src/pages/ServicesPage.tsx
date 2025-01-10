import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Truck, 
  Clock, 
  Shield, 
  Package, 
  Smartphone,
  CalendarClock,
  Users,
  HeartHandshake,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Livraison Express",
    description: "Livraison en moins de 30 minutes pour les commandes urgentes.",
    price: "À partir de 5,99 DJF",
    features: [
      "Livraison en 30 minutes",
      "Suivi en temps réel",
      "Assurance incluse",
      "Service 24/7"
    ]
  },
  {
    icon: Clock,
    title: "Livraison Standard",
    description: "Livraison dans la journée pour vos colis non urgents.",
    price: "À partir de 3,99 DJF",
    features: [
      "Livraison le jour même",
      "Prix économique",
      "Suivi de commande",
      "Service fiable"
    ]
  },
  {
    icon: CalendarClock,
    title: "Livraison Programmée",
    description: "Choisissez votre créneau de livraison à l'avance.",
    price: "À partir de 4,99 DJF",
    features: [
      "Choix du créneau horaire",
      "Planification flexible",
      "Rappels automatiques",
      "Modification possible"
    ]
  }
];

const features = [
  {
    icon: Clock,
    title: "Rapidité",
    description: "Livraison ultra-rapide en moins de 30 minutes pour les commandes urgentes"
  },
  {
    icon: Shield,
    title: "Sécurité",
    description: "Vos colis sont assurés et suivis en temps réel pendant toute la livraison"
  },
  {
    icon: Smartphone,
    title: "Application Mobile",
    description: "Suivez vos livraisons en temps réel depuis notre application mobile"
  },
  {
    icon: Users,
    title: "Service Client",
    description: "Une équipe dédiée à votre écoute 24/7 pour répondre à vos besoins"
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction Garantie",
    description: "Nous nous engageons à vous offrir un service de qualité irréprochable"
  }
];

export default function ServicesPage() {
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
              Nos Services de Livraison
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Des solutions de livraison adaptées à tous vos besoins
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services principaux */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-muted-foreground mb-4 text-center">{service.description}</p>
                <p className="text-primary font-semibold text-lg text-center mb-6">{service.price}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" asChild>
                  <Link href="/articles">
                    Commander maintenant
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Caractéristiques */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi choisir nos services ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer ?</h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez des milliers de clients satisfaits et profitez de nos services de livraison
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg" asChild>
              <Link href="/articles">
                Commander maintenant
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-transparent border-white hover:bg-white/10">
              Contactez-nous
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
