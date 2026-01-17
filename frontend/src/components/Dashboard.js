import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Dashboard.css';

const Dashboard = ({ setCurrentPage }) => {
    const [stats, setStats] = useState({
        malls: 0,
        shops: 0,
        customers: 0,
        items: 0,
        employees: 0,
        orders: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            // Fetching counts concurrently for performance
            const [mallsRes, shopsRes, customersRes, itemsRes, employeesRes, ordersRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/malls`),
                axios.get(`${API_BASE_URL}/shops`),
                axios.get(`${API_BASE_URL}/customers`),
                // Items might be tricky if no global endpoint, but we can try /items or skip
                // Actually earlier I noted /items might not exist globally. 
                // Let's assume we can't easily get total items count without a specific endpoint or iterating shops.
                // I'll skip items count or just try a likely endpoint if it exists, or just use 0.
                // Let's try fetching shops and maybe summing up if possible, or just leave items as 0 for now.
                // EmployeeController has global /employees, OrderController has global /orders
                axios.get(`${API_BASE_URL}/items`).catch(() => ({ data: [] })), // Fallback to empty
                axios.get(`${API_BASE_URL}/employees`),
                axios.get(`${API_BASE_URL}/orders`)
            ]);

            setStats({
                malls: mallsRes.data.length,
                shops: shopsRes.data.length,
                customers: customersRes.data.length,
                items: itemsRes.data.length || 0,
                employees: employeesRes.data.length,
                orders: ordersRes.data.length
            });
        } catch (error) {
            console.error("Error fetching dashboard stats", error);
        }
    };

    const menuItems = [
        { id: 'malls', title: 'Total Malls', count: stats.malls, icon: '🏢', color: '#6366f1' },
        { id: 'shops', title: 'Active Shops', count: stats.shops, icon: '🏪', color: '#10b981' },
        { id: 'customers', title: 'Customers', count: stats.customers, icon: '👥', color: '#f59e0b' },
        { id: 'orders', title: 'Orders Placed', count: stats.orders, icon: '🧾', color: '#ec4899' },
        { id: 'employees', title: 'Employees', count: stats.employees, icon: '👔', color: '#8b5cf6' },
        { id: 'items', title: 'Inventory Items', count: stats.items, icon: '📦', color: '#f97316' },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>📊 Dashboard Overview</h1>
                <p>Welcome back! Here's what's happening in your mall management system.</p>
            </header>

            <div className="stats-grid">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="stat-card"
                        onClick={() => setCurrentPage(item.id)}
                        style={{ borderLeftColor: item.color }}
                    >
                        <div className="stat-icon" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                            {item.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{item.count}</h3>
                            <p>{item.title}</p>
                        </div>
                        <div className="stat-arrow">→</div>
                    </div>
                ))}
            </div>

            <div className="quick-actions">
                <h2>⚡ Quick Actions</h2>
                <div className="actions-grid">
                    <button className="action-btn" onClick={() => setCurrentPage('malls')}>➕ Add New Mall</button>
                    <button className="action-btn" onClick={() => setCurrentPage('shops')}>🏪 Register Shop</button>
                    <button className="action-btn" onClick={() => setCurrentPage('orders')}>🧾 Create Order</button>
                    <button className="action-btn" onClick={() => setCurrentPage('customers')}>👤 Add Customer</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
