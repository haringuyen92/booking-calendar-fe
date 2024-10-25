import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import GoogleCallback from "./auth/GoogleCallback";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
                {/* Thêm các route khác ở đây */}
                <Route path="/" element={<h1>Home Page</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
