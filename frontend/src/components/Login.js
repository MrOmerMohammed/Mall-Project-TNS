import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Login.css';

const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [role, setRole] = useState('CUSTOMER');

    // Form Fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Mall Admin Fields
    const [adminName, setAdminName] = useState('');
    const [email, setEmail] = useState('');
    const [mallName, setMallName] = useState('');
    const [mallLocation, setMallLocation] = useState('');
    const [mallContact, setMallContact] = useState('');

    // Shop Owner Fields
    const [ownerName, setOwnerName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopType, setShopType] = useState('General');

    // UI State
    const [error, setError] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMsg('');
        setLoading(true);

        try {
            if (isLogin) {
                // LOGIN
                const response = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
                onLogin(response.data);
            } else {
                // REGISTER
                if (role === 'MALL_ADMIN') {
                    await axios.post(`${API_BASE_URL}/register/mall-admin`, {
                        username, password,
                        adminName, email,
                        mallName, mallLocation, mallContact
                    });
                } else if (role === 'SHOP_OWNER') {
                    await axios.post(`${API_BASE_URL}/register/shop-owner`, {
                        username, password,
                        ownerName, contactNumber,
                        shopName, shopType
                    });
                } else {
                    await axios.post(`${API_BASE_URL}/users`, { username, password, role });
                }

                setSuccessMsg(`🎉 Account created as ${role.replace('_', ' ').toLowerCase()}! Please log in.`);
                setIsLogin(true);
                // Clear sensitive fields
                setPassword('');
            }
        } catch (err) {
            console.error(err);
            setError(isLogin ? '❌ Invalid credentials' : '❌ Registration failed. Username may be taken.');
        } finally {
            setLoading(false);
        }
    };

    const renderRoleCards = () => (
        <div className="role-grid">
            <div className={`role-card ${role === 'SUPER_ADMIN' ? 'active' : ''}`} onClick={() => setRole('SUPER_ADMIN')}>
                <span className="role-icon">🌐</span>
                <div className="role-name">System Admin</div>
            </div>
            <div className={`role-card ${role === 'MALL_ADMIN' ? 'active' : ''}`} onClick={() => setRole('MALL_ADMIN')}>
                <span className="role-icon">🏢</span>
                <div className="role-name">Mall Admin</div>
            </div>
            <div className={`role-card ${role === 'SHOP_OWNER' ? 'active' : ''}`} onClick={() => setRole('SHOP_OWNER')}>
                <span className="role-icon">🏪</span>
                <div className="role-name">Shop Owner</div>
            </div>
            <div className={`role-card ${role === 'CUSTOMER' ? 'active' : ''}`} onClick={() => setRole('CUSTOMER')}>
                <span className="role-icon">👤</span>
                <div className="role-name">Customer</div>
            </div>
        </div>
    );

    return (
        <div className="login-container">
            <div className={`login-card ${!isLogin ? 'expanded' : ''}`}>
                <div className="login-header">
                    <h1>{isLogin ? (role === 'SUPER_ADMIN' ? 'System Admin' : role === 'MALL_ADMIN' ? 'Mall Admin' : role === 'SHOP_OWNER' ? 'Shop Owner' : 'Customer Login') : 'Create Account'}</h1>
                    <p>{isLogin ? 'Please sign in to continue' : 'Select your role to get started'}</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Only show role selection during Registration OR if you want visual cue during login (User request was vague so adding it to Reg for functionality, but maybe Login needs it just for show? No, Login is unified usually.)
                        Wait, user asked "whether who is login admin or mall...".
                        For Login, the backend tells us who it is.
                        BUT if the user WANTS to select "I am an Admin" to filter the login form, we can do that.
                        Actually, typical best practice is unified login.
                        However, to satisfy "refine the login page... whether who is login", I will show the cards in REGISTRATION mainly,
                        but for Login, I'll add a visual label or keep it simple.
                        Actually, let's keep it simple: Logic dictates Role is only needed for Registration. 
                        User might be confused about "Where do I login as Admin?". Answer: Same box.
                        I will add a tooltip or text saying "Unified Login for All Roles".
                     */}

                    {/* Role Selection (Always Visible) */}
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ textAlign: 'center', display: 'block', marginBottom: '0.5rem', color: '#636e72', fontSize: '0.9rem' }}>
                            {isLogin ? 'Select Your Portal' : 'Select Account Type'}
                        </label>
                        {renderRoleCards()}
                    </div>

                    <div className="form-group">
                        <label>Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {!isLogin && role === 'MALL_ADMIN' && (
                        <div className="extra-fields">
                            <h3>🏢 Mall Setup</h3>
                            <div className="form-group"><label>Admin Name</label><input value={adminName} onChange={e => setAdminName(e.target.value)} required /></div>
                            <div className="form-group"><label>Mall Name</label><input value={mallName} onChange={e => setMallName(e.target.value)} required /></div>
                            <div className="form-group"><label>Location</label><input value={mallLocation} onChange={e => setMallLocation(e.target.value)} required /></div>
                            <div className="form-group"><label>Email</label><input value={email} onChange={e => setEmail(e.target.value)} required /></div>
                            <div className="form-group"><label>Contact</label><input value={mallContact} onChange={e => setMallContact(e.target.value)} required /></div>
                        </div>
                    )}

                    {!isLogin && role === 'SHOP_OWNER' && (
                        <div className="extra-fields">
                            <h3>🏪 Shop Setup</h3>
                            <div className="form-group"><label>Owner Name</label><input value={ownerName} onChange={e => setOwnerName(e.target.value)} required /></div>
                            <div className="form-group"><label>Shop Name</label><input value={shopName} onChange={e => setShopName(e.target.value)} required /></div>
                            <div className="form-group"><label>Contact</label><input value={contactNumber} onChange={e => setContactNumber(e.target.value)} required /></div>
                            <div className="form-group">
                                <label>Business Type</label>
                                <select value={shopType} onChange={e => setShopType(e.target.value)}>
                                    <option value="General">General</option><option value="Fashion">Fashion</option><option value="Electronics">Electronics</option><option value="Food">Food</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {error && <div className="error-msg">{error}</div>}
                    {successMsg && <div className="success-msg">{successMsg}</div>}

                    <button type="submit" className="btn-login" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Create Account')}
                    </button>

                    {isLogin && <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#aaa', marginTop: '1rem' }}>Unified Login: Admin, Owner, or Customer</p>}
                </form>

                <div className="login-footer">
                    <p>
                        {isLogin ? "New to the platform? " : "Already have an account? "}
                        <span className="link-text" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                            {isLogin ? 'Register Now' : 'Sign In'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
