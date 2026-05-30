import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'wouter';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect to="/login" />;
  return <>{children}</>;
}
