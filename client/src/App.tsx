import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";
import { Button } from "@/components/ui/button";
import Breadcrumb from "./components/Breadcrumb";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import Navigation from "./components/Navigation";
import NotificationProvider from "./components/NotificationProvider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        {user ? (
        <>
          <Navigation user={user} />
          <NotificationProvider />
        </>
      ) : (
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-8">
                <Link href="/" className="text-xl font-bold">
                  RapidLivre
                </Link>
                <div className="hidden md:flex items-center gap-6">
                  <Link href="/services" className="text-foreground/80 hover:text-primary transition-colors">
                    Services
                  </Link>
                  <Link href="/how-it-works" className="text-foreground/80 hover:text-primary transition-colors">
                    Comment ça marche
                  </Link>
                  <Link href="/testimonials" className="text-foreground/80 hover:text-primary transition-colors">
                    Témoignages
                  </Link>
                </div>
              </div>
              <Button variant="outline" asChild>
                <Link href="/auth">
                  Connexion
                </Link>
              </Button>
            </div>
          </div>
        </nav>
      )}
      <Breadcrumb />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/how-it-works" component={HowItWorksPage} />
          {user && (
            <>
              <Route path="/dashboard" component={DashboardPage} />
              <Route path="/profile" component={ProfilePage} />
            </>
          )}
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
    </CartProvider>
  );
}

export default App;
