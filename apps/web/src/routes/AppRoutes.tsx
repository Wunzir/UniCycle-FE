import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* This creates the /signup page */}
                <Route path="/signup" element={<Signup />} />

                {/* This is your landing page at "/" */}
                <Route path="/" element={<h1>Welcome to UniCycle</h1>} />


            </Routes>
        </Router>
    );
};

export default AppRoutes;