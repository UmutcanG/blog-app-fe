import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, mail);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
            window.alert(errorMessage);
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleRegister} className="register-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Register</button>
                <div className="login-link-container">
                    <button
                        type="button"
                        className="login-button"
                        onClick={() => navigate('/login')}
                    >
                        Already have an account? Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
