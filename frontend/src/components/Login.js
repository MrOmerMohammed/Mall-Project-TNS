import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Login.css';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('CUSTOMER'); // Default role
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');

        try {
            if (isLogin) {
                // LOGIN LOGIC
                const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
                onLogin(response.data);
            } else {
                // SIGNUP LOGIC
                await axios.post(`${API_BASE_URL}/users`, {
                    username,
                    password,
                    role
                });
                setSuccessMsg('Account created! Please log in.');
                setIsLogin(true); // Switch back to login
            }
        } catch (err) {
            console.error(err);
            setError(isLogin ? 'Invalid username or password' : 'Error creating account. Try a different username.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <span className="login-icon">🛍️</span>
                    <h1>{isLogin ? 'Management Portal' : 'Join the Platform'}</h1>
                    <p>{isLogin ? 'Sign in to your account' : 'Create your account to get started'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label>I want to be a...</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
                                <option value="CUSTOMER">👤 Customer (Browse & Shop)</option>
                                <option value="SHOP_OWNER">🏪 Shop Owner (Manage my Shop)</option>
                                <option value="MALL_ADMIN">🏢 Mall Admin (Manage a Mall)</option>
                            </select>
                        </div>
                    )}

                    {error && <p className="error-msg">{error}</p>}
                    {successMsg && <p className="success-msg">{successMsg}</p>}

                    <button type="submit" className="btn-login">
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span className="link-text" onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccessMsg('');
                        }}>
                            {isLogin ? 'Sign Up' : 'Log In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
