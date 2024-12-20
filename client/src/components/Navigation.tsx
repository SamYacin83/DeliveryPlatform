import { Link } from "wouter";
import { User } from "../types";
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/use-user";

interface NavigationProps {
  user: User;
}

export default function Navigation({ user }: NavigationProps) {
  const { logout } = useUser();

  return (
    <nav className="bg-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/">
            <a className="text-xl font-bold">Article Delivery</a>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <a className="hover:text-primary-foreground">Dashboard</a>
            </Link>
            <span className="text-sm text-muted-foreground">
              {user.username} ({user.role})
            </span>
            <Button variant="secondary" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
