import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './ShopList.css';

function ShopList() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    shopName: '',
    shopType: '',
    status: 'Open',
    mallId: ''
  });

  const API_URL = `${API_BASE_URL}/shops`;

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setShops(response.data);
    } catch (err) {
      setError('Failed to fetch shops. Ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddShop = async (e) => {
    e.preventDefault();
    if (!formData.shopName.trim() || !formData.shopType.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ shopName: '', shopType: '', status: 'Open', mallId: '' });
      setShowForm(false);
      setEditingId(null);
      fetchShops();
    } catch (err) {
      setError('Failed to save shop');
      console.error(err);
    }
  };

  const handleEditShop = (shop) => {
    setFormData(shop);
    setEditingId(shop.shopId);
    setShowForm(true);
  };

  const handleDeleteShop = async (id) => {
    if (window.confirm('Are you sure you want to delete this shop?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchShops();
      } catch (err) {
        setError('Failed to delete shop');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ shopName: '', shopType: '', status: 'Open', mallId: '' });
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div>Loading shops...</div>;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return '#10b981';
      case 'closed': return '#ef4444';
      case 'maintenance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="shop-list">
      <div className="shop-header">
        <div className="header-content">
          <h2>🏪 Retail Shops</h2>
          <p>Manage your shopping outlets and their operations</p>
        </div>
        <button
          className={`btn-add ${showForm ? 'active' : ''}`}
          onClick={() => !showForm ? setShowForm(true) : handleCancel()}
        >
          {showForm ? '✕ Cancel' : '➕ Add New Shop'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? '✏️ Edit Shop' : '➕ Create New Shop'}</h3>
          <form onSubmit={handleAddShop}>
            <div className="form-group">
              <label htmlFor="shopName">Shop Name *</label>
              <input
                id="shopName"
                type="text"
                name="shopName"
                value={formData.shopName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Tech Store"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="shopType">Shop Type *</label>
              <input
                id="shopType"
                type="text"
                name="shopType"
                value={formData.shopType}
                onChange={handleInputChange}
                required
                placeholder="e.g., Electronics, Clothing, Food"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="Open">🟢 Open</option>
                <option value="Closed">🔴 Closed</option>
                <option value="Maintenance">🟡 Maintenance</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update Shop' : '✅ Create Shop'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="shops-grid">
        {shops.length === 0 ? (
          <div className="empty-state">
            <p>📭 No shops found</p>
            <p>Click "Add New Shop" to get started</p>
          </div>
        ) : (
          shops.map(shop => (
            <div key={shop.shopId} className="shop-card">
              <div className="card-header">
                <h3>{shop.shopName}</h3>
                <div
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(shop.status) }}
                >
                  {shop.status || 'Unknown'}
                </div>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">🏷️ Type:</span>
                  <span className="value">{shop.shopType}</span>
                </div>
                <div className="info-row">
                  <span className="label">📊 ID:</span>
                  <span className="value">#{shop.shopId}</span>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEditShop(shop)}
                  title="Edit shop"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteShop(shop.shopId)}
                  title="Delete shop"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShopList;
