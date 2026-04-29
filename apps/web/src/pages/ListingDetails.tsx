import { useLocation, useNavigate } from 'react-router-dom';

const ListingDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // takes from marketplace
    const item = location.state;

    // requires clicking on the listing
    if (!item) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
                <h2>Listing not found!</h2>
                <button onClick={() => navigate('/marketplace')} style={backButtonStyle}>Back to Marketplace</button>
            </div>
        );
    }

    return (
        <div style={pageLayout}>
            {/* Navigation Bar*/}
            <header style={topBarStyle}>
                <h1 style={navLogoStyle} onClick={() => navigate('/marketplace')}>UniCycle</h1>
                <button onClick={() => navigate('/marketplace')} style={backButtonStyle}>
                    &larr; Back to Listings
                </button>
            </header>

            {/* Main Content */}
            <main style={mainContentStyle}>
                <div style={cardLayout}>

                    {/* Left Side: Massive Image */}
                    <div style={imageContainerStyle}>
                        <img src={item.image} alt={item.title} style={heroImageStyle} />
                    </div>

                    {/* Right Side: Details and Actions */}
                    <div style={detailsContainerStyle}>
                        <span style={badgeStyle}>{item.category}</span>
                        <h1 style={titleStyle}>{item.title}</h1>
                        <h2 style={priceStyle}>${item.price}</h2>

                        <div style={dividerStyle}></div>

                        <p style={descriptionStyle}>
                            This is a placeholder description for the {item.title}. In the future, this will show the actual details typed by the seller, including condition, pickup location, and any other relevant information.
                        </p>

                        <div style={sellerBoxStyle}>
                            <div style={profileCircleStyle}>S</div>
                            <div>
                                <p style={{ margin: 0, fontWeight: 'bold' }}>Student Seller</p>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#666' }}>Rensselaer Polytechnic Institute</p>
                            </div>
                        </div>

                        <button style={messageButtonStyle} onClick={() => alert("Messaging system coming soon!")}>
                            Message Seller
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
};

// --- STYLES ---
const pageLayout: React.CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };

const topBarStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 30px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 };
const navLogoStyle: React.CSSProperties = { color: '#007bff', fontSize: '1.8rem', margin: 0, fontWeight: '900', letterSpacing: '-0.5px', cursor: 'pointer' };
const backButtonStyle: React.CSSProperties = { padding: '8px 16px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#555' };

const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '40px 20px', display: 'flex', justifyContent: 'center' };
const cardLayout: React.CSSProperties = { display: 'flex', gap: '40px', backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.05)', maxWidth: '1000px', width: '100%', flexWrap: 'wrap' };

const imageContainerStyle: React.CSSProperties = { flex: '1 1 400px' };
const heroImageStyle: React.CSSProperties = { width: '100%', height: 'auto', borderRadius: '8px', objectFit: 'cover', aspectRatio: '4/3' };

const detailsContainerStyle: React.CSSProperties = { flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' };
const badgeStyle: React.CSSProperties = { fontSize: '0.85rem', backgroundColor: '#e7f1ff', padding: '6px 12px', borderRadius: '20px', color: '#007bff', fontWeight: 'bold', marginBottom: '15px' };
const titleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '2.5rem', color: '#333', lineHeight: '1.2' };
const priceStyle: React.CSSProperties = { margin: '0 0 20px 0', fontSize: '2rem', color: '#28a745', fontWeight: 'bold' };
const dividerStyle: React.CSSProperties = { width: '100%', height: '1px', backgroundColor: '#eee', margin: '20px 0' };
const descriptionStyle: React.CSSProperties = { fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '30px' };

const sellerBoxStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', width: '100%', boxSizing: 'border-box', marginBottom: '30px' };
const profileCircleStyle: React.CSSProperties = { width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#6c757d', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem', fontWeight: 'bold' };

const messageButtonStyle: React.CSSProperties = { width: '100%', padding: '15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)', transition: 'background-color 0.2s' };

export default ListingDetail;