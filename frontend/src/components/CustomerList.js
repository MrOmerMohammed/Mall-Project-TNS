import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './CustomerList.css';

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phoneNumber: ''
  });

  const API_URL = `${API_BASE_URL}/customers`;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL);
      if (Array.isArray(response.data)) {
        setCustomers(response.data);
      } else {
        setCustomers([]);
        console.error("Customer API invalid response", response.data);
      }
    } catch (err) {
      setError('Failed to fetch customers. Ensure backend is running.');
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

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setFormData({ customerName: '', email: '', phoneNumber: '' });
      setShowForm(false);
      setEditingId(null);
      fetchCustomers();
    } catch (err) {
      setError('Failed to save customer');
      console.error(err);
    }
  };

  const handleEditCustomer = (customer) => {
    setFormData(customer);
    setEditingId(customer.customerId);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCustomers();
      } catch (err) {
        setError('Failed to delete customer');
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ customerName: '', email: '', phoneNumber: '' });
  };

  if (loading) return <div className="loading-spinner"><div className="spinner"></div>Loading customers...</div>;

  return (
    <div className="customer-list">
      <div className="customer-header">
        <div className="header-content">
          <h2>👥 Customers</h2>
          <p>Manage customer profiles and contact information</p>
        </div>
        <button
          className={`btn-add ${showForm ? 'active' : ''}`}
          onClick={() => !showForm ? setShowForm(true) : handleCancel()}
        >
          {showForm ? '✕ Cancel' : '➕ Add New Customer'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h3>{editingId ? '✏️ Edit Customer' : '➕ Register New Customer'}</h3>
          <form onSubmit={handleAddCustomer}>
            <div className="form-group">
              <label htmlFor="customerName">Full Name *</label>
              <input
                id="customerName"
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                required
                placeholder="e.g., John Doe"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="e.g., john@example.com"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="e.g., +1-234-567-8900"
                className="form-input"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? '💾 Update Customer' : '✅ Register Customer'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="customers-table">
        {customers.length === 0 ? (
          <div className="empty-state">
            <p>📭 No customers found</p>
            <p>Click "Add New Customer" to register a new customer</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>👤 Name</th>
                  <th>📧 Email</th>
                  <th>📞 Phone</th>
                  <th>⚙️ Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(customers) && customers.map((customer, index) => (
                  <tr key={customer.customerId} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <td className="id-cell">#{customer.customerId}</td>
                    <td className="name-cell">{customer.customerName}</td>
                    <td className="email-cell">{customer.email}</td>
                    <td className="phone-cell">{customer.phoneNumber || 'N/A'}</td>
                    <td className="actions-cell">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEditCustomer(customer)}
                        title="Edit customer"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteCustomer(customer.customerId)}
                        title="Delete customer"
                      >
                        🗑️ Delete
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
  );
}

export default CustomerList;
