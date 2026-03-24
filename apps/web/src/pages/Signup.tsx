import { useState } from 'react';
import type { ChangeEvent } from 'react';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        university: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Validation check
    const isFormValid =
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.university.trim() !== '' &&
        formData.email.includes('@') &&
        formData.password !== '' &&
        formData.confirmPassword === formData.password;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (formData.firstName.trim() === '') {
            alert("Please fill out your first name!");
            return;
        }
        if (formData.lastName.trim() === '') {
            alert("Please fill out last name!");
            return;
        }
        if (formData.university.trim() === '') {
            alert("Please fill out university name!");
            return;
        }
        if (formData.password.trim() === '') {
            alert("Please create a password!");
            return;
        }
        if (formData.confirmPassword.trim() !== formData.password){
            alert("Passwords do not match! Please check again!");
            return;

        }
        else
            alert("Form is valid! Proceeding to next step...");
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={logoStyle}>UniCycle</h1>
                <p style={subTextStyle}>Create your account</p>

                <div style={formStyle}>
                    <input name="firstName" placeholder="First Name" style={inputStyle} value={formData.firstName} onChange={handleChange} />
                    <input name="lastName" placeholder="Last Name" style={inputStyle} value={formData.lastName} onChange={handleChange} />
                    <input name="university" placeholder="University" style={inputStyle} value={formData.university} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email Address" style={inputStyle} value={formData.email} onChange={handleChange} />
                    <input name={"password"} type="password" placeholder="Password" style={inputStyle} value={formData.password} onChange={handleChange} />
                    <input name={"confirmPassword"} type="password" placeholder="Confirm Password" style={inputStyle} value={formData.confirmPassword} onChange={handleChange} />

                    <button
                        onClick={handleNext}
                        style={{
                            ...buttonStyle,
                            backgroundColor: isFormValid ? '#007bff' : '#aeb1b5',
                            cursor: 'pointer'
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};


const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' };
const subTextStyle: React.CSSProperties = { color: '#666', marginBottom: '30px', fontSize: '1.1rem' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputStyle: React.CSSProperties = { padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'background-color 0.3s' };

export default Signup;