import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { JSX } from 'react';

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? <Navigate to="/profile" replace /> : children;
};

export default PublicRoute;
