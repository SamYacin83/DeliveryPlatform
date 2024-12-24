import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">RapidLivre</h3>
            <p className="text-sm text-muted-foreground">
              Votre service de livraison rapide et fiable pour tous vos besoins quotidiens.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/articles" className="hover:text-primary transition-colors">Articles</Link></li>
              <li><Link href="/delivery" className="hover:text-primary transition-colors">Livraison</Link></li>
              <li><Link href="/tracking" className="hover:text-primary transition-colors">Suivi</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">À propos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">Notre histoire</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/careers">Carrières</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Horaires</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Lundi - Samedi: 8h - 22h</li>
              <li>Dimanche: 9h - 20h</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 RapidLivre. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
