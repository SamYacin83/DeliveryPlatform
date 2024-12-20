import { Package, Clock, Shield, CalendarClock } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Nos Services de Livraison</h1>
        <p className="text-lg text-muted-foreground">
          Des solutions adaptées à tous vos besoins de livraison
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Livraison Express */}
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Package className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Livraison Express</h3>
            <p className="text-muted-foreground mb-6">
              Livraison en moins de 30 minutes pour les commandes urgentes.
            </p>
            <p className="text-primary font-medium">À partir de 5,99€</p>
          </div>
        </div>

        {/* Livraison Standard */}
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Clock className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Livraison Standard</h3>
            <p className="text-muted-foreground mb-6">
              Livraison dans la journée pour vos colis non urgents.
            </p>
            <p className="text-primary font-medium">À partir de 3,99€</p>
          </div>
        </div>

        {/* Livraison Programmée */}
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <CalendarClock className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Livraison Programmée</h3>
            <p className="text-muted-foreground mb-6">
              Choisissez votre créneau de livraison à l'avance.
            </p>
            <p className="text-primary font-medium">À partir de 4,99€</p>
          </div>
        </div>

        {/* Livraison Sécurisée */}
        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Livraison Sécurisée</h3>
            <p className="text-muted-foreground mb-6">
              Protection maximale pour vos colis de valeur.
            </p>
            <p className="text-primary font-medium">À partir de 7,99€</p>
          </div>
        </div>
      </div>
    </div>
  );
}
