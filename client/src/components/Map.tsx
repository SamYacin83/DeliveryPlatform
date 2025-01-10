import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

interface MapProps {
  deliveries: Array<{
    id: string;
    deliveryAddress: string;
  }>;
}

// Position par défaut pour Djibouti
const DEFAULT_CENTER = [11.5886, 43.1457];
const DEFAULT_ZOOM = 13;

export default function Map({ deliveries }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Initialisation de la carte
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      
      // Ajout de la couche OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Style personnalisé pour les marqueurs
      const customIcon = L.divIcon({
        html: `<div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
               </div>`,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      // Ajout des marqueurs pour les livraisons
      deliveries.forEach(delivery => {
        // Dans un cas réel, vous auriez les coordonnées GPS dans les données de livraison
        // Ici, nous ajoutons des marqueurs aléatoires autour du centre pour la démonstration
        const lat = DEFAULT_CENTER[0] + (Math.random() - 0.5) * 0.05;
        const lng = DEFAULT_CENTER[1] + (Math.random() - 0.5) * 0.05;
        
        const marker = L.marker([lat, lng], { icon: customIcon })
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-bold">Commande #${delivery.id}</h3>
              <p class="text-sm">${delivery.deliveryAddress}</p>
            </div>
          `)
          .addTo(mapRef.current!);
        
        markersRef.current.push(marker);
      });
    }

    // Nettoyage
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = [];
      }
    };
  }, [deliveries]);

  return (
    <div id="map" className="w-full h-full rounded-lg overflow-hidden border border-border relative z-0" />
  );
}
