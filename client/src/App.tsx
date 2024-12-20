import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Navigation from "./components/Navigation";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
        </Switch>
      </main>
      <NotificationProvider />
      <Toaster />
    </div>
  );
}

export default App;
