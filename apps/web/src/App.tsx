import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Marketplace from './pages/Marketplace';
import ListingDetails from './pages/ListingDetails';
import Profile from './pages/Profile';

function App() {
    return (
        <Router>
            <Routes>
                {/* Default route: Sends them to login if they just type localhost:5173 */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/listing/:id" element={<ListingDetails />} />
            </Routes>
        </Router>
    );
}

export default App;