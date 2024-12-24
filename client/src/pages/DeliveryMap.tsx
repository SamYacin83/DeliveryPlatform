// DeliveryMap.tsx (exemple minimal)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Order } from "../types";

// Ajuster le type si tu veux Orders ou Deliveries
interface Props {
 readonly orders: Order[];
}

export default function DeliveryMap({ orders }: Props) {
  // Position par défaut (ex. Paris)
  const defaultPosition: [number, number] = [48.8566, 2.3522];

  // Icône Leaflet personnalisée
  const deliveryIcon = new L.Icon({
    iconUrl: "/delivery-marker.png", // ton image
    iconSize: [32, 32],
  });

  return (
    <MapContainer center={defaultPosition} zoom={12} style={{ height: "400px", width: "100%" }}>
      {/* Tuiles openstreetmap */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">
          OpenStreetMap</a> contributors'
      />

      {/* Exemple de marqueurs pour chaque commande */}
      {orders.map((order) => {
        // besoin d’avoir un lat/lng dans order, si non => mock
        const lat = 48.8566 + Math.random() * 0.02 - 0.01;
        const lng = 2.3522 + Math.random() * 0.02 - 0.01;

        return (
          <Marker key={order.id} position={[lat, lng]} icon={deliveryIcon}>
            <Popup>
              <div>
                <strong>Commande #{order.id}</strong>
                <br />
                Statut: {order.status}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
