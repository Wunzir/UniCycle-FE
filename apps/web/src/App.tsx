function App() {
    return (
        // The "vh" and "vw" ensure it takes up the FULL screen height and width
        <div style={{
            display: 'flex',
            justifyContent: 'center', // Centers horizontally
            alignItems: 'center',     // Centers vertically
            minHeight: '100vh',
            width: '100vw',           // Added this to force full width
            backgroundColor: '#f0f2f5',
            fontFamily: 'sans-serif',
            margin: 0,                // Removes default browser margins
            padding: 0
        }}>

            {/* The White Box */}
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center',
                boxSizing: 'border-box' // Important for padding
            }}>

                <h1 style={{ color: '#007bff', fontSize: '2.5rem', margin: '0 0 10px 0' }}>
                    UniCycle
                </h1>
                <p style={{ color: '#666', marginBottom: '30px', fontSize: '1.1rem' }}>
                    Create your account
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input type="text" placeholder="First Name" style={inputStyle} />
                    <input type="text" placeholder="Last Name" style={inputStyle} />
                    <input type="text" placeholder="University" style={inputStyle} />
                    <input type="email" placeholder="Email Address" style={inputStyle} />

                    <button style={{
                        padding: '15px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        fontWeight: 'bold'
                    }}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: '14px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    width: '100%',
    boxSizing: 'border-box' as const
};

export default App;