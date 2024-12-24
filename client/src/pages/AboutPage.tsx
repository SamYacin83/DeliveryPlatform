import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, Clock, Shield, HeartHandshake } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">
              Votre Partenaire de Confiance pour la Livraison
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez comment RapidLivre révolutionne la livraison avec une approche centrée sur la qualité, 
              la rapidité et la satisfaction client.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
            <Truck className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Livraison Express</h3>
            <p className="text-muted-foreground">
              Service de livraison ultra-rapide pour tous vos besoins urgents
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
            <Clock className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">24/7 Disponible</h3>
            <p className="text-muted-foreground">
              Notre service est disponible à tout moment, jour et nuit
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sécurité Garantie</h3>
            <p className="text-muted-foreground">
              Vos articles sont assurés pendant toute la durée de la livraison
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-sm">
            <HeartHandshake className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Service Client</h3>
            <p className="text-muted-foreground">
              Une équipe dédiée à votre satisfaction
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">+50K</div>
              <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-muted-foreground">Livraisons à l'heure</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Client</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h2>
          <p className="text-lg mb-6 opacity-90">
            Rejoignez des milliers de clients satisfaits et découvrez la différence RapidLivre.
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Commencer Maintenant
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
}
