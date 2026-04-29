import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ["All", "Books", "Furniture", "Electronics", "Clothing", "Transportation"];

// Some temporary quick replies that can be improved at later dates
const QUICK_REPLIES = [
    "Is this still available?",
    "Are you open to negotiating?",
    "Can we meet on campus today to discuss further?",
    "What's the lowest you would take?",
    "What days and times are you willing to meet?"
];
 // The demo listings to show how things will work in the future but for now these are not real numbers just made up
const INITIAL_LISTINGS = [
    { id: 1, title: "Calculus Textbook (Like New)", price: 40, originalPrice: null, isNew: true, category: "Books", description: "Hardcover. No highlights or missing pages.", status: "available", views: 42, chats: 3, image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Vintage Denim Jacket", price: 35, originalPrice: 50, isNew: false, category: "Clothing", description: "Size Medium. Great condition.", status: "pending", views: 108, chats: 7, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Sony Noise Cancelling Headphones", price: 120, originalPrice: 150, isNew: false, category: "Electronics", description: "Used for one semester. Comes with case.", status: "available", views: 15, chats: 0, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Trek Commuter Bike", price: 160, originalPrice: 140, isNew: false, category: "Transportation", description: "Recently tuned up. Includes U-Lock.", status: "available", views: 89, chats: 4, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80" },
    { id: 5, title: "iPad Pro + Apple Pencil", price: 450, originalPrice: 500, isNew: true, category: "Electronics", description: "128GB. Perfect for taking notes.", status: "available", views: 210, chats: 12, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80" },
    { id: 6, title: "Modern Desk Lamp", price: 15, originalPrice: null, isNew: false, category: "Furniture", description: "Includes LED bulb.", status: "sold", views: 34, chats: 2, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80" },
    { id: 7, title: "Mechanical Keyboard", price: 65, originalPrice: null, isNew: true, category: "Electronics", description: "Cherry MX Red switches.", status: "available", views: 56, chats: 1, image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80" },
    { id: 8, title: "Ergonomic Office Chair", price: 80, originalPrice: 100, isNew: false, category: "Furniture", description: "Super comfortable for long coding sessions.", status: "available", views: 12, chats: 0, image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80" },
];

const Marketplace = () => {
    const navigate = useNavigate();

    // states that marketplace goes through when clicking around
    const [listings, setListings] = useState(INITIAL_LISTINGS);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [notifyToggled, setNotifyToggled] = useState(false);
    const [likedItems, setLikedItems] = useState<number[]>([]);
    const [showOnlyLiked, setShowOnlyLiked] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const [messageModal, setMessageModal] = useState<{isOpen: boolean, item: any, text: string}>({
        isOpen: false,
        item: null,
        text: ''
    });

    const [newListing, setNewListing] = useState({ title: '', price: '', category: 'Books', description: '' });

    // Logic for categories
    const filteredListings = listings.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLiked = showOnlyLiked ? likedItems.includes(item.id) : true;
        return matchesCategory && matchesSearch && matchesLiked;
    });

    const toggleLike = (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
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
            status: "available",
            views: 0,
            chats: 0,
            originalPrice: null,
            isNew: true,
            image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80"
        };
        setListings([itemToAdd, ...listings]);
        setIsModalOpen(false);
        setNewListing({ title: '', price: '', category: 'Books', description: '' });
    };

    // colors
    const theme = {
        bgMain: isDarkMode ? '#18191a' : '#f0f2f5',
        bgSurface: isDarkMode ? '#242526' : 'white',
        textMain: isDarkMode ? '#e4e6eb' : '#333',
        textSub: isDarkMode ? '#b0b3b8' : '#666',
        border: isDarkMode ? '#3e4042' : '#ddd',
        inputBg: isDarkMode ? '#3a3b3c' : 'white',
        hoverLight: isDarkMode ? '#3a3b3c' : '#f8f9fa'
    };

    return (
        <div style={{ ...pageLayout, backgroundColor: theme.bgMain, color: theme.textMain, transition: 'all 0.3s ease' }}>

            {/* navigation and unicycle writing */}
            <header style={{ ...topBarStyle, backgroundColor: theme.bgSurface, borderBottom: `1px solid ${theme.border}` }}>
                <h1 style={navLogoStyle}>UniCycle</h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    {/* Dark mode code using the moon, light mode sun*/}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        style={themeToggleStyle}
                        title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>

                    <div style={profileContainerStyle}>
                        <div style={profileCircleStyle} onClick={() => setIsProfileOpen(!isProfileOpen)}>DR</div>
                        {isProfileOpen && (
                            <div style={{ ...dropdownStyle, backgroundColor: theme.bgSurface, border: `1px solid ${theme.border}` }}>
                                <ul style={dropdownListStyle}>
                                    <li style={{ ...dropdownItemStyle, color: theme.textMain }} onClick={() => navigate('/profile')}>My Profile</li>
                                    <li style={{ ...dropdownItemStyle, color: theme.textMain }} onClick={() => navigate('/my-listings')}>My Listings</li>
                                    <li style={{ ...dropdownItemStyle, color: theme.textMain }}>Settings</li>
                                    <li style={{ ...dropdownItemStyle, color: theme.textMain }} onClick={() => navigate('/help')}>Help Center</li>
                                    <hr style={{ margin: '5px 0', border: 'none', borderTop: `1px solid ${theme.border}` }} />
                                    <li style={{...dropdownItemStyle, color: '#dc3545'}} onClick={() => navigate('/login')}>Log Out</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div style={contentWrapperStyle}>

                {/* category code*/}
                <aside style={{ ...sidebarStyle, backgroundColor: theme.bgSurface, borderRight: `1px solid ${theme.border}` }}>
                    <div
                        style={{ ...wishlistToggleStyle, backgroundColor: showOnlyLiked ? (isDarkMode ? '#4a151b' : '#fff0f3') : 'transparent', color: showOnlyLiked ? '#e63946' : theme.textMain, border: `1px solid ${theme.border}` }}
                        onClick={() => setShowOnlyLiked(!showOnlyLiked)}
                    >
                        <span style={{ fontSize: '1.2rem' }}>{showOnlyLiked ? '❤️' : '🤍'}</span>
                        <span style={{ fontWeight: 'bold' }}>My Wishlist</span>
                    </div>

                    <hr style={{ border: 'none', borderTop: `1px solid ${theme.border}`, margin: '15px 0' }} />
                    <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Categories</h2>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                        {CATEGORIES.map(category => (
                            <li
                                key={category}
                                style={{
                                    ...categoryItemStyle,
                                    borderBottom: `1px solid ${theme.border}`,
                                    fontWeight: selectedCategory === category ? 'bold' : 'normal',
                                    color: selectedCategory === category ? '#007bff' : theme.textMain
                                }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* main marketplace code*/}
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
                            style={{ ...searchInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}` }}
                        />
                    </div>

                    <div style={headerStyle}>
                        <h1 style={{ margin: 0, color: theme.textMain }}>Campus Listings</h1>
                        <button onClick={() => setIsModalOpen(true)} style={createButtonStyle}>
                            + Create Listing
                        </button>
                    </div>

                    {/* No item listed and notify me code for when you want items to be notified when available*/}
                    {filteredListings.length === 0 ? (
                        <div style={{ ...emptyStateStyle, backgroundColor: theme.bgSurface }}>
                            <div style={emptyIconStyle}>🔍</div>
                            <h2 style={{ ...emptyTitleStyle, color: theme.textMain }}>Nothing found for "{searchQuery}"</h2>
                            <p style={{ ...emptyDescStyle, color: theme.textSub }}>Sorry, we could not find anything that matches your query. Please check your spelling or expand your search.</p>
                            <div style={{ ...notifyBoxStyle, backgroundColor: isDarkMode ? '#1a2b3c' : '#f8fbff', border: isDarkMode ? '1px dashed #2c4c6b' : '1px dashed #c2dbe9' }}>
                                <p style={notifyTextStyle}>Would you like to be notified when something similar becomes available?</p>
                                <button
                                    style={notifyToggled ? notifyButtonActiveStyle : { ...notifyButtonStyle, backgroundColor: theme.bgSurface }}
                                    onClick={() => setNotifyToggled(!notifyToggled)}
                                >
                                    {notifyToggled ? "✓ You will be notified" : "🔔 Notify Me"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div style={gridStyle}>
                            {filteredListings.map(item => (
                                <div key={item.id} style={{ ...cardStyle, backgroundColor: theme.bgSurface, position: 'relative', opacity: item.status === 'sold' ? 0.6 : 1 }} onClick={() => navigate(`/listing/${item.id}`, { state: item })}>

                                    {item.isNew && <div style={newBadgeStyle}>✨ Just Listed</div>}

                                    {/* like / wishlist heart */}
                                    <div style={heartIconStyle} onClick={(e) => toggleLike(e, item.id)}>
                                        {likedItems.includes(item.id) ? '❤️' : '🤍'}
                                    </div>

                                    {/* item pending or sold */}
                                    {item.status === 'pending' && <div style={pendingBadgeStyle}>Pending Meetup</div>}
                                    {item.status === 'sold' && <div style={soldOverlayStyle}>SOLD</div>}

                                    {/* item stats */}
                                    <div style={{ position: 'relative' }}>
                                        <img src={item.image} alt={item.title} style={imageStyle} />
                                        <div style={statsOverlayStyle}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>👁️ {item.views}</span>
                                            {item.chats > 0 && (
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ffeb3b' }}>💬 {item.chats} active</span>
                                            )}
                                        </div>
                                    </div>

                                    {/* item prices + features*/}
                                    <div style={cardInfoStyle}>
                                        <h3 style={priceStyle}>
                                            ${item.price.toFixed(2)}
                                            {item.originalPrice && <span style={{ ...oldPriceStyle, color: theme.textSub }}>${item.originalPrice.toFixed(2)}</span>}
                                            {item.originalPrice && item.price < item.originalPrice && <span style={priceDropStyle}>↓ Drop</span>}
                                            {item.originalPrice && item.price > item.originalPrice && <span style={priceIncreaseStyle}>↑ Up</span>}
                                        </h3>

                                        <p style={{ ...titleStyle, color: theme.textMain }}>{item.title}</p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                                            <span style={{ ...badgeStyle, backgroundColor: isDarkMode ? '#3a3b3c' : '#e9ecef', color: isDarkMode ? '#e4e6eb' : '#495057' }}>{item.category}</span>

                                            {item.status !== 'sold' && (
                                                <button
                                                    style={{ ...cardMessageButtonStyle, backgroundColor: isDarkMode ? '#1a2b3c' : '#eef2f6' }}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setMessageModal({ isOpen: true, item: item, text: '' });
                                                    }}
                                                >
                                                    💬 Message
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {/* creating a new listing code*/}
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={{ ...modalContentStyle, backgroundColor: theme.bgSurface, color: theme.textMain }}>
                        <h2 style={{marginTop: 0}}>Post a New Item</h2>

                        <div style={formGroupStyle}>
                            <label style={{color: theme.textMain}}>Title</label>
                            <input value={newListing.title} onChange={e => setNewListing({...newListing, title: e.target.value})} style={{ ...modalInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}` }} placeholder="e.g. Graphic Calculator" />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={{color: theme.textMain}}>Price ($)</label>
                            <input type="number" value={newListing.price} onChange={e => setNewListing({...newListing, price: e.target.value})} style={{ ...modalInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}` }} placeholder="0.00" />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={{color: theme.textMain}}>Description</label>
                            <textarea value={newListing.description} onChange={e => setNewListing({...newListing, description: e.target.value})} style={{ ...modalInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}`, height: '60px', resize: 'vertical', fontFamily: 'sans-serif' }} placeholder="Describe the condition..." />
                        </div>

                        <div style={formGroupStyle}>
                            <label style={{color: theme.textMain}}>Category</label>
                            <select value={newListing.category} onChange={e => setNewListing({...newListing, category: e.target.value})} style={{ ...modalInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}` }}>
                                {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div style={modalActionStyle}>
                            <button onClick={() => setIsModalOpen(false)} style={{ ...cancelButtonStyle, backgroundColor: theme.hoverLight, color: theme.textMain, border: `1px solid ${theme.border}` }}>Cancel</button>
                            <button onClick={handlePostListing} style={postButtonStyle}>Post Listing</button>
                        </div>
                    </div>
                </div>
            )}

            {/* quick reply and messaging */}
            {messageModal.isOpen && messageModal.item && (
                <div style={modalOverlayStyle}>
                    <div style={{ ...modalContentStyle, backgroundColor: theme.bgSurface, color: theme.textMain }}>
                        <h2 style={{marginTop: 0, marginBottom: '5px'}}>Message Seller</h2>
                        <p style={{ margin: '0 0 20px 0', color: theme.textSub, fontSize: '0.9rem' }}>
                            Regarding: <strong style={{color: theme.textMain}}>{messageModal.item.title}</strong>
                        </p>

                        <label style={{ fontWeight: 'bold', fontSize: '0.9rem', color: theme.textMain }}>Quick Replies</label>
                        <div style={quickReplyContainerStyle}>
                            {QUICK_REPLIES.map(reply => (
                                <button
                                    key={reply}
                                    onClick={() => setMessageModal({ ...messageModal, text: reply })}
                                    style={{ ...chipStyle, backgroundColor: theme.hoverLight, color: theme.textMain, border: `1px solid ${theme.border}` }}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>

                        <div style={formGroupStyle}>
                            <textarea
                                value={messageModal.text}
                                onChange={e => setMessageModal({ ...messageModal, text: e.target.value })}
                                style={{ ...modalInputStyle, backgroundColor: theme.inputBg, color: theme.textMain, border: `1px solid ${theme.border}`, height: '100px', resize: 'none', fontFamily: 'sans-serif' }}
                                placeholder="Type your message here..."
                            />
                        </div>

                        <div style={modalActionStyle}>
                            <button
                                onClick={() => setMessageModal({ isOpen: false, item: null, text: '' })}
                                style={{ ...cancelButtonStyle, backgroundColor: theme.hoverLight, color: theme.textMain, border: `1px solid ${theme.border}` }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (!messageModal.text) return alert("Please enter a message!");
                                    alert("Message Sent securely via UniCycle!");
                                    setMessageModal({ isOpen: false, item: null, text: '' });
                                }}
                                style={postButtonStyle}
                            >
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// below will be styles on the whole marketplace
const pageLayout: React.CSSProperties = { display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' };

// navigation + profile style
const topBarStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', position: 'sticky', top: 0, zIndex: 100 };
const navLogoStyle: React.CSSProperties = { color: '#007bff', fontSize: '1.8rem', margin: 0, fontWeight: '900', letterSpacing: '-0.5px' };
const themeToggleStyle: React.CSSProperties = { background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '5px', borderRadius: '50%', outline: 'none' };
const profileContainerStyle: React.CSSProperties = { position: 'relative' };
const profileCircleStyle: React.CSSProperties = { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#007bff', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' };
const dropdownStyle: React.CSSProperties = { position: 'absolute', top: '50px', right: 0, borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', width: '150px', overflow: 'hidden' };
const dropdownListStyle: React.CSSProperties = { listStyle: 'none', margin: 0, padding: '5px 0' };
const dropdownItemStyle: React.CSSProperties = { padding: '10px 15px', fontSize: '0.9rem', cursor: 'pointer' };

// category side style
const contentWrapperStyle: React.CSSProperties = { display: 'flex', flexGrow: 1, width: '100%' };
const sidebarStyle: React.CSSProperties = { width: '250px', minWidth: '250px', padding: '20px' };
const categoryItemStyle: React.CSSProperties = { padding: '10px 0', cursor: 'pointer' };
const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '30px', boxSizing: 'border-box', width: '100%' };

// marketplace style
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
const createButtonStyle: React.CSSProperties = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px', width: '100%' };
const cardStyle: React.CSSProperties = { borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', transition: 'transform 0.2s' };
const imageStyle: React.CSSProperties = { width: '100%', height: '180px', objectFit: 'cover' };
const cardInfoStyle: React.CSSProperties = { padding: '15px' };
const priceStyle: React.CSSProperties = { margin: '0 0 5px 0', fontSize: '1.3rem', color: '#28a745', fontWeight: 'bold' };
const titleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '1rem' };
const badgeStyle: React.CSSProperties = { fontSize: '0.8rem', padding: '5px 10px', borderRadius: '12px', fontWeight: 'bold' };

// the no items are available styles
const searchContainerStyle: React.CSSProperties = { marginBottom: '20px' };
const searchInputStyle: React.CSSProperties = { width: '100%', maxWidth: '600px', padding: '14px 20px', borderRadius: '20px', fontSize: '1rem', outline: 'none' };
const emptyStateStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center', marginTop: '20px' };
const emptyIconStyle: React.CSSProperties = { fontSize: '4rem', marginBottom: '20px', opacity: 0.8 };
const emptyTitleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '1.8rem' };
const emptyDescStyle: React.CSSProperties = { margin: '0 0 40px 0', fontSize: '1.1rem', maxWidth: '450px', lineHeight: '1.5' };
const notifyBoxStyle: React.CSSProperties = { padding: '25px', borderRadius: '12px', width: '100%', maxWidth: '350px' };
const notifyTextStyle: React.CSSProperties = { margin: '0 0 15px 0', fontWeight: 'bold', color: '#007bff', fontSize: '1.05rem' };
const notifyButtonStyle: React.CSSProperties = { width: '100%', padding: '14px', border: '2px solid #007bff', color: '#007bff', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };
const notifyButtonActiveStyle: React.CSSProperties = { width: '100%', padding: '14px', backgroundColor: '#007bff', border: '2px solid #007bff', color: 'white', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' };

// the liked and wishlist styles
const wishlistToggleStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 15px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' };
const heartIconStyle: React.CSSProperties = { position: 'absolute', top: '10px', right: '10px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', fontSize: '1.1rem', zIndex: 10, transition: 'transform 0.1s' };

// other modals
const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalContentStyle: React.CSSProperties = { padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' };
const formGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' };
const modalInputStyle: React.CSSProperties = { padding: '12px', borderRadius: '8px', fontSize: '1rem', outline: 'none' };
const modalActionStyle: React.CSSProperties = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' };
const cancelButtonStyle: React.CSSProperties = { padding: '10px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
const postButtonStyle: React.CSSProperties = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };

// the styles for making people want to buy quicker
const pendingBadgeStyle: React.CSSProperties = { position: 'absolute', top: '15px', left: '-5px', backgroundColor: '#ffc107', color: '#000', padding: '5px 15px', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', zIndex: 10, borderRadius: '0 4px 4px 0', textTransform: 'uppercase', letterSpacing: '0.5px' };
const soldOverlayStyle: React.CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2.5rem', fontWeight: '900', color: '#dc3545', zIndex: 20, pointerEvents: 'none', textShadow: '2px 2px 0px white, -2px -2px 0px white, 2px -2px 0px white, -2px 2px 0px white' };
const statsOverlayStyle: React.CSSProperties = { position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '8px 10px', display: 'flex', justifyContent: 'space-between', boxSizing: 'border-box', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' };
const newBadgeStyle: React.CSSProperties = { position: 'absolute', top: '12px', right: '55px', backgroundColor: '#28a745', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', zIndex: 10, letterSpacing: '0.5px' };
const oldPriceStyle: React.CSSProperties = { fontSize: '0.9rem', textDecoration: 'line-through', marginLeft: '8px', fontWeight: 'normal' };
const priceDropStyle: React.CSSProperties = { fontSize: '0.75rem', color: '#dc3545', backgroundColor: '#ffe5e5', padding: '3px 6px', borderRadius: '4px', marginLeft: '8px', verticalAlign: 'middle', fontWeight: 'bold' };
const priceIncreaseStyle: React.CSSProperties = { fontSize: '0.75rem', color: '#d97706', backgroundColor: '#fef3c7', padding: '3px 6px', borderRadius: '4px', marginLeft: '8px', verticalAlign: 'middle', fontWeight: 'bold' };

// quick reply styles
const cardMessageButtonStyle: React.CSSProperties = { padding: '6px 12px', color: '#007bff', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' };
const quickReplyContainerStyle: React.CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0 20px 0' };
const chipStyle: React.CSSProperties = { padding: '8px 14px', borderRadius: '20px', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', outline: 'none' };

export default Marketplace;