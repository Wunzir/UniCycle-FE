import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Signup } from '../pages/SignUp';
import { ProtectedRoute } from './ProtectedRoute';

// A dummy component to test successful login
const Dashboard = () => <h2>Welcome to the Marketplace Dashboard!</h2>;

export const AppRoutes: React.FC = () => {
    return (
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* Add more protected routes like /items, /profile here */}
                </Route>
            </Routes>
    );
};