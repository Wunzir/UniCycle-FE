import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';

export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    // If not authenticated, kick them back to the login page
    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    // Otherwise, render the child routes
    return <Outlet />;
};