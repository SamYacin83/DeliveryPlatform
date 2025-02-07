import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, CreditCard, Clock, Truck, ChevronRight, Calendar, Home, MapPinOff, Receipt, ArrowLeft, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Simuler un utilisateur connecté avec une adresse enregistrée
const mockUser = {
  name: "John Doe",
  phone: "+253 77 12 34 56",
  address: "Rue de la Paix, Djibouti ville",
};

export default function CheckoutPage() {
  const { items, getItemCount, clearCart } = useCart();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState<string>();
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: mockUser.name,
    phone: mockUser.phone,
    address: mockUser.address,
  });

  const subtotal = items.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);
  const deliveryFee = deliveryOption === "express" ? 200 : deliveryOption === "scheduled" ? 150 : 100;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirmOrder = async () => {
    setIsProcessing(true);
    try {
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été enregistrée avec succès. Un livreur vous contactera bientôt.",
        duration: 5000,
      });
      
      clearCart();
      // Rediriger vers la page de succès ou d'accueil
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la confirmation de votre commande.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setShowConfirmation(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Card className="text-center p-8">
          <CardHeader>
            <CardTitle>{t("checkout:emptyCart")}</CardTitle>
            <CardDescription>{t("checkout:emptyCartDescription")}</CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <Button variant="default" onClick={() => window.history.back()}>
              {t("checkout:continueShopping")}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="container py-8">
        <div className="grid lg:grid-cols-[1fr,400px] gap-8">
          {/* Formulaire de paiement */}
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t("checkout:title")}</CardTitle>
                <CardDescription>{t("checkout:description")}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {t("checkout:deliveryInfo")}
                  </h3>

                  <RadioGroup
                    defaultValue="saved"
                    className="grid gap-4"
                    value={useNewAddress ? "new" : "saved"}
                    onValueChange={(value) => {
                      setUseNewAddress(value === "new");
                      if (value === "saved") {
                        // Réinitialiser les valeurs du formulaire à l'adresse enregistrée
                        setDeliveryInfo({
                          name: mockUser.name,
                          phone: mockUser.phone,
                          address: mockUser.address,
                        });
                      }
                    }}
                  >
                    {/* Adresse enregistrée */}
                    <div>
                      <RadioGroupItem
                        value="saved"
                        id="saved"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="saved"
                        className={`flex flex-col space-y-2 rounded-lg border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer relative overflow-hidden transition-all duration-200`}
                      >
                        {/* Fond décoratif */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                          <div className="absolute right-0 top-0 w-32 h-32 transform translate-x-16 -translate-y-8">
                            <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                          </div>
                        </div>

                        {/* Badge "Adresse par défaut" */}
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                            Par défaut
                          </Badge>
                        </div>

                        {/* Contenu */}
                        <div className="relative">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <Home className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-semibold">{t("checkout:savedAddress")}</span>
                          </div>
                          <div className="space-y-2 pl-2 border-l-2 border-primary/20">
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-24 text-muted-foreground">Nom</div>
                              <div className="font-medium">{mockUser.name}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-24 text-muted-foreground">Téléphone</div>
                              <div className="font-medium">{mockUser.phone}</div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-24 text-muted-foreground">Adresse</div>
                              <div className="font-medium">{mockUser.address}</div>
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    {/* Nouvelle adresse */}
                    <div>
                      <RadioGroupItem
                        value="new"
                        id="new"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="new"
                        className={`flex flex-col space-y-2 rounded-lg border p-4 hover:bg-muted/50 [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 cursor-pointer relative overflow-hidden transition-all duration-200`}
                      >
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                        </div>

                        <div className="relative">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                              <MapPinOff className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-semibold">{t("checkout:useAnotherAddress")}</span>
                          </div>
                          {useNewAddress && (
                            <div className="grid gap-4 md:grid-cols-2 pt-4">
                              <div className="space-y-2">
                                <Label htmlFor="name">{t("checkout:name")}</Label>
                                <Input
                                  id="name"
                                  value={deliveryInfo.name}
                                  onChange={(e) =>
                                    setDeliveryInfo({ ...deliveryInfo, name: e.target.value })
                                  }
                                  required
                                  placeholder={t("checkout:name")}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phone">{t("checkout:phone")}</Label>
                                <Input
                                  id="phone"
                                  type="tel"
                                  value={deliveryInfo.phone}
                                  onChange={(e) =>
                                    setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })
                                  }
                                  required
                                  placeholder={t("checkout:phone")}
                                />
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="address">{t("checkout:address")}</Label>
                                <Input
                                  id="address"
                                  value={deliveryInfo.address}
                                  onChange={(e) =>
                                    setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
                                  }
                                  required
                                  placeholder={t("checkout:address")}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                {/* Options de livraison */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    {t("checkout:deliveryOptions")}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card 
                      className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        deliveryOption === "standard" 
                          ? "border-2 border-primary bg-primary/5 shadow-lg" 
                          : "border border-border hover:shadow-md"
                      }`}
                      onClick={() => setDeliveryOption("standard")}
                    >
                      <CardHeader>
                        <CardTitle className={`text-base flex items-center gap-2 ${
                          deliveryOption === "standard" ? "text-primary" : ""
                        }`}>
                          <Truck className="h-4 w-4" />
                          {t("checkout:standardDelivery")}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3" />
                          30-45 min
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Badge variant={deliveryOption === "standard" ? "default" : "secondary"} 
                               className="text-base px-4 py-1">
                          100 DJF
                        </Badge>
                      </CardFooter>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        deliveryOption === "express" 
                          ? "border-2 border-primary bg-primary/5 shadow-lg" 
                          : "border border-border hover:shadow-md"
                      }`}
                      onClick={() => setDeliveryOption("express")}
                    >
                      <CardHeader>
                        <CardTitle className={`text-base flex items-center gap-2 ${
                          deliveryOption === "express" ? "text-primary" : ""
                        }`}>
                          <Clock className="h-4 w-4" />
                          {t("checkout:expressDelivery")}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3" />
                          15-20 min
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Badge variant={deliveryOption === "express" ? "default" : "secondary"}
                               className="text-base px-4 py-1">
                          200 DJF
                        </Badge>
                      </CardFooter>
                    </Card>

                    <Card
                      className={`cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                        deliveryOption === "scheduled" 
                          ? "border-2 border-primary bg-primary/5 shadow-lg" 
                          : "border border-border hover:shadow-md"
                      }`}
                      onClick={() => setDeliveryOption("scheduled")}
                    >
                      <CardHeader>
                        <CardTitle className={`text-base flex items-center gap-2 ${
                          deliveryOption === "scheduled" ? "text-primary" : ""
                        }`}>
                          <Calendar className="h-4 w-4" />
                          {t("checkout:scheduledDelivery")}
                        </CardTitle>
                        {deliveryOption === "scheduled" ? (
                          <div className="mt-4 space-y-3">
                            <div className="space-y-2">
                              <Label>{t("checkout:selectDeliveryTime")}</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={`w-full justify-start text-left font-normal ${
                                      !scheduledDate && "text-muted-foreground"
                                    }`}
                                  >
                                    <Calendar className="mr-2 h-4 w-4" />
                                    {scheduledDate ? (
                                      format(scheduledDate, "PPP", { locale: fr })
                                    ) : (
                                      <span>{t("checkout:selectDeliveryTime")}</span>
                                    )}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <CalendarComponent
                                    mode="single"
                                    selected={scheduledDate}
                                    onSelect={setScheduledDate}
                                    disabled={(date) =>
                                      date < new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <Select
                                value={scheduledTime}
                                onValueChange={setScheduledTime}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Choisir l'heure" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="morning">9:00 - 12:00</SelectItem>
                                  <SelectItem value="afternoon">14:00 - 17:00</SelectItem>
                                  <SelectItem value="evening">18:00 - 21:00</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        ) : (
                          <CardDescription className="flex items-center gap-1 mt-2">
                            <Calendar className="h-3 w-3" />
                            {t("checkout:selectDeliveryTime")}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardFooter>
                        <Badge variant={deliveryOption === "scheduled" ? "default" : "secondary"}
                               className="text-base px-4 py-1">
                          150 DJF
                        </Badge>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                <Separator />

                {/* Paiement */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    {t("checkout:payment")}
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>{t("checkout:paymentMethod")}</Label>
                      <Select defaultValue="cash">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">
                            {t("checkout:cashOnDelivery")}
                          </SelectItem>
                          <SelectItem value="edahab">E-Dahab</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                      {t("checkout:processing")}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      {t("checkout:placeOrder")}
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Résumé de la commande */}
          <div className="lg:sticky lg:top-8 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="h-5 w-5" />
                  {t("checkout:orderSummary")}
                </CardTitle>
                <CardDescription>
                  {t("checkout:itemCount", { count: getItemCount() })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Liste des articles */}
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg overflow-hidden border bg-background">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-image.jpg"; // Image par défaut si l'image ne charge pas
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × {Number(item.price).toFixed(2)} DJF
                        </div>
                      </div>
                      <div className="font-medium whitespace-nowrap">
                        {(Number(item.price) * (item.quantity || 1)).toFixed(2)} DJF
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Calculs */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("checkout:subtotal")}</span>
                    <span>{subtotal} DJF</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("checkout:deliveryFee")}</span>
                    <span>{deliveryFee} DJF</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>{t("checkout:total")}</span>
                    <span>{total} DJF</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Dialog de confirmation */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Confirmer votre commande</DialogTitle>
            <DialogDescription>
              Veuillez vérifier les détails de votre commande avant de confirmer
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Adresse de livraison */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Adresse de livraison
              </h4>
              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="space-y-1">
                  <p className="font-medium">{useNewAddress ? deliveryInfo.name : mockUser.name}</p>
                  <p className="text-sm text-muted-foreground">{useNewAddress ? deliveryInfo.phone : mockUser.phone}</p>
                  <p className="text-sm text-muted-foreground">{useNewAddress ? deliveryInfo.address : mockUser.address}</p>
                </div>
              </div>
            </div>

            {/* Option de livraison */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Option de livraison
              </h4>
              <div className="rounded-lg border p-4 bg-muted/50">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {deliveryOption === "standard" 
                        ? "Livraison standard" 
                        : deliveryOption === "express" 
                          ? "Livraison express"
                          : "Livraison programmée"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {deliveryOption === "standard" 
                        ? "30-45 min" 
                        : deliveryOption === "express" 
                          ? "15-20 min"
                          : `${scheduledDate ? format(scheduledDate, "PPP", { locale: fr }) : ""} ${scheduledTime || ""}`}
                    </p>
                  </div>
                  <Badge variant="secondary">{deliveryFee} DJF</Badge>
                </div>
              </div>
            </div>

            {/* Résumé des articles */}
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Articles
              </h4>
              <div className="rounded-lg border p-4 bg-muted/50 space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg overflow-hidden border bg-background">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{item.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.quantity} × {Number(item.price).toFixed(2)} DJF
                      </div>
                    </div>
                    <div className="font-medium whitespace-nowrap">
                      {(Number(item.price) * (item.quantity || 1)).toFixed(2)} DJF
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="rounded-lg border p-4 bg-primary/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{subtotal.toFixed(2)} DJF</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Frais de livraison</span>
                <span>{deliveryFee.toFixed(2)} DJF</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{total.toFixed(2)} DJF</span>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              disabled={isProcessing}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Modifier
            </Button>
            <Button
              onClick={handleConfirmOrder}
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <><Loader2 className="h-4 w-4 animate-spin" />
                  Traitement en cours...
                </> 
              ) : (
                <><Check className="h-4 w-4" />
                  Confirmer la commande
                </> 
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
