import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './ShopDetails.css';

const ShopDetails = ({ shop, onBack }) => {
    const [items, setItems] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [owner, setOwner] = useState(null);
    const [activeTab, setActiveTab] = useState('inventory'); // inventory, staff, orders

    useEffect(() => {
        fetchShopDetails();
    }, [shop]);

    const fetchShopDetails = async () => {
        try {
            // Fetch Owner
            if (shop.shopOwner) setOwner(shop.shopOwner);

            // Fetch Items (assuming filtered by shop or generic fetch and filter)
            // Earlier I implemented fetch items by shop in ItemList. I should reuse or fetch here.
            // Let's rely on standard endpoints.
            const itemsRes = await axios.get(`${API_BASE_URL}/items`);
            setItems(itemsRes.data.filter(i => i.shop && i.shop.shopId === shop.shopId));

            // Fetch Employees
            const empRes = await axios.get(`${API_BASE_URL}/employees`);
            setEmployees(empRes.data.filter(e => e.shop && e.shop.shopId === shop.shopId));

        } catch (e) { console.error(e); }
    };

    return (
        <div className="shop-details-container">
            <div className="nav-breadcrumb">
                <span onClick={onBack} className="link">All Malls</span>
                <span className="separator">/</span>
                <span className="current">{shop.shopName}</span>
            </div>

            <div className="shop-header-card">
                <div>
                    <h1>{shop.shopName}</h1>
                    <span className="badge-type">{shop.shopType}</span>
                    <span className={`badge-status ${shop.status.toLowerCase()}`}>{shop.status}</span>
                </div>
                <div className="owner-badge">
                    <small>Owner</small>
                    <strong>{owner ? owner.ownerName : "Not Assigned"}</strong>
                </div>
            </div>

            <div className="tabs-container">
                <button className={`tab ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>📦 Inventory ({items.length})</button>
                <button className={`tab ${activeTab === 'staff' ? 'active' : ''}`} onClick={() => setActiveTab('staff')}>👔 Staff ({employees.length})</button>
            </div>

            <div className="tab-content">
                {activeTab === 'inventory' && (
                    <div className="inventory-grid">
                        <button className="btn-action primary">+ Add Item</button>
                        <table className="simple-table">
                            <thead>
                                <tr><th>Name</th><th>Price</th><th>Qty</th></tr>
                            </thead>
                            <tbody>
                                {items.map(i => (
                                    <tr key={i.itemId}>
                                        <td>{i.itemName}</td>
                                        <td>${i.price}</td>
                                        <td>{i.quantity}</td>
                                    </tr>
                                ))}
                                {items.length === 0 && <tr><td colSpan="3">No items in stock</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'staff' && (
                    <div className="staff-grid">
                        <button className="btn-action primary">+ Add Employee</button>
                        <table className="simple-table">
                            <thead>
                                <tr><th>Name</th><th>Role</th><th>Salary</th></tr>
                            </thead>
                            <tbody>
                                {employees.map(e => (
                                    <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.designation}</td>
                                        <td>${e.salary}</td>
                                    </tr>
                                ))}
                                {employees.length === 0 && <tr><td colSpan="3">No employees</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopDetails;
