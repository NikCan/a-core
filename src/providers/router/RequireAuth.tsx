import { RoutePath } from '@/assets';
import { useAuth } from '@/hooks/useAuth';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate replace state={{ from: location }} to={RoutePath.login} />;
  }

  return children;
}
