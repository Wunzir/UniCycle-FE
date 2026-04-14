/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // 1. Initialize state directly from localStorage
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // This runs ONLY on the very first load
        const token = localStorage.getItem('jwt_token');
        return !!token; // returns true if token exists, false if not
    });

    // 2. You can now delete the useEffect entirely!
    // useEffect(() => { ... }, []);

    const login = (token: string) => {
        localStorage.setItem('jwt_token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};