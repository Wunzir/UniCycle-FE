import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div style={pageLayout}>
            {/* Top Navigation Bar */}
            <header style={topBarStyle}>
                <h1 style={navLogoStyle} onClick={() => navigate('/marketplace')}>UniCycle</h1>
                <button onClick={() => navigate('/marketplace')} style={backButtonStyle}>
                    &larr; Back to Marketplace
                </button>
            </header>

            <main style={mainContentStyle}>
                <div style={profileCardStyle}>
                    <div style={headerSectionStyle}>
                        <div style={largeProfileCircleStyle}>DR</div>
                        <div>
                            <h1 style={{ margin: '0 0 5px 0' }}>David Rowe</h1>
                            <p style={{ margin: 0, color: '#666' }}>david.rowe@rpi.edu</p>
                            <span style={badgeStyle}>Rensselaer Polytechnic Institute</span>
                        </div>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '30px 0' }} />

                    <h3>Account Details</h3>
                    <p><strong>Member Since:</strong> August 2023</p>
                    <p><strong>Active Listings:</strong> 2</p>
                    <p><strong>Items Sold:</strong> 5</p>

                    <button style={editButtonStyle} onClick={() => alert('Edit profile coming soon!')}>
                        Edit Profile
                    </button>
                </div>
            </main>
        </div>
    );
};

// --- STYLES ---
const pageLayout: React.CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };
const topBarStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 };
const navLogoStyle: React.CSSProperties = { color: '#007bff', fontSize: '1.8rem', margin: 0, fontWeight: '900', cursor: 'pointer' };
const backButtonStyle: React.CSSProperties = { padding: '8px 16px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#555' };

const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' };
const profileCardStyle: React.CSSProperties = { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', maxWidth: '600px', width: '100%' };
const headerSectionStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '25px' };
const largeProfileCircleStyle: React.CSSProperties = { width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: 'bold' };
const badgeStyle: React.CSSProperties = { display: 'inline-block', fontSize: '0.85rem', backgroundColor: '#e7f1ff', padding: '6px 12px', borderRadius: '20px', color: '#007bff', fontWeight: 'bold', marginTop: '10px' };
const editButtonStyle: React.CSSProperties = { marginTop: '20px', padding: '10px 20px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' };

export default Profile;