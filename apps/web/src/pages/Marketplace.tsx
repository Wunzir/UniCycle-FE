import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ["All", "Books", "Furniture", "Electronics", "Clothing", "Transportation"];

const INITIAL_LISTINGS = [
    { id: 1, title: "Calculus Textbook (Like New)", price: 40, category: "Books", description: "Hardcover. No highlights or missing pages.", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Vintage Denim Jacket", price: 35, category: "Clothing", description: "Size Medium. Great condition.", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Sony Noise Cancelling Headphones", price: 120, category: "Electronics", description: "Used for one semester. Comes with case.", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Trek Commuter Bike", price: 150, category: "Transportation", description: "Recently tuned up. Includes U-Lock.", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80" },
    { id: 5, title: "iPad Pro + Apple Pencil", price: 450, category: "Electronics", description: "128GB. Perfect for taking notes.", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" },
    { id: 6, title: "Modern Desk Lamp", price: 15, category: "Furniture", description: "Includes LED bulb.", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80" },
    { id: 7, title: "Mechanical Keyboard", price: 65, category: "Electronics", description: "Cherry MX Red switches.", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
    { id: 8, title: "Ergonomic Office Chair", price: 80, category: "Furniture", description: "Super comfortable for long coding sessions.", image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80" },
];

const Marketplace = () => {
    const navigate = useNavigate();

    // states that its in
    const [listings, setListings] = useState(INITIAL_LISTINGS);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifyToggled, setNotifyToggled] = useState(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [showOnlyLiked, setShowOnlyLiked] = useState(false);

    const [newListing, setNewListing] = useState({ title: '', price: '', category: 'Books', description: '' });

    // Logic code goes below
    const filteredListings = listings.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLiked = showOnlyLiked ? likedItems.includes(item.id) : true;
        return matchesCategory && matchesSearch && matchesLiked;
    });
    const toggleLike = (e: React.MouseEvent, id: number) => {
        e.stopPropagation(); // Stops the card click event from firing
        if (likedItems.includes(id)) {
            setLikedItems(likedItems.filter(itemId => itemId !== id));
        } else {
            setLikedItems([...likedItems, id]);
        }
    };
    const handlePostListing = () => {
        if (!newListing.title || !newListing.price) return alert("Please fill out title and price!");
        const itemToAdd = {
            id: listings.length + 1,
            title: newListing.title,
            price: Number(newListing.price),
            category: newListing.category,
            description: newListing.description || "No description provided.",
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80"
        };
        setListings([itemToAdd, ...listings]);
        setIsModalOpen(false);
        setNewListing({ title: '', price: '', category: 'Books', description: '' });
    };

    return (
        <div style={pageLayout}>

            {/* Search bar and its code */}
            <header style={topBarStyle}>
                <h1 style={navLogoStyle}>UniCycle</h1>
                <div style={profileContainerStyle}>
                    <div style={profileCircleStyle} onClick={() => setIsProfileOpen(!isProfileOpen)}>DR</div>
                    {isProfileOpen && (
                        <div style={dropdownStyle}>
                            <ul style={dropdownListStyle}>
                                <li style={dropdownItemStyle} onClick={() => navigate('/profile')}>My Profile</li>
                                <li style={dropdownItemStyle}>My Listings</li>
                                <li style={dropdownItemStyle}>Settings</li>
                                <li style={dropdownItemStyle} onClick={() => navigate('/help')}>Help Center</li>
                                <hr style={{ margin: '5px 0', border: 'none', borderTop: '1px solid #eee' }} />
                                <li style={{...dropdownItemStyle, color: '#dc3545'}} onClick={() => navigate('/login')}>Log Out</li>
                            </ul>
                        </div>
                    )}
                </div>
            </header>


            <div style={contentWrapperStyle}>

                {/* Categories code */}
                <aside style={sidebarStyle}>
                    <div
                        style={{ ...wishlistToggleStyle, backgroundColor: showOnlyLiked ? '#fff0f3' : 'transparent', color: showOnlyLiked ? '#e63946' : '#333' }}
                        onClick={() => setShowOnlyLiked(!showOnlyLiked)}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{showOnlyLiked ? '❤️' : '🤍'}</span>
                        <span style={{ fontWeight: 'bold' }}>My Wishlist</span>
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '15px 0' }} />
                    <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Categories</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {CATEGORIES.map(category => (
                            <li
                                key={category}
                                style={{
                                    ...categoryItemStyle,
                                    fontWeight: selectedCategory === category ? 'bold' : 'normal',
                                    color: selectedCategory === category ? '#007bff' : '#333'
                                }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Query area and code */}
                <main style={mainContentStyle}>
                    <div style={searchContainerStyle}>
                        <input
                            type="text"
                            placeholder="Search for textbooks, electronics, furniture..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setNotifyToggled(false);
                            }}
                            style={searchInputStyle}
                        />
                    </div>

                    <div style={headerStyle}>
                        <h1 style={{ margin: 0, color: '#333' }}>Campus Listings</h1>
                        <button onClick={() => setIsModalOpen(true)} style={createButtonStyle}>
                            + Create Listing
                        </button>
                    </div>

                    {/* no listings adjust query*/}
                    {filteredListings.length === 0 ? (
                        <div style={emptyStateStyle}>
                            <div style={emptyIconStyle}>🔍</div>
                            <h2 style={emptyTitleStyle}>Nothing found for "{searchQuery}"</h2>
                            <p style={emptyDescStyle}>Sorry, we could not find anything that matches your query. Please check your spelling or expand your search.</p>
                            <div style={notifyBoxStyle}>
                                <p style={notifyTextStyle}>Would you like to be notified when something similar becomes available?</p>
                                <button
                                    style={notifyToggled ? notifyButtonActiveStyle : notifyButtonStyle}
                                    onClick={() => setNotifyToggled(!notifyToggled)}
                                >
                                    {notifyToggled ? "✓ You will be notified" : "🔔 Notify Me"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={gridStyle}>
                            {filteredListings.map(item => (
                                <div key={item.id} style={{ ...cardStyle, position: 'relative' }} onClick={() => navigate(`/listing/${item.id}`, { state: item })}>
                                    <div
                                        style={heartIconStyle}
                                        onClick={(e) => toggleLike(e, item.id)}
                                    >
                                        {likedItems.includes(item.id) ? '❤️' : '🤍'}
                                    </div>
                                    <img src={item.image} alt={item.title} style={imageStyle} />
                                    <div style={cardInfoStyle}>
                                        <h3 style={priceStyle}>${item.price.toFixed(2)}</h3>
                                        <p style={titleStyle}>{item.title}</p>
                                        <span style={badgeStyle}>{item.category}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* modal action */}
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2 style={{marginTop: 0}}>Post a New Item</h2>

                        <div style={formGroupStyle}>
                            <label>Title</label>
                            <input value={newListing.title} onChange={e => setNewListing({...newListing, title: e.target.value})} style={modalInputStyle} placeholder="e.g. Graphic Calculator" />
                        </div>

                        <div style={formGroupStyle}>
                            <label>Price ($)</label>
                            <input type="number" value={newListing.price} onChange={e => setNewListing({...newListing, price: e.target.value})} style={modalInputStyle} placeholder="0.00" />
                        </div>

                        <div style={formGroupStyle}>
                            <label>Description</label>
                            <textarea value={newListing.description} onChange={e => setNewListing({...newListing, description: e.target.value})} style={{ ...modalInputStyle, height: '60px', resize: 'vertical', fontFamily: 'sans-serif' }} placeholder="Describe the condition..." />
                        </div>

                        <div style={formGroupStyle}>
                            <label>Item Photos</label>
                            <div style={mockUploadAreaStyle} onClick={() => alert("Upload feature coming in V2!")}>
                                <span style={{ fontSize: '2rem', color: '#007bff' }}>+</span>
                                <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#555' }}>Click to upload or drag and drop</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: '#888' }}>SVG, PNG, JPG (max. 5MB)</p>
                            </div>
                        </div>

                        <div style={formGroupStyle}>
                            <label>Category</label>
                            <select value={newListing.category} onChange={e => setNewListing({...newListing, category: e.target.value})} style={modalInputStyle}>
                                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div style={modalActionStyle}>
                            <button onClick={() => setIsModalOpen(false)} style={cancelButtonStyle}>Cancel</button>
                            <button onClick={handlePostListing} style={postButtonStyle}>Post Listing</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Below will just be all the styles for the frontend
const pageLayout: React.CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };

//
const topBarStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '15px 30px', borderBottom: '1px solid #ddd', position: 'sticky', top: 0, zIndex: 100 };
const navLogoStyle: React.CSSProperties = { color: '#007bff', fontSize: '1.8rem', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' };
const profileContainerStyle: React.CSSProperties = { position: 'relative' };
const profileCircleStyle: React.CSSProperties = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' };
const dropdownStyle: React.CSSProperties = { position: 'absolute', top: '50px', right: 0, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '150px', overflow: 'hidden', border: '1px solid #ddd' };
const dropdownListStyle: React.CSSProperties = { listStyle: 'none', margin: 0, padding: '5px 0' };
const dropdownItemStyle: React.CSSProperties = { padding: '10px 15px', fontSize: '0.9rem', cursor: 'pointer' };

// how the categories look and main things look
const contentWrapperStyle: React.CSSProperties = { display: 'flex', flexGrow: 1, width: '100%' };
const sidebarStyle: React.CSSProperties = { width: '250px', minWidth: '250px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd' };
const categoryItemStyle: React.CSSProperties = { padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #eee' };
const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '30px', boxSizing: 'border-box', width: '100%' };

// marketplace style and how it looks
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const createButtonStyle: React.CSSProperties = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%' };
const cardStyle: React.CSSProperties = { backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' };
const imageStyle: React.CSSProperties = { width: '100%', height: '180px', objectFit: 'cover' };
const cardInfoStyle: React.CSSProperties = { padding: '15px' };
const priceStyle: React.CSSProperties = { margin: '0 0 5px 0', fontSize: '1.3rem', color: '#28a745', fontWeight: 'bold' };
const titleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '1rem', color: '#333' };
const badgeStyle: React.CSSProperties = { fontSize: '0.8rem', backgroundColor: '#e9ecef', padding: '5px 10px', borderRadius: '12px', color: '#495057', fontWeight: 'bold' };

// search and empty when things are not there when search its style
const searchContainerStyle: React.CSSProperties = { marginBottom: '20px' };
const searchInputStyle: React.CSSProperties = { width: '100%', maxWidth: '600px', padding: '14px 20px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' };
const emptyStateStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', marginTop: '20px' };
const emptyIconStyle: React.CSSProperties = { fontSize: '4rem', marginBottom: '20px', opacity: 0.8 };
const emptyTitleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '1.8rem', color: '#333' };
const emptyDescStyle: React.CSSProperties = { margin: '0 0 40px 0', color: '#666', fontSize: '1.1rem', maxWidth: '450px', lineHeight: '1.5' };
const notifyBoxStyle: React.CSSProperties = { backgroundColor: '#f8fbff', padding: '25px', borderRadius: '12px', border: '1px dashed #c2dbe9', width: '100%', maxWidth: '350px' };
const notifyTextStyle: React.CSSProperties = { margin: '0 0 15px 0', fontWeight: 'bold', color: '#007bff', fontSize: '1.05rem' };
const notifyButtonStyle: React.CSSProperties = { width: '100%', padding: '14px', backgroundColor: 'white', border: '2px solid #007bff', color: '#007bff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };
const notifyButtonActiveStyle: React.CSSProperties = { width: '100%', padding: '14px', backgroundColor: '#007bff', border: '2px solid #007bff', color: 'white', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };

// Liked Styles when you like something
const wishlistToggleStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid #ddd' };
const heartIconStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', fontSize: '1.1rem', zIndex: 10, transition: 'transform 0.1s' };
// more modal styles
const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle: React.CSSProperties = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' };
const formGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' };
const modalInputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' };
const mockUploadAreaStyle: React.CSSProperties = { border: '2px dashed #c2dbe9', backgroundColor: '#f8fbff', borderRadius: '8px', padding: '20px', textAlign: 'center', cursor: 'pointer' };
const modalActionStyle: React.CSSProperties = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' };
const cancelButtonStyle: React.CSSProperties = { padding: '10px 15px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', color: '#555' };
const postButtonStyle: React.CSSProperties = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };

export default Marketplace;