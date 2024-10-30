import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import GoogleCallback from "./auth/GoogleCallback";
import ListStore from "./components/store/ListStore";
import CreateStore from "./components/store/CreateStore";
import UpdateStore from "./components/store/UpdateStore";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/auth/google/callback" element={<GoogleCallback />} />
                <Route path="/stores" element={<ListStore />} />
                <Route path="/stores/create" element={<CreateStore />} />
                <Route path="/stores/:id" element={<UpdateStore />} />
                {/* Thêm các route khác ở đây */}
                <Route path="/" element={<h1>Home Page</h1>} />
            </Routes>
        </Router>
    );
};

export default App;
