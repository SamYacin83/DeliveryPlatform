import { Switch, Route, Link } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Loader2 } from "lucide-react";
import { useUser } from "./hooks/use-user";
import { Button } from "@/components/ui/button";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import Navigation from "./components/Navigation";
import NotificationProvider from "./components/NotificationProvider";
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

  return (
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
              <Link href="/">
                <a className="text-xl font-bold">RapidLivre</a>
              </Link>
              <Link href="/auth">
                <Button variant="outline">Connexion</Button>
              </Link>
            </div>
          </div>
        </nav>
      )}
      <main className="container mx-auto px-4 py-8">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/auth" component={AuthPage} />
          {user && <Route path="/dashboard" component={DashboardPage} />}
        </Switch>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
