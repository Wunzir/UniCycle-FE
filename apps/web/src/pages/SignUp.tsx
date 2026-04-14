import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// To this:
import { authApi } from '../api/authApi';
import type { SignupRequest } from '../api/authApi';

export const Signup: React.FC = () => {
    const [formData, setFormData] = useState<SignupRequest>({
        firstName: '', lastName: '', email: '', password: '', university: ''
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await authApi.signup(formData);
            // On success, redirect to login
            navigate('/');
        } catch (err) {
            console.error("Signup failed", err);
        }
    };

    return (
        <div className="signup-container">
            <h2>Create an Account</h2>
            <form onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First Name" onChange={handleChange} required />
                <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password (min 8 chars)" onChange={handleChange} required minLength={8} />
                <input name="university" placeholder="University" onChange={handleChange} required />
                <button type="submit">Sign Up</button>
            </form>
            <p>
                Already have an account? <Link to="/">Log in</Link>
            </p>
        </div>
    );
};