import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Dashboard.css'; // Reusing dashboard styles

const MallAdminDashboard = ({ user, onLogout }) => {
    const [mall, setMall] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [shops, setShops] = useState([]);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchMallData = async () => {
            try {
                // 1. Get Admin's Mall
                const response = await axios.get(`${API_BASE_URL}/mall-admins/user/${user.userId}`);
                if (response.data && response.data.mall) {
                    const myMall = response.data.mall;
                    setMall(myMall);

                    // 2. Fetch Mall's Shops
                    const shopsRes = await axios.get(`${API_BASE_URL}/shops/mall/${myMall.mallId}`);
                    setShops(shopsRes.data);

                    // 3. Fetch Mall's Employees
                    const empsRes = await axios.get(`${API_BASE_URL}/employees/mall/${myMall.mallId}`);
                    setEmployees(empsRes.data);
                }
            } catch (err) {
                console.error("Failed to fetch mall admin data", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchMallData();
        }
    }, [user]);

    if (loading) return <div className="loading">Loading Dashboard...</div>;

    if (!mall) {
        return (
            <div className="dashboard-container">
                <div className="welcome-banner error-banner">
                    <h2>⚠️ No Mall Assigned</h2>
                    <p>You are registered as an Admin, but no Mall is linked to your account.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="welcome-banner">
                <div>
                    <h1>🏢 {mall.mallName} Dashboard</h1>
                    <p>Managing {mall.location} • Admin Panel</p>
                </div>
                <div className="banner-stats">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'shops' ? 'active' : ''}`}
                        onClick={() => setActiveTab('shops')}
                    >
                        Shops ({shops.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'employees' ? 'active' : ''}`}
                        onClick={() => setActiveTab('employees')}
                    >
                        Staff ({employees.length})
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="stats-grid">
                    <div className="stat-card" onClick={() => setActiveTab('shops')}>
                        <div className="icon">🏪</div>
                        <div className="info">
                            <h3>Total Shops</h3>
                            <p className="big-number">{shops.length}</p>
                            <span className="trend">Manage Shops</span>
                        </div>
                    </div>
                    <div className="stat-card" onClick={() => setActiveTab('employees')}>
                        <div className="icon">👔</div>
                        <div className="info">
                            <h3>Total Staff</h3>
                            <p className="big-number">{employees.length}</p>
                            <span className="trend">Manage Employees</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon">📢</div>
                        <div className="info">
                            <h3>Categories</h3>
                            <p className="big-number">{[...new Set(shops.map(s => s.shopType))].length}</p>
                            <span className="trend">Shop Types</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'shops' && (
                <div className="content-card">
                    <div className="card-header">
                        <h3>🏪 Shop Management</h3>
                        <button className="btn-action primary">+ Add Shop</button>
                    </div>
                    {shops.length === 0 ? <p className="empty-state">No shops added yet.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {shops.map(shop => (
                                    <tr key={shop.shopId}>
                                        <td>#{shop.shopId}</td>
                                        <td>{shop.shopName}</td>
                                        <td>{shop.shopType}</td>
                                        <td><span className="badge badge-success">{shop.status}</span></td>
                                        <td>
                                            <button className="btn-icon">✏️</button>
                                            <button className="btn-icon delete">🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'employees' && (
                <div className="content-card">
                    <div className="card-header">
                        <h3>👔 Staff Management</h3>
                        <button className="btn-action primary">+ Add Employee</button>
                    </div>
                    {employees.length === 0 ? <p className="empty-state">No employees found.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Salary</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map(emp => (
                                    <tr key={emp.id}>
                                        <td>#{emp.id}</td>
                                        <td>{emp.name}</td>
                                        <td>{emp.designation}</td>
                                        <td>${emp.salary}</td>
                                        <td>
                                            <button className="btn-icon delete">🗑️</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default MallAdminDashboard;
