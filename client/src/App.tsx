import { Switch, Route } from "wouter";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";
import Navigation from "./components/Navigation";
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
import ProductsPage from "./pages/products/ProductsPage";
import ProductForm from "./pages/products/ProductForm";
import ProductTypesPage from "./pages/product-types/ProductTypesPage";
import ProductTypeForm from "./pages/product-types/ProductTypeForm";
import OrdersPage from "./pages/orders/OrdersPage";
import OrderDetailsPage from "./pages/orders/OrderDetailsPage";

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
      
      {/* Breadcrumb, etc. */}
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
              {/* Routes Produits */}
              <Route path="/products" component={ProductsPage} />
              <Route path="/products/add" component={ProductForm} />
              <Route path="/products/edit/:id" component={ProductForm} />
              <Route path="/product-types" component={ProductTypesPage} />
              <Route path="/product-types/add" component={ProductTypeForm} />
              <Route path="/product-types/edit/:id" component={ProductTypeForm} />
              {/* Routes Commandes */}
              <Route path="/orders" component={OrdersPage} />
              <Route path="/orders/:id" component={OrderDetailsPage} />
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
