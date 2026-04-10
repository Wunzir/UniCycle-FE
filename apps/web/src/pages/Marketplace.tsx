import { useState } from 'react';

// Mock Data
const INITIAL_LISTINGS = [
    { id: 1, title: "Calculus Textbook", price: 40, category: "Books", image: "https://picsum.photos/seed/book/200/150" },
    { id: 2, title: "Mini Fridge", price: 60, category: "Furniture", image: "https://picsum.photos/seed/fridge/200/150" },
    { id: 3, title: "iPad Pro + Pencil", price: 450, category: "Electronics", image: "https://picsum.photos/seed/ipad/200/150" },
    { id: 4, title: "Desk Lamp", price: 15, category: "Furniture", image: "https://picsum.photos/seed/lamp/200/150" },
    { id: 5, title: "iClicker 2", price: 20, category: "Electronics", image: "https://picsum.photos/seed/tech/200/150" },
    { id: 6, title: "Physics 101", price: 30, category: "Books", image: "https://picsum.photos/seed/physics/200/150" },
];
const CATEGORIES = ["All", "Books", "Furniture", "Electronics"];

const Marketplace = () => {
    const [listings, setListings] = useState(INITIAL_LISTINGS); // Start to setting listing hope it works
    const [selectedCategory, setSelectedCategory] = useState("All");
    // Add the search bar stuff
    const [searchQuery, setSearchQuery] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newListing, setNewListing] = useState({ title: '', price: '', category: 'Books' });

    const filteredListings = listings.filter(item => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handlePostListing = () => {
        if (!newListing.title || !newListing.price) {
            alert("Please fill out the title and price!");
            return;
        }
        const itemToAdd = {
            id: listings.length + 1, // Generate a fake ID
            title: newListing.title,
            price: Number(newListing.price), // Ensure price is a number
            category: newListing.category,
            // Generate a random picture based on the title they typed
            image: `https://picsum.photos/seed/${newListing.title.replace(/\s/g, '')}/200/150`
        };
        setListings([itemToAdd, ...listings]);

        setIsModalOpen(false);
        setNewListing({ title: '', price: '', category: 'Books' });
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

                        <div key={item.id} style={cardStyle}>
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
                            <label>Category</label>
                            <select
                                value={newListing.category}
                                onChange={e => setNewListing({...newListing, category: e.target.value})}
                                style={modalInputStyle}
                            >
                                <option value="Books">Books</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Electronics">Electronics</option>
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