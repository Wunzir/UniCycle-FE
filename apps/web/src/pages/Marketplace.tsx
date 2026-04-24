import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const INITIAL_LISTINGS = [
    {
        id: 1,
        title: "Calculus Textbook (Like New)",
        price: 40,
        category: "Books",
        image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=400&q=80"
    },

    {
        id: 2,
        title: "Sony Noise Cancelling Headphones",
        price: 120,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 3,
        title: "Trek Commuter Bike",
        price: 150,
        category: "Transportation",
        image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        title: "iPad Pro + Apple Pencil",
        price: 450,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        title: "Modern Desk Lamp",
        price: 15,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 6,
        title: "Mechanical Keyboard",
        price: 65,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 7,
        title: "Ergonomic Office Chair",
        price: 80,
        category: "Furniture",
        image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=400&q=80"
    },
];
const CATEGORIES = ["All", "Books", "Furniture", "Electronics", "Clothing", "Transportation"];

const Marketplace = () => {
    const navigate = useNavigate();
    const [listings, setListings] = useState(INITIAL_LISTINGS); // Start to setting listing hope it works
    const [selectedCategory, setSelectedCategory] = useState("All");
    // Add the search bar stuff
    const [searchQuery, setSearchQuery] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListing, setNewListing] = useState({ title: '', price: '', category: 'Books', description: '' });

    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const filteredListings = listings.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create a temporary local URL for the selected image
            const tempUrl = URL.createObjectURL(file);
            setUploadedImage(tempUrl);
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
            image: uploadedImage || "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80"
        };

        setListings([itemToAdd, ...listings]);
        setIsModalOpen(false);
        setNewListing({ title: '', price: '', category: 'Books', description: '' });

        // --- ADD THIS LINE to clear the image for the next post ---
        setUploadedImage(null);
    };

    return (
        <div style={pageLayout}>

            {/* Categories and types of listings*/}
            <aside style={sidebarStyle}>
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

            {/* This is the Campus Listing with all items */}
            <main style={mainContentStyle}>
                <div style={searchContainerStyle}>
                    <input
                        type="text"
                        placeholder="Search for textbooks, electronics, furniture..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={searchInputStyle}
                    />
                </div>

                <div style={headerStyle}>
                    <h1 style={{ margin: 0, color: '#333' }}>Campus Listings</h1>
                    <button onClick={() => setIsModalOpen(true)} style={createButtonStyle}>
                        + Create Listing
                    </button>
                </div>

                <div style={gridStyle}>
                    {filteredListings.map(item => (

                        <div key={item.id} style={cardStyle}
                            onClick={() => navigate(`/listing/${item.id}`, { state: item })}
                            >
                            <img src={item.image} alt={item.title} style={imageStyle} />
                            <div style={cardInfoStyle}>
                                <h3 style={priceStyle}>${item.price}</h3>
                                <p style={titleStyle}>{item.title}</p>
                                <span style={badgeStyle}>{item.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            {isModalOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h2>Post a New Item</h2>

                        <div style={formGroupStyle}>
                            <label>Title</label>
                            <input
                                value={newListing.title}
                                onChange={e => setNewListing({...newListing, title: e.target.value})}
                                style={modalInputStyle}
                                placeholder="e.g. Graphic Calculator"
                            />
                        </div>

                        <div style={formGroupStyle}>
                            <label>Price ($)</label>
                            <input
                                type="number"
                                value={newListing.price}
                                onChange={e => setNewListing({...newListing, price: e.target.value})}
                                style={modalInputStyle}
                                placeholder="0.00"
                            />

                        </div>

                        <div style={formGroupStyle}>
                            <label>Description</label>
                            <textarea
                                value={newListing.description}
                                onChange={e => setNewListing({...newListing, description: e.target.value})}
                                style={{ ...modalInputStyle, height: '80px', resize: 'vertical', fontFamily: 'sans-serif' }}
                                placeholder="Describe the condition, brand, reason for selling..."
                            />
                        </div>

                        <div style={formGroupStyle}>
                            <label>Upload Photo</label>
                            <input
                                type="file"
                                accept="image/*" // Only allow image files
                                onChange={handleImageUpload}
                                style={{ padding: '5px 0' }}
                            />
                            {/* Show a mini preview if they uploaded something! */}
                            {uploadedImage && (
                                <img
                                    src={uploadedImage}
                                    alt="Preview"
                                    style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginTop: '10px' }}
                                />
                            )}
                        </div>



                        <div style={formGroupStyle}>
                            <label>Category</label>
                            <select
                                value={newListing.category}
                                onChange={e => setNewListing({...newListing, category: e.target.value})}
                                style={modalInputStyle}
                            >
                                <option value="Books">Books</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Clothing">Clothing</option>
                                <option value="Transportation">Transportation</option>
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

// --- STYLES ---
    const pageLayout: React.CSSProperties = { display: 'flex', minHeight: '100vh', backgroundColor: '#f0f2f5', fontFamily: 'sans-serif' };

// Sidebar
    const sidebarStyle: React.CSSProperties = { width: '250px', backgroundColor: 'white', padding: '20px', borderRight: '1px solid #ddd', height: '100vh', position: 'sticky', top: 0, boxSizing: 'border-box' };
    const categoryItemStyle: React.CSSProperties = { padding: '10px 0', cursor: 'pointer', borderBottom: '1px solid #eee', transition: 'color 0.2s' };

// Main Area & Header
    const mainContentStyle: React.CSSProperties = { flexGrow: 1, padding: '30px', boxSizing: 'border-box' };
    const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' };
    const createButtonStyle: React.CSSProperties = { backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };

// Search
    const searchContainerStyle: React.CSSProperties = { marginBottom: '20px' };
    const searchInputStyle: React.CSSProperties = { width: '100%', maxWidth: '500px', padding: '12px 20px', borderRadius: '20px', border: '1px solid #ccc', fontSize: '1rem', outline: 'none' };

// Grid & Cards
    const gridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' };
    const cardStyle: React.CSSProperties = { backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer' };
    const imageStyle: React.CSSProperties = { width: '100%', height: '150px', objectFit: 'cover' };
    const cardInfoStyle: React.CSSProperties = { padding: '15px' };
    const priceStyle: React.CSSProperties = { margin: '0 0 5px 0', fontSize: '1.2rem', color: '#28a745' };
    const titleStyle: React.CSSProperties = { margin: '0 0 10px 0', fontSize: '1rem', color: '#333' };
    const badgeStyle: React.CSSProperties = { fontSize: '0.8rem', backgroundColor: '#e9ecef', padding: '4px 8px', borderRadius: '12px', color: '#495057' };

// --- NEW MODAL STYLES ---
    const modalOverlayStyle: React.CSSProperties = { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
    const modalContentStyle: React.CSSProperties = { backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' };
    const formGroupStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '15px' };
    const modalInputStyle: React.CSSProperties = { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '1rem' };
    const modalActionStyle: React.CSSProperties = { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' };
    const cancelButtonStyle: React.CSSProperties = { padding: '10px 15px', backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' };
    const postButtonStyle: React.CSSProperties = { padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };

    export default Marketplace;