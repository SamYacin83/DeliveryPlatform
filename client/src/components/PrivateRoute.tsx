import React from 'react';
import { useLocation, Redirect } from 'wouter';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
  component: React.ComponentType;
  requiredRole?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  component: Component,
  requiredRole = []
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const [location] = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Redirect 
      to={`/auth?redirect=${encodeURIComponent(location)}`}
    />;
  }

  if (requiredRole.length > 0 && user && !requiredRole.includes(user.roles)) {
    return <Redirect to="/unauthorized" />;
  }

  return <Component />;
};
