import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './MallList.css';

function MallList() {
  const [malls, setMalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    mallName: '',
    location: '',
    contactNumber: ''
  });

  const API_URL = `${API_BASE_URL}/malls`;

  useEffect(() => {
    fetchMalls();
  }, []);

  const fetchMalls = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      setMalls(response.data);
    } catch (err) {
      setError('Failed to fetch malls. Ensure backend is running.');
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

  const handleAddMall = async (e) => {
    e.preventDefault();
    if (!formData.mallName.trim() || !formData.location.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ mallName: '', location: '', contactNumber: '' });
      setShowForm(false);
      setEditingId(null);
      fetchMalls();
    } catch (err) {
      setError('Failed to save mall');
      console.error(err);
    }
  };

  const handleEditMall = (mall) => {
    setFormData(mall);
    setEditingId(mall.mallId);
    setShowForm(true);
  };

  const handleDeleteMall = async (id) => {
    if (window.confirm('Are you sure you want to delete this mall?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMalls();
      } catch (err) {
        setError('Failed to delete mall');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ mallName: '', location: '', contactNumber: '' });
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div>Loading malls...</div>;

  return (
    <div className="mall-list">
      <div className="mall-header">
        <div className="header-content">
          <h2>🏢 Shopping Malls</h2>
          <p>Manage your shopping mall properties</p>
        </div>
        <button
          className={`btn-add ${showForm ? 'active' : ''}`}
          onClick={() => !showForm ? setShowForm(true) : handleCancel()}
        >
          {showForm ? '✕ Cancel' : '➕ Add New Mall'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? '✏️ Edit Mall' : '➕ Create New Mall'}</h3>
          <form onSubmit={handleAddMall}>
            <div className="form-group">
              <label htmlFor="mallName">Mall Name *</label>
              <input
                id="mallName"
                type="text"
                name="mallName"
                value={formData.mallName}
                onChange={handleInputChange}
                required
                placeholder="e.g., Central City Mall"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g., Downtown, New York"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                id="contactNumber"
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                placeholder="e.g., +1-800-123-4567"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update Mall' : '✅ Create Mall'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="malls-grid">
        {malls.length === 0 ? (
          <div className="empty-state">
            <p>📭 No malls found</p>
            <p>Click "Add New Mall" to get started</p>
          </div>
        ) : (
          malls.map(mall => (
            <div key={mall.mallId} className="mall-card">
              <div className="card-header">
                <h3>{mall.mallName}</h3>
                <span className="badge">Mall #{mall.mallId}</span>
              </div>
              <div className="card-body">
                <div className="info-row">
                  <span className="label">📍 Location:</span>
                  <span className="value">{mall.location}</span>
                </div>
                <div className="info-row">
                  <span className="label">📞 Contact:</span>
                  <span className="value">{mall.contactNumber || 'N/A'}</span>
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEditMall(mall)}
                  title="Edit mall"
                >
                  ✏️ Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteMall(mall.mallId)}
                  title="Delete mall"
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

export default MallList;
