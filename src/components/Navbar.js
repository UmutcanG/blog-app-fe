import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogout }) => {
    const roles = JSON.parse(localStorage.getItem('roles')) || [];

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <button className="navbar-button"><Link to="/posts">Posts</Link></button>
                </li>
                {roles.includes('ADMIN') && (
                    <>
                        <li className="navbar-item">
                            <button className="navbar-button"><Link to="/add-post">Add Post</Link></button>
                        </li>
                        <li className="navbar-item">
                            <button className="navbar-button"><Link to="/users">Users</Link></button>
                        </li>
                    </>
                )}
                <li className="navbar-item logout-button">
                    <button onClick={onLogout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
