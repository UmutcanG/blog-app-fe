import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/login', 
            new URLSearchParams({
                username: username,
                password: password
            }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true 
            });

            const userInfoResponse = await axios.get('http://localhost:8080/current-user', {
                withCredentials: true
            });

            const roles = userInfoResponse.data.roles;
            const userId = userInfoResponse.data.id;
            console.log('User roles:', roles);

            if (roles && roles.length > 0) {
                const role = roles[0];
                
                localStorage.setItem('roles', JSON.stringify(roles));
                localStorage.setItem('userId', userId);
                
                onLogin();
                if (role === "ADMIN") {
                    navigate('/users');
                } else {
                    navigate('/welcome');
                }
            } else {
                setError('User roles are undefined or empty');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
            setError('Invalid credentials or an error occurred');
        }
    };

    const handleRegisterRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="register-link-container">
                <p>Don't have an account?</p>
                <button onClick={handleRegisterRedirect} className="register-button">Register</button>
            </div>
        </div>
    );
};

export default Login;
