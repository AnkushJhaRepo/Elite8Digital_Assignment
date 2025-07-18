import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { JSX } from 'react';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useAuth();

    if (isAuthenticated === null) return <p>Loading...</p>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

