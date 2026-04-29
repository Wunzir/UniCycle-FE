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

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // For the check password to see if its long enough, has the number and a special character
    const hasLength = formData.password.length >= 8;
    const hasNumber = /\d/.test(formData.password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

    // create a score according to how many checks the password fills to be strong
    let strengthScore = 0;
    if (hasLength) strengthScore++;
    if (hasNumber) strengthScore++;
    if (hasSpecial) strengthScore++;

    // Create a strength of password and checks to see how strong it is and give color and score
    const strengthColors = ['#e9ecef', '#dc3545', '#ffc107', '#28a745']; // Gray, Red, Yellow, Green
    const strengthLabels = ['Enter password', 'Weak', 'Good', 'Strong'];
    const barColor = formData.password ? strengthColors[strengthScore] : strengthColors[0];
    const barLabel = formData.password ? strengthLabels[strengthScore] : strengthLabels[0];
    const barWidth = formData.password ? `${(strengthScore / 3) * 100}%` : '0%';
    const isPasswordStrong = strengthScore === 3;


    // Code to check is the signup is valid so far, and checks if pass is strong
    const isFormValid =
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.university.trim() !== '' &&
        formData.email.includes('@') &&
        formData.email.toLowerCase().endsWith('.edu') &&
        isPasswordStrong &&
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
        if (!formData.email.toLowerCase().endsWith('.edu')) {
            alert("Registration restricted: You must use a valid university .edu email address.");
            return;
        }
        if (formData.password.trim() === '') {
            alert("Please create a password!");
            return;
        }
        // An alert if the password is not strong enough as well as the other alerts to see if things are correct.
        if (!isPasswordStrong) {
            alert("Please create a Strong password (8+ chars, 1 number, 1 special character) to continue.");
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

                    {/* password look and text */}
                    <div style={passwordWrapperStyle}>
                        <input
                            name={"password"}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{...inputStyle, paddingRight: '40px', marginBottom: 0}}
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

                    {/* Strength of password looks and style */}
                    <div style={strengthMeterContainerStyle}>
                        <div style={strengthMeterBackgroundStyle}>
                            <div style={{ height: '100%', width: barWidth, backgroundColor: barColor, transition: 'all 0.3s ease', borderRadius: '4px' }} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '5px', color: '#666' }}>
                            <span>{barLabel}</span>
                            <span>
                                <span style={{ color: hasLength ? '#28a745' : '#999' }}>8+ chars</span> •
                                <span style={{ color: hasNumber ? '#28a745' : '#999' }}> 1 num</span> •
                                <span style={{ color: hasSpecial ? '#28a745' : '#999' }}> 1 special</span>
                            </span>
                        </div>
                    </div>

                    {/* Confirm pass text and also show pass  */}
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
                            cursor: isFormValid ? 'pointer' : 'not-allowed'
                        }}
                        disabled={!isFormValid}
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

// Other Styles for signup page
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' };
const subTextStyle: React.CSSProperties = { color: '#666', marginBottom: '30px', fontSize: '1.1rem' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputStyle: React.CSSProperties = { padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1.1rem', fontWeight: 'bold', transition: 'background-color 0.3s' };
const blueLoginButtonStyle: React.CSSProperties = { width: '100%', padding: '12px', backgroundColor: '#e6f2ff', color: '#007bff', border: '2px solid #007bff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s ease', outline: 'none' };

const passwordWrapperStyle: React.CSSProperties = { position: 'relative', display: 'flex', alignItems: 'center', width: '100%' };
const eyeButtonStyle: React.CSSProperties = { position: 'absolute', right: '10px', background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', userSelect: 'none', padding: '5px' };

// Style for checking strength of pass when on sign up page
const strengthMeterContainerStyle: React.CSSProperties = { marginTop: '-10px', textAlign: 'left' };
const strengthMeterBackgroundStyle: React.CSSProperties = { height: '6px', width: '100%', backgroundColor: '#e9ecef', borderRadius: '4px', overflow: 'hidden' };

export default Signup;