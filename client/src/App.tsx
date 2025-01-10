import { Switch, Route } from "wouter";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";
import Navigation from "./components/Navigation";
import NotificationProvider from "./components/NotificationProvider";
import Breadcrumb from "./components/Breadcrumb";
import Footer from "./components/Footer";
import { Toaster } from "@/components/ui/toaster";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SupplierDashboard from "./pages/SupplierDashboard";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import HowItWorksPage from "./pages/HowItWorksPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ServicesPage from "./pages/ServicesPage";
import ArticlesPage from "./pages/ArticlesPage";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import DashboardPage from "./pages/DashboardPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  const { user, isLoading, logout } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Barre de navigation (unique) */}
      <Navigation user={user ?? null} logout={logout} />
      
      {/* Notification provider, breadcrumb, etc. */}
      <NotificationProvider />
      <Breadcrumb />

      {/* Contenu principal (routing) */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          <Route path="/auth/forgot-password" component={ForgotPasswordForm} />
          <Route path="/about" component={AboutPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/how-it-works" component={HowItWorksPage} />
          <Route path="/testimonials" component={TestimonialsPage} />
          <Route path="/articles" component={ArticlesPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/checkout" component={CheckoutPage} />

          {user && (
            <>
              <Route path="/profile" component={ProfilePage} />
            </>
          )}
        </Switch>
      </main>

      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
