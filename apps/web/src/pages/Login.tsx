import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Validation: Just check if they typed something in both boxes
    const isFormValid = loginData.email.includes('@') && loginData.password.length > 0;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = () => {
        if (!loginData.email.includes('@')) {
            alert("Please enter a valid email!");
            return;
        }
        if (loginData.password === '') {
            alert("Please enter your password!");
            return;
        }
        // This is where Ajay's login API will eventually go. For now, we just navigate to the marketplace.
        navigate('/marketplace');

    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={logoStyle}>UniCycle</h1>
                <p style={subTextStyle}>Welcome back! Please log in.</p>

                <div style={formStyle}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        style={inputStyle}
                        value={loginData.email}
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        style={inputStyle}
                        value={loginData.password}
                        onChange={handleChange}
                    />

                    <button
                        onClick={handleLogin}
                        style={{
                            ...buttonStyle,
                            backgroundColor: isFormValid ? '#007bff' : '#aeb1b5',
                            cursor: 'pointer'
                        }}
                    >
                        Log In
                    </button>

                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
                        Don't have an account?{''}
                        <span
                            style={{ color: '#007bff', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => navigate('/signup')}
                            >
                                Sign up!
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- Re-using the exact same styles for consistency ---
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' };
const subTextStyle: React.CSSProperties = { color: '#666', marginBottom: '30px', fontSize: '1.1rem' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputStyle: React.CSSProperties = { padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'background-color 0.3s' };

export default Login;