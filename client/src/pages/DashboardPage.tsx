import { useEffect, useState, Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CustomButton from "@/components/ui/custom-button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  FileText,
  TrendingUp,
  MapPin,
  Calendar,
  Filter,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { lazy } from "react";
import { mockOrders } from "../mocks/orderData";
import { DashboardOrder } from "@/types";
import OrderDetailsModal from "@/components/OrderDetailsModal";

// Import dynamique du composant Map
const MapComponent = lazy(() => import("../components/Map"));

// Configuration des couleurs et icônes pour les statuts
const statusColors = {
  pending: "bg-yellow-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
};

const statusIcons = {
  pending: Clock,
  delivered: CheckCircle,
  cancelled: XCircle,
};

export default function DashboardPage() {
  const [timeFilter, setTimeFilter] = useState("3months");
  const [statusFilter, setStatusFilter] = useState("all");
  const { t } = useTranslation();
  const [orders, setOrders] = useState<DashboardOrder[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<DashboardOrder | null>(null);

  // Filtrer les commandes en fonction du timeFilter
  useEffect(() => {
    const now = new Date();
    let filterDate = new Date();
    
    switch (timeFilter) {
      case "week":
        filterDate.setDate(filterDate.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(filterDate.getMonth() - 1);
        break;
      case "3months":
        filterDate.setMonth(filterDate.getMonth() - 3);
        break;
      case "year":
        filterDate.setFullYear(filterDate.getFullYear() - 1);
        break;
    }

    const filteredOrders = mockOrders.filter(order => {
      const orderDate = new Date(order.date);
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }
      return orderDate >= filterDate && orderDate <= now;
    });

    setOrders(filteredOrders);
  }, [timeFilter, statusFilter]);

  // Statistiques calculées à partir des commandes filtrées
  const stats = {
    totalOrders: orders.length,
    totalSpent: orders.reduce((acc, order) => acc + order.total, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    deliveredOrders: orders.filter((order) => order.status === "delivered").length,
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboard:title")}</h1>
          <p className="text-muted-foreground">{t("dashboard:subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t("dashboard:selectPeriod")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">{t("dashboard:lastWeek")}</SelectItem>
              <SelectItem value="month">{t("dashboard:lastMonth")}</SelectItem>
              <SelectItem value="3months">{t("dashboard:last3Months")}</SelectItem>
              <SelectItem value="year">{t("dashboard:lastYear")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("dashboard:totalOrders")}
          value={stats.totalOrders}
          icon={Package}
          description={t("dashboard:ordersPeriod")}
        />
        <StatsCard
          title={t("dashboard:totalSpent")}
          value={`${stats.totalSpent.toFixed(2)} DJF`}
          icon={TrendingUp}
          description={t("dashboard:spentPeriod")}
        />
        <StatsCard
          title={t("dashboard:pendingOrders")}
          value={stats.pendingOrders}
          icon={Clock}
          description={t("dashboard:needsAction")}
        />
        <StatsCard
          title={t("dashboard:deliveredOrders")}
          value={stats.deliveredOrders}
          icon={CheckCircle}
          description={t("dashboard:completed")}
        />
      </div>

      {/* Contenu principal */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Liste des commandes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{t("dashboard:recentOrders")}</CardTitle>
                <CardDescription>{t("dashboard:lastOrders")}</CardDescription>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder={t("dashboard:allStatuses")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("dashboard:allStatuses")}</SelectItem>
                  <SelectItem value="pending">{t("dashboard:pending")}</SelectItem>
                  <SelectItem value="delivered">{t("dashboard:delivered")}</SelectItem>
                  <SelectItem value="cancelled">{t("dashboard:cancelled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${statusColors[order.status]}`}>
                      {(() => {
                        const StatusIcon = statusIcons[order.status];
                        return StatusIcon ? <StatusIcon className="w-4 h-4 text-white" /> : null;
                      })()}
                    </div>
                    <div>
                      <p className="font-medium">Commande #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">{order.total.toLocaleString()} DJF</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Carte de livraison */}
        <Card>
          <CardHeader>
            <CardTitle>{t("dashboard:deliveryMap")}</CardTitle>
            <CardDescription>{t("dashboard:activeDeliveries")}</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <Suspense fallback={<div>Loading...</div>}>
              <MapComponent deliveries={orders.filter(o => o.status === "pending")} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      {/* Modal de détails de commande */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, description }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className="p-3 bg-primary/10 rounded-full">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4">{description}</p>
      </CardContent>
    </Card>
  );
}