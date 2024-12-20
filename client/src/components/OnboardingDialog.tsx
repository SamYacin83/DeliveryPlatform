import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Package, Truck, CreditCard } from "lucide-react";

const steps = [
  {
    icon: <Package className="h-12 w-12 text-primary" />,
    title: "Bienvenue sur RapidLivre",
    description: "Découvrez notre service de livraison rapide pour tous vos articles préférés.",
  },
  {
    icon: <Truck className="h-12 w-12 text-primary" />,
    title: "Livraison Express",
    description: "Recevez vos articles en quelques minutes seulement, directement chez vous.",
  },
  {
    icon: <CreditCard className="h-12 w-12 text-primary" />,
    title: "Paiement Sécurisé",
    description: "Payez en toute sécurité avec nos options de paiement variées.",
  },
];

export default function OnboardingDialog() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeenOnboarding) {
      setOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      localStorage.setItem("hasSeenOnboarding", "true");
    }
  };

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          document.body.style.pointerEvents = 'auto';
        }
        setOpen(isOpen);
      }}
    >
      <DialogContent 
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => {
          if (!open) {
            e.preventDefault();
          }
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          document.body.style.pointerEvents = 'auto';
        }}
      >
        <DialogHeader>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                {steps[currentStep].icon}
              </div>
              <DialogTitle className="text-2xl mb-4">
                {steps[currentStep].title}
              </DialogTitle>
              <DialogDescription className="text-lg">
                {steps[currentStep].description}
              </DialogDescription>
            </motion.div>
          </AnimatePresence>
        </DialogHeader>
        <DialogFooter className="mt-8">
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Button onClick={handleNext} className="w-full">
              {currentStep < steps.length - 1 ? "Suivant" : "Commencer"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
