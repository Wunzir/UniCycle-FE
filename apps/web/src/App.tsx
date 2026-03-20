import { useState } from 'react'; // 1. Added this import

function App() {
    // 2. This is the "Memory". It starts empty.
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        university: '',
        email: ''
    });

    // NEW: Validation Logic
    // This returns 'true' only if all fields have text and email has an @
    const isFormValid =
        formData.firstName.trim() !== '' &&
        formData.lastName.trim() !== '' &&
        formData.university.trim().length > 2 &&
        formData.email.includes('@');

    // 3. This function runs every time you type a single letter
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value // Updates only the field you are typing in
        }));
    };

    // This function now handles the "Smart" alerts
    const handleNext = () => {
        // 1. Check for missing text fields
        if (formData.firstName.trim() === '') {
            alert("Please fill out your First Name!");
            return;
        }
        if (formData.lastName.trim() === '') {
            alert("Please fill out Last Name!");
            return;
        }
        if (formData.university.trim() === '') {
            alert("Please fill University Name!");
            return;
        }

        // 2. Check specifically for the @ sign in email
        if (!formData.email.includes('@')) {
            alert("Please enter a valid email address (missing the '@' symbol).");
            return;
        }

        // 3. Success!
        alert(`All clear! Ready to send ${formData.firstName}'s data to the backend.`);
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h1 style={logoStyle}>UniCycle</h1>
                <p style={subTextStyle}>Create your account</p>

                <div style={formStyle}>
                    {/* 4. Added 'name', 'value', and 'onChange' to every input */}
                    <input
                        name="firstName"
                        placeholder="First Name"
                        style={inputStyle}
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        style={inputStyle}
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <input
                        name="university"
                        placeholder="University"
                        style={inputStyle}
                        value={formData.university}
                        onChange={handleChange}
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        style={inputStyle}
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <button
                        onClick={handleNext}
                        style={{
                            ...buttonStyle,
                            // If form is NOT valid, make it grey. Otherwise, keep it blue.
                            backgroundColor: isFormValid ? '#007bff' : '#aeb1b5',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease'
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- Styles (Same as before, just kept here for to remind) ---
const containerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100vw', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', width: '100%', maxWidth: '450px', textAlign: 'center', boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' };
const subTextStyle: React.CSSProperties = { color: '#666', marginBottom: '30px', fontSize: '1.1rem' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '20px' };
const inputStyle: React.CSSProperties = { padding: '14px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '1rem', width: '100%', boxSizing: 'border-box' };
const buttonStyle: React.CSSProperties = { padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold' };

export default App;