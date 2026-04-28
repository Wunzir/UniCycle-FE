import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        university: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    // states to show password  ---
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Validation check
    const isFormValid =
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.university.trim() !== '' &&
        formData.email.includes('@') &&
        formData.email.toLowerCase().endsWith('.edu') && // <-- NEW: Enforces .edu format
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
        // --- NEW: .edu error alert ---
        if (!formData.email.toLowerCase().endsWith('.edu')) {
            alert("Registration restricted: You must use a valid university .edu email address.");
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

        if (isFormValid) {
            alert("Account created! Redirecting to login...");
            navigate('/login');
        }
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

                    {/* Create button for holding down to show password */}
                    <div style={passwordWrapperStyle}>
                        <input
                            name={"password"}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{...inputStyle, paddingRight: '40px'}}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                            onTouchStart={() => setShowPassword(true)}
                            onTouchEnd={() => setShowPassword(false)}
                            style={eyeButtonStyle}
                            title="Hold to show password"
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>

                    {/* When creating password now it allows for clicking the eye button and holding to see password*/}
                    <div style={passwordWrapperStyle}>
                        <input
                            name={"confirmPassword"}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            style={{...inputStyle, paddingRight: '40px'}}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onMouseDown={() => setShowConfirmPassword(true)}
                            onMouseUp={() => setShowConfirmPassword(false)}
                            onMouseLeave={() => setShowConfirmPassword(false)}
                            onTouchStart={() => setShowConfirmPassword(true)}
                            onTouchEnd={() => setShowConfirmPassword(false)}
                            style={eyeButtonStyle}
                            title="Hold to show password"
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>

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

                    <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                            Already have an account?
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            style={blueLoginButtonStyle}
                        >
                            Log In to UniCycle
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// styles for signup page
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' };
const subTextStyle: React.CSSProperties = { color: '#666', marginBottom: '30px', fontSize: '1.1rem' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputStyle: React.CSSProperties = { padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold', transition: 'background-color 0.3s' };
const blueLoginButtonStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#e6f2ff', color: '#007bff', border: '2px solid #007bff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none' };

// Styles for the new password shower
const passwordWrapperStyle: React.CSSProperties = { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' };
const eyeButtonStyle: React.CSSProperties = { position: 'absolute', right: '10px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', userSelect: 'none', padding: '5px' };

export default Signup;