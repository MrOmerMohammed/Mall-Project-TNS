import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './ItemList.css'; // Reusing global styles

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // New Order State
    const [newOrder, setNewOrder] = useState({
        customerId: '', // Ideally a dropdown of customers
        paymentMode: 'CASH',
        totalAmount: '',
        shopId: '' // Include Shop ID if we wanna link it
    });

    // For dropdowns
    const [customers, setCustomers] = useState([]);
    const [shops, setShops] = useState([]);

    useEffect(() => {
        fetchOrders();
        fetchCustomers();
        fetchShops();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/orders`);
            if (Array.isArray(response.data)) {
                setOrders(response.data);
            } else {
                setOrders([]);
                console.error("Orders API invalid response", response.data);
            }
        } catch (err) {
            console.error("Fetch orders failed", err);
            // Fallback or empty
        } finally {
            setLoading(false);
        }
    };

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/customers`);
            if (Array.isArray(res.data)) {
                setCustomers(res.data);
            } else {
                setCustomers([]);
            }
        } catch (e) { console.error(e); }
    };

    const fetchShops = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/shops`);
            if (Array.isArray(res.data)) {
                setShops(res.data);
            } else {
                setShops([]);
            }
        } catch (e) { console.error(e); }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder({ ...newOrder, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Logic: OrderController usually has addItemToOrder, or simple create order?
            // Let's check typical flow. Often we create an Order for a customer.
            // Or we add items to it.
            // Based on controller, it seems simple CRUD for now.
            await axios.post(`${API_BASE_URL}/orders`, newOrder);
            fetchOrders();
            setNewOrder({ customerId: '', paymentMode: 'CASH', totalAmount: '', shopId: '' });
        } catch (err) {
            setError('Failed to create order');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete order?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/orders/${id}`);
            fetchOrders();
        } catch (err) {
            setError('Failed to delete order');
        }
    };

    return (
        <div className="item-list-container">
            <div className="header-actions">
                <h2>🧾 Order Management</h2>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="content-grid">
                <div className="form-card">
                    <h3>Create New Order</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Customer</label>
                            <select name="customerId" value={newOrder.customerId} onChange={handleInputChange} className="form-input" required>
                                <option value="">-- Select Customer --</option>
                                {customers.map(c => (
                                    <option key={c.customerId} value={c.customerId}>{c.customerName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Shop</label>
                            <select name="shopId" value={newOrder.shopId} onChange={handleInputChange} className="form-input">
                                <option value="">-- Select Shop (Optional) --</option>
                                {Array.isArray(shops) && shops.map(s => (
                                    <option key={s.shopId} value={s.shopId}>{s.shopName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Payment Mode</label>
                            <select name="paymentMode" value={newOrder.paymentMode} onChange={handleInputChange} className="form-input">
                                <option value="CASH">CASH</option>
                                <option value="CARD">CARD</option>
                                <option value="UPI">UPI</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Total Amount</label>
                            <input type="number" name="totalAmount" value={newOrder.totalAmount} onChange={handleInputChange} className="form-input" required placeholder="0.00" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            + Create Order
                        </button>
                    </form>
                </div>

                <div className="list-card">
                    <h3>Recent Orders</h3>
                    {loading ? (
                        <p>Loading orders...</p>
                    ) : orders.length === 0 ? (
                        <p className="empty-state">No orders found.</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Customer</th>
                                        <th>Amount</th>
                                        <th>Payment</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(orders) && orders.map((order) => (
                                        <tr key={order.orderId}>
                                            <td>#{order.orderId}</td>
                                            <td className="font-medium">
                                                {order.customer ? order.customer.customerName : 'Unknown'}
                                            </td>
                                            <td>${order.totalAmount}</td>
                                            <td><span className="badge badge-warning">{order.paymentMode}</span></td>
                                            <td>
                                                <button
                                                    className="btn-icon delete"
                                                    onClick={() => handleDelete(order.orderId)}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderList;
