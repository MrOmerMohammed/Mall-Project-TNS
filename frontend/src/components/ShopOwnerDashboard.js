import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Dashboard.css'; // Reusing dashboard styles

const ShopOwnerDashboard = ({ user }) => {
    const [shop, setShop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    // Data States
    const [items, setItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchShopData = async () => {
            try {
                // 1. Get Owner Profile
                const profileRes = await axios.get(`${API_BASE_URL}/shop-owners/user/${user.userId}`);
                const myShop = profileRes.data.shop;

                if (myShop) {
                    setShop(myShop);
                    // 2. Fetch Items
                    const itemsRes = await axios.get(`${API_BASE_URL}/items/shop/${myShop.shopId}`);
                    setItems(itemsRes.data);

                    // 3. Fetch Orders (New Endpoint)
                    try {
                        const ordersRes = await axios.get(`${API_BASE_URL}/orders/shop/${myShop.shopId}`);
                        setOrders(ordersRes.data || []);
                    } catch (e) {
                        console.warn("Orders fetch failed", e);
                        setOrders([]);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch shop data", err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchShopData();
        }
    }, [user]);

    if (loading) return <div className="loading">Loading your Shop...</div>;

    if (!shop) {
        return (
            <div className="dashboard-container">
                <div className="welcome-banner error-banner">
                    <h2>⚠️ No Shop Linked</h2>
                    <p>You are registered as a Shop Owner, but no Shop is found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="welcome-banner shop-banner">
                <div>
                    <h1>🏪 {shop.shopName}</h1>
                    <p>Owner Dashboard • {shop.shopType}</p>
                </div>
                <div className="banner-stats">
                    <button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        Overview
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`}
                        onClick={() => setActiveTab('inventory')}
                    >
                        Inventory ({items.length})
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders ({orders.length})
                    </button>
                </div>
            </div>

            {activeTab === 'overview' && (
                <div className="stats-grid">
                    <div className="stat-card" onClick={() => setActiveTab('inventory')}>
                        <div className="icon">📦</div>
                        <div className="info">
                            <h3>Total Items</h3>
                            <p className="big-number">{items.length}</p>
                            <span className="trend">Manage Inventory</span>
                        </div>
                    </div>
                    <div className="stat-card" onClick={() => setActiveTab('orders')}>
                        <div className="icon">🧾</div>
                        <div className="info">
                            <h3>New Orders</h3>
                            <p className="big-number">{orders.length}</p>
                            <span className="trend">Process Orders</span>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="icon">💰</div>
                        <div className="info">
                            <h3>Revenue</h3>
                            <p className="big-number">$0.00</p>
                            <span className="trend">This Month</span>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'inventory' && (
                <div className="content-card">
                    <div className="card-header">
                        <h3>📦 Inventory Management</h3>
                        <button className="btn-action primary">+ Add Item</button>
                    </div>
                    {items.length === 0 ? <p className="empty-state">No items in inventory.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Manufacture Date</th>
                                    <th>Expiry Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.itemId}>
                                        <td>{item.itemName}</td>
                                        <td>${item.price}</td>
                                        <td>{item.manufacturingDate}</td>
                                        <td>{item.expiryDate}</td>
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

            {activeTab === 'orders' && (
                <div className="content-card">
                    <div className="card-header">
                        <h3>🧾 Incoming Orders</h3>
                    </div>
                    {orders.length === 0 ? <p className="empty-state">No active orders.</p> : (
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>#{order.orderId}</td>
                                        <td>{order.items ? order.items.length : 0} Items</td>
                                        <td>${order.totalAmount}</td>
                                        <td><span className="badge badge-warning">{order.orderStatus || 'PENDING'}</span></td>
                                        <td>
                                            <button className="btn-action small success">✅ Complete</button>
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

export default ShopOwnerDashboard;
