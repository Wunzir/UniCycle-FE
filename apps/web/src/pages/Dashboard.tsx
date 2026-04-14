import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/context/AuthContext';
import { apiClient } from '../api/axios';

// Matching your backend UserDto.Readonly (adjust fields as needed)
interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    university: string;
}

export const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        // Example of a protected API call.
        // Our axios interceptor automatically attaches the JWT token here!
        const fetchProfile = async () => {
            try {
                // Replace with your actual endpoint to get the logged-in user's details
                const response = await apiClient.get('/users/me');
                setProfile(response.data);
            } catch (err) {
                console.error("Failed to fetch profile", err);
                setError('Failed to load user data. Your session may have expired.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = () => {
        logout(); // Clears the JWT from local storage and updates global state
        navigate('/'); // Sends them back to the login page
    };

    if (loading) return <div className="dashboard-loading">Loading your UniCycle dashboard...</div>;

    return (
        <div className="dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>

            {/* Sidebar Navigation */}
            <aside style={{ width: '250px', background: '#f4f4f4', padding: '20px', borderRight: '1px solid #ddd' }}>
                <h2>UniCycle</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '30px' }}>
                    <a href="#feed" style={{ textDecoration: 'none', color: '#333' }}>Marketplace Feed</a>
                    <a href="#my-listings" style={{ textDecoration: 'none', color: '#333' }}>My Listings</a>
                    <a href="#messages" style={{ textDecoration: 'none', color: '#333' }}>Messages</a>
                    <a href="#settings" style={{ textDecoration: 'none', color: '#333' }}>Settings</a>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{ marginTop: 'auto', position: 'absolute', bottom: '20px', padding: '10px', cursor: 'pointer', background: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px' }}
                >
                    Log Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main style={{ flex: 1, padding: '40px' }}>
                <header style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <h1>Dashboard</h1>
                    {error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : (
                        <p style={{ color: '#666' }}>
                            Welcome back, <strong>{profile?.firstName || 'Student'}</strong>!
                            Connected to: <strong>{profile?.university || 'Your University'}</strong>
                        </p>
                    )}
                </header>

                <section>
                    <h3>Recent Activity</h3>
                    <div style={{ background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '10px' }}>
                        <p>No new activity yet. Start browsing or list an item!</p>
                        {/* You would map over marketplace items here later */}
                    </div>
                </section>
            </main>

        </div>
    );
};