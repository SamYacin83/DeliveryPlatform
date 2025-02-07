import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DashboardOrder } from '@/types';
import { useTranslation } from 'react-i18next';
import { Locate } from 'lucide-react';
import { Button } from './ui/button';

interface MapProps {
  deliveries: DashboardOrder[];
}

// Position par défaut pour Djibouti
const DEFAULT_CENTER = [11.5886, 43.1457];
const DEFAULT_ZOOM = 14; // Zoom augmenté pour mieux voir les rues

// Fonction pour calculer un point intermédiaire entre deux positions
const interpolatePosition = (start: [number, number], end: [number, number], fraction: number): [number, number] => {
  return [
    start[0] + (end[0] - start[0]) * fraction,
    start[1] + (end[1] - start[1]) * fraction
  ];
};

// Fonction pour calculer la distance entre deux points
const calculateDistance = (point1: [number, number], point2: [number, number]): number => {
  const R = 6371e3; // Rayon de la Terre en mètres
  const φ1 = point1[0] * Math.PI / 180;
  const φ2 = point2[0] * Math.PI / 180;
  const Δφ = (point2[0] - point1[0]) * Math.PI / 180;
  const Δλ = (point2[1] - point1[1]) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

// Fonction pour formater le temps restant
const formatETA = (distanceInMeters: number, speedKmH: number = 30): string => {
  const timeInMinutes = (distanceInMeters / 1000) / (speedKmH / 60);
  if (timeInMinutes < 1) return "< 1 min";
  return `${Math.round(timeInMinutes)} min`;
};

export default function Map({ deliveries }: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const { t } = useTranslation();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [driverLocations, setDriverLocations] = useState<Record<string, [number, number]>>({});
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Initialisation de la carte
  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView(DEFAULT_CENTER, DEFAULT_ZOOM);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: ' OpenStreetMap contributors'
      }).addTo(mapRef.current);

      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapRef.current);

      L.control.attribution({
        position: 'bottomright',
        prefix: false
      }).addTo(mapRef.current)
        .addAttribution(' OpenStreetMap contributors');

      setIsMapInitialized(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        setIsMapInitialized(false);
      }
    };
  }, []);

  // Gérer la géolocalisation
  const handleLocateClick = () => {
    if (!mapRef.current) return;
    
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude];
          setUserLocation(newLocation);
          mapRef.current?.setView(newLocation, DEFAULT_ZOOM);
          setIsLocating(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsLocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  // Animation des livreurs
  useEffect(() => {
    if (!isMapInitialized) return;

    const animateDrivers = () => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTimeRef.current) / 1000;
      const newDriverLocations: Record<string, [number, number]> = {};

      deliveries
        .filter(delivery => delivery.status === "pending" && delivery.driver)
        .forEach(delivery => {
          const cycle = (elapsedTime % 60) / 60;
          const fraction = cycle < 0.5 
            ? cycle * 2
            : 2 - cycle * 2;
          
          const interpolated = interpolatePosition(
            delivery.driver!.currentLocation,
            delivery.coordinates,
            fraction
          );

          newDriverLocations[delivery.driver!.id] = interpolated;
        });

      setDriverLocations(newDriverLocations);
      animationFrameRef.current = requestAnimationFrame(animateDrivers);
    };

    startTimeRef.current = Date.now();
    animateDrivers();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [deliveries, isMapInitialized]);

  // Mise à jour des marqueurs
  useEffect(() => {
    if (!isMapInitialized || !mapRef.current) return;

    // Mise à jour du marqueur de position de l'utilisateur
    if (userLocation) {
      if (locationMarkerRef.current) {
        locationMarkerRef.current.setLatLng(userLocation);
      } else {
        const userIcon = L.divIcon({
          html: `<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div class="w-1 h-1 bg-white rounded-full"></div>
                </div>`,
          className: '',
          iconSize: [16, 16],
          iconAnchor: [8, 8]
        });

        locationMarkerRef.current = L.marker(userLocation, { icon: userIcon })
          .bindPopup(t("dashboard:yourLocation"))
          .addTo(mapRef.current);
      }
    }

    // Nettoyage des marqueurs existants
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Style personnalisé pour les marqueurs de destination
    const destinationIcon = L.divIcon({
      html: `<div class="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
             </div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    });

    // Style personnalisé pour les marqueurs de livreur
    const driverIcon = L.divIcon({
      html: `<div class="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
             </div>`,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    // Ajout des marqueurs pour les livraisons en cours
    deliveries
      .filter(delivery => delivery.status === "pending")
      .forEach(delivery => {
        // Marqueur de destination
        const destinationMarker = L.marker(delivery.coordinates, { icon: destinationIcon })
          .bindPopup(`
            <div class="p-2 space-y-1">
              <h3 class="font-semibold text-sm">Commande #${delivery.id}</h3>
              <p class="text-xs">${delivery.deliveryAddress}</p>
              <p class="text-xs font-medium">${t("dashboard:estimatedDelivery")}:</p>
              <p class="text-xs">${new Date(delivery.estimatedDelivery!).toLocaleString()}</p>
            </div>
          `)
          .addTo(mapRef.current);

        markersRef.current.push(destinationMarker);

        // Si un livreur est assigné, ajouter son marqueur
        if (delivery.driver) {
          const driverLocation = driverLocations[delivery.driver.id] || delivery.driver.currentLocation;
          const driverMarker = L.marker(driverLocation, { icon: driverIcon })
            .bindPopup(`
              <div class="p-2 space-y-1">
                <h3 class="font-semibold text-sm">${t("dashboard:deliveryDriver")}</h3>
                <p class="text-xs">${delivery.driver.name}</p>
                <p class="text-xs">${delivery.driver.phone}</p>
                <p class="text-xs font-medium">${t("dashboard:deliveryStatus")}:</p>
                <p class="text-xs">${t("dashboard:enRoute")}</p>
                <p class="text-xs font-medium mt-1">${t("dashboard:estimatedArrival")}:</p>
                <p class="text-xs">${formatETA(calculateDistance(driverLocation, delivery.coordinates))}</p>
              </div>
            `, { 
              autoPan: false, 
              closeButton: false 
            })
            .addTo(mapRef.current);

          markersRef.current.push(driverMarker);

          // Tracer une ligne entre le livreur et la destination
          const line = L.polyline([
            driverLocation,
            delivery.coordinates
          ], {
            color: '#FCD34D',
            weight: 2,
            opacity: 0.6,
            dashArray: '6, 8'
          }).addTo(mapRef.current);

          // Ajouter la ligne à la liste des marqueurs pour le nettoyage
          markersRef.current.push(line as unknown as L.Marker);
        }
      });

  }, [deliveries, t, userLocation, driverLocations, isMapInitialized]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-full rounded-lg overflow-hidden relative z-0" />
      <Button
        size="icon"
        variant="outline"
        className="absolute bottom-4 right-4 z-[1000] bg-white/90 hover:bg-white"
        onClick={handleLocateClick}
        disabled={isLocating || !isMapInitialized}
      >
        <Locate className={`h-4 w-4 ${isLocating ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  );
}
