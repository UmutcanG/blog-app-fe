import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Welcome from './components/Welcome/Welcome';
import Users from './components/Users/Users';
import Posts from './components/Posts/Posts';
import AddPost from './components/AddPost/AddPost';
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userRoles = JSON.parse(localStorage.getItem('roles')) || [];

        if (userId) {
            setIsAuthenticated(true);
            setRoles(userRoles);
        }
    }, []);

    const handleLogin = () => setIsAuthenticated(true);

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('roles');
        setIsAuthenticated(false);
    };

    const isAdmin = roles.includes('ADMIN');

    return (
        <Router>
            {isAuthenticated && <Navbar onLogout={handleLogout} />}
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/welcome" /> : <Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={isAuthenticated ? <Welcome /> : <Navigate to="/login" />} />
                <Route path="/users" element={isAuthenticated ? (isAdmin ? <Users /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} />
                <Route path="/add-post" element={isAuthenticated ? (isAdmin ? <AddPost /> : <Navigate to="/welcome" />) : <Navigate to="/login" />} />
                <Route path="/posts" element={isAuthenticated ? <Posts /> : <Navigate to="/login" />} />
                <Route path="/posts/:id" element={isAuthenticated ? <PostDetails /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
