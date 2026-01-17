import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './ItemList.css';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newItem, setNewItem] = useState({
        itemName: '',
        price: '',
        quantity: '',
        shopId: ''
    });

    useEffect(() => {
        fetchItems();
        fetchShops();
    }, []);

    const fetchItems = async () => {
        try {
            // Assuming you might add an endpoint to get ALL items, 
            // or we iterate through shops. For now let's assume /api/items exists 
            // as per ItemController. But ItemController usually gets by shop.
            // Let's use a hypothetical "getAllItems" if available or just list by shop.
            // Actually ItemController has @GetMapping("/items") usually? 
            // Checking backend... ItemController usually has per-shop methods.
            // Let's check if we can get all. If not, we might need to select a shop first.
            // For improved UX, let's fetch all items (if supported) or show empty state until shop selected.
            // Actually, let's look at the controller again. It has @GetMapping("/items/{itemId}") and @GetMapping("/items/shop/{shopId}")
            // It does NOT seem to have "getAllItems". 
            // I will implement a "Select Shop" dropdown filter to view items.
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch items');
            setLoading(false);
        }
    };

    const fetchShops = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/shops`);
            setShops(response.data);
            if (response.data.length > 0) {
                // Auto-select first shop and fetch its items
                setNewItem(prev => ({ ...prev, shopId: response.data[0].shopId }));
                fetchItemsByShop(response.data[0].shopId);
            }
        } catch (err) {
            console.error("Error fetching shops", err);
        }
    };

    const fetchItemsByShop = async (shopId) => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/items/shop/${shopId}`);
            setItems(response.data);
        } catch (err) {
            console.error("Error fetching items", err);
            // If 404/empty, just set empty list
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });

        if (name === 'shopId') {
            fetchItemsByShop(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newItem.shopId) {
            alert("Please select a shop first");
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/items/shop/${newItem.shopId}`, newItem);
            fetchItemsByShop(newItem.shopId);
            setNewItem({ ...newItem, itemName: '', price: '', quantity: '' }); // Keep shopId selected
        } catch (err) {
            setError('Failed to create item');
            console.error(err);
        }
    };

    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.delete(`${API_BASE_URL}/items/${itemId}`);
            fetchItemsByShop(newItem.shopId);
        } catch (err) {
            setError('Failed to delete item');
        }
    };

    return (
        <div className="item-list-container">
            <div className="header-actions">
                <h2>📦 Inventory Management</h2>
                <div className="shop-filter">
                    <label>Select Shop: </label>
                    <select
                        name="shopId"
                        value={newItem.shopId}
                        onChange={handleInputChange}
                        className="shop-select"
                    >
                        <option value="">-- Select Shop --</option>
                        {shops.map(shop => (
                            <option key={shop.shopId} value={shop.shopId}>
                                {shop.shopName} (ID: {shop.shopId})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="content-grid">
                <div className="form-card">
                    <h3>Add New Item</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Item Name</label>
                            <input
                                type="text"
                                name="itemName"
                                className="form-input"
                                value={newItem.itemName}
                                onChange={handleInputChange}
                                required
                                placeholder="Ex: Denim Jeans"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <input
                                type="number"
                                name="price"
                                className="form-input"
                                value={newItem.price}
                                onChange={handleInputChange}
                                required
                                placeholder="0.00"
                            />
                        </div>
                        <div className="form-group">
                            <label>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                className="form-input"
                                value={newItem.quantity}
                                onChange={handleInputChange}
                                required
                                placeholder="0"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            + Add Item
                        </button>
                    </form>
                </div>

                <div className="list-card">
                    <h3>Items in Stock</h3>
                    {newItem.shopId ? (
                        loading ? (
                            <p>Loading items...</p>
                        ) : items.length === 0 ? (
                            <p className="empty-state">No items found in this shop.</p>
                        ) : (
                            <div className="table-responsive">
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.itemId}>
                                                <td>#{item.itemId}</td>
                                                <td className="font-medium">{item.itemName}</td>
                                                <td>${item.price}</td>
                                                <td>
                                                    <span className={`badge ${item.quantity < 10 ? 'badge-warning' : 'badge-success'}`}>
                                                        {item.quantity}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn-icon delete"
                                                        onClick={() => handleDelete(item.itemId)}
                                                        title="Delete Item"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                    ) : (
                        <div className="select-prompt">
                            <p>👈 Please select a shop to manage its inventory.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ItemList;
