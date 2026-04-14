import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Add this import
import { AuthProvider } from './api/context/AuthContext';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => {
    return (
        <Router> {/* This MUST wrap everything */}
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </Router>
    );
};

export default App;