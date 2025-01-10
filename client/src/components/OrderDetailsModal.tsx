import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Package, MapPin, Truck } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DashboardOrder } from "@/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface OrderDetailsModalProps {
  order: DashboardOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusColors = {
  pending: "bg-yellow-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusTranslations = {
  pending: "En attente",
  delivered: "Livré",
  cancelled: "Annulé",
};

export default function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  const { t } = useTranslation();

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl z-[100]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">
                {t("dashboard:orderDetails")} #{order.id}
              </DialogTitle>
              <DialogDescription>
                {format(new Date(order.date), "PPP", { locale: fr })}
              </DialogDescription>
            </div>
            <Badge
              variant="outline"
              className={`${
                statusColors[order.status]
              } text-white border-none px-3 py-1`}
            >
              {statusTranslations[order.status]}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations de livraison */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Truck className="w-5 h-5" />
              {t("dashboard:deliveryInfo")}
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard:trackingNumber")}
                </p>
                <p className="font-medium">{order.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t("dashboard:estimatedDelivery")}
                </p>
                <p className="font-medium">
                  {order.estimatedDelivery
                    ? format(new Date(order.estimatedDelivery), "PPP", {
                        locale: fr,
                      })
                    : "-"}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">
                  {t("dashboard:deliveryAddress")}
                </p>
                <p className="font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {order.deliveryAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Articles commandés */}
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Package className="w-5 h-5" />
              {t("dashboard:orderedItems")}
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-muted rounded-lg"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <Badge variant="secondary">{item.type}</Badge>
                    <p className="text-sm text-muted-foreground">
                      {t("dashboard:quantity")}: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {(item.price * item.quantity).toLocaleString()} DJF
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item.price.toLocaleString()} DJF / unité
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="font-semibold text-lg">{t("dashboard:total")}</p>
            <p className="font-bold text-xl">
              {order.total.toLocaleString()} DJF
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
