import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './Dashboard.css';

const SystemAdminDashboard = ({ user }) => {
    // --- State ---
    const [activeTab, setActiveTab] = useState('malls');
    const [malls, setMalls] = useState([]);
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // --- Modal State ---
    // 'create', 'edit', 'assign'
    const [modalMode, setModalMode] = useState(null);
    const [modalType, setModalType] = useState(null); // 'MALL' or 'SHOP'

    // --- Data ---
    const [formData, setFormData] = useState({});
    const [targetEntity, setTargetEntity] = useState(null); // For edit/assign (stores ID or full object)

    useEffect(() => {
        fetchGlobalData();
    }, []);

    const fetchGlobalData = async () => {
        try {
            const [mallsRes, shopsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/malls`),
                axios.get(`${API_BASE_URL}/shops`)
            ]);
            setMalls(Array.isArray(mallsRes.data) ? mallsRes.data : []);
            setShops(Array.isArray(shopsRes.data) ? shopsRes.data : []);
        } catch (err) {
            console.error("API Fetch Error");
        } finally {
            setLoading(false);
        }
    };

    // --- Helpers ---
    const openModal = (mode, type, entity = null) => {
        setModalMode(mode);
        setModalType(type);
        setTargetEntity(entity);
        setFormData(entity ? { ...entity } : {}); // Pre-fill if editing
    };

    const closeModal = () => {
        setModalMode(null);
        setModalType(null);
        setTargetEntity(null);
        setFormData({});
    };

    const isFormValid = () => {
        if (modalMode === 'create' || modalMode === 'edit') {
            if (modalType === 'MALL') return formData.mallName && formData.location;
            if (modalType === 'SHOP') return formData.shopName && formData.shopType;
        }
        if (modalMode === 'assign') {
            return formData.username && formData.password && (modalType === 'MALL' ? formData.adminName : formData.ownerName);
        }
        return false;
    };

    // --- API Interactions ---

    // 1. Create & Update
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint = modalType === 'MALL' ? '/malls' : '/shops';
            let payload = { ...formData };
            if (modalType === 'SHOP') payload.status = payload.status || "Open";

            if (modalMode === 'create') {
                await axios.post(`${API_BASE_URL}${endpoint}`, payload);
                alert(`${modalType} Created Successfully!`);
            } else if (modalMode === 'edit') {
                let id = modalType === 'MALL' ? targetEntity.mallId : targetEntity.shopId;
                await axios.put(`${API_BASE_URL}${endpoint}/${id}`, payload);
                alert(`${modalType} Updated Successfully!`);
            }

            closeModal();
            fetchGlobalData();
        } catch (err) {
            alert(`Operation Failed: ${err.message}`);
        }
    };

    // 2. Assign User
    const handleAssignUser = async (e) => {
        e.preventDefault();
        try {
            const endpoint = modalType === 'MALL' ? '/register/mall-admin' : '/register/shop-owner';
            const payload = modalType === 'MALL'
                ? { ...formData, existingMallId: targetEntity.mallId }
                : { ...formData, existingShopId: targetEntity.shopId };

            await axios.post(`${API_BASE_URL}${endpoint}`, payload);
            closeModal();
            fetchGlobalData();
            alert("User Assigned Successfully!");
        } catch (err) { alert("Assignment Failed. Username taken?"); }
    };

    // 3. Delete
    const handleDelete = async (type, id) => {
        if (!window.confirm(`⚠️ Are you sure you want to delete this ${type}? \n\nALL associated data (shops, orders, admins) will be wiped instantly.`)) return;
        try {
            await axios.delete(`${API_BASE_URL}/${type.toLowerCase()}s/${id}`);
            fetchGlobalData();
        } catch (e) {
            console.error("Delete Error:", e);
            alert(`Delete failed: ${e.response?.data?.message || e.message || "Unknown Error"}`);
        }
    };


    // --- Filtering ---
    const filteredMalls = malls.filter(mall =>
        (mall.mallName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (mall.location?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );
    const filteredShops = shops.filter(shop =>
        (shop.shopName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (shop.shopType?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="dashboard-container"><h2 style={{ color: 'var(--accent-primary)' }}>Loading System...</h2></div>;

    return (
        <div className="dashboard-container">
            {/* Header */}
            <div className="system-header">
                <div className="header-title">
                    <h1>System Command</h1>
                    <p>Platform Administration • v3.0</p>
                </div>
                <div className="header-actions">
                    <button className="btn-primary" onClick={() => openModal('create', activeTab === 'malls' ? 'MALL' : 'SHOP')}>
                        + Add {activeTab === 'malls' ? 'Mall' : 'Shop'}
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-row">
                <div className="stat-card">
                    <div className="stat-icon">🏙️</div>
                    <div><div className="stat-value">{malls.length}</div><div className="stat-label">Active Malls</div></div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon">🏪</div>
                    <div><div className="stat-value">{shops.length}</div><div className="stat-label">Active Shops</div></div>
                </div>
            </div>

            {/* Controls */}
            <div className="controls-row">
                <div className="tabs-container">
                    <button className={`nav-tab ${activeTab === 'malls' ? 'active' : ''}`} onClick={() => setActiveTab('malls')}>Mall Registry</button>
                    <button className={`nav-tab ${activeTab === 'shops' ? 'active' : ''}`} onClick={() => setActiveTab('shops')}>Shop Registry</button>
                </div>
                <input className="search-bar" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>

            {/* Table Area */}
            <div className="data-container">
                {activeTab === 'malls' ? (
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Mall Name</th>
                                <th>Location</th>
                                <th>Admin</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMalls.map(mall => (
                                <tr key={mall.mallId}>
                                    <td>#{mall.mallId}</td>
                                    <td className="data-highlight">{mall.mallName}</td>
                                    <td>{mall.location}</td>
                                    <td>
                                        {mall.mallAdmin ?
                                            <span className="badge badge-green">👤 {mall.mallAdmin.adminName}</span> :
                                            <span className="badge badge-red">Unassigned</span>
                                        }
                                    </td>
                                    <td>
                                        <button className="btn-primary btn-sm btn-secondary" onClick={() => openModal('edit', 'MALL', mall)}>✏️ Edit</button>
                                        {!mall.mallAdmin && <button className="btn-primary btn-sm" onClick={() => openModal('assign', 'MALL', mall)}>👤 Assign</button>}
                                        <button className="btn-primary btn-sm btn-danger" onClick={() => handleDelete('Mall', mall.mallId)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Shop Name</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Owner</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredShops.map(shop => (
                                <tr key={shop.shopId}>
                                    <td>#{shop.shopId}</td>
                                    <td className="data-highlight">{shop.shopName}</td>
                                    <td><span className="badge badge-purple">{shop.shopType}</span></td>
                                    <td>{shop.mall ? shop.mall.mallName : <span className="badge badge-red">No Mall</span>}</td>
                                    <td>
                                        {shop.shopOwner ?
                                            <span className="badge badge-green">👤 {shop.shopOwner.ownerName}</span> :
                                            <span className="badge badge-red">Unassigned</span>
                                        }
                                    </td>
                                    <td>
                                        <button className="btn-primary btn-sm btn-secondary" onClick={() => openModal('edit', 'SHOP', shop)}>✏️ Edit</button>
                                        {!shop.shopOwner && <button className="btn-primary btn-sm" onClick={() => openModal('assign', 'SHOP', shop)}>👤 Assign</button>}
                                        <button className="btn-primary btn-sm btn-danger" onClick={() => handleDelete('Shop', shop.shopId)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* --- UNIFIED MODAL --- */}
            {modalMode && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="system-header" style={{ marginBottom: '1.5rem', borderBottom: 'none', paddingBottom: 0 }}>
                            <h2>{modalMode === 'create' ? 'Add New' : modalMode === 'edit' ? 'Update' : 'Assign User to'} {modalType}</h2>
                            <span className="close-btn" onClick={closeModal} style={{ fontSize: '1.5rem', cursor: 'pointer' }}>&times;</span>
                        </div>

                        <form onSubmit={modalMode === 'assign' ? handleAssignUser : handleSubmit}>

                            {/* REGISTER MALL/SHOP FORM */}
                            {(modalMode === 'create' || modalMode === 'edit') && modalType === 'MALL' && (
                                <>
                                    <div className="form-group"><label>Mall Name</label><input className="form-input" required value={formData.mallName || ''} onChange={e => setFormData({ ...formData, mallName: e.target.value })} /></div>
                                    <div className="form-group"><label>Location</label><input className="form-input" required value={formData.location || ''} onChange={e => setFormData({ ...formData, location: e.target.value })} /></div>
                                    <div className="form-group"><label>Contact</label><input className="form-input" value={formData.contactNumber || ''} onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} /></div>
                                </>
                            )}

                            {(modalMode === 'create' || modalMode === 'edit') && modalType === 'SHOP' && (
                                <>
                                    <div className="form-group"><label>Shop Name</label><input className="form-input" required value={formData.shopName || ''} onChange={e => setFormData({ ...formData, shopName: e.target.value })} /></div>
                                    <div className="form-group"><label>Category</label>
                                        <select className="form-input" required value={formData.shopType || ''} onChange={e => setFormData({ ...formData, shopType: e.target.value })}>
                                            <option value="" disabled>Select...</option>
                                            <option value="General">General</option><option value="Fashion">Fashion</option><option value="Electronics">Electronics</option><option value="Food">Food</option>
                                        </select>
                                    </div>
                                    {/* Add Mall Select for Shop Create if needed? Excluded for simplicity/User flow */}
                                </>
                            )}

                            {/* ASSIGN USER FORM */}
                            {modalMode === 'assign' && (
                                <>
                                    <div className="form-group"><label>Username</label><input className="form-input" required onChange={e => setFormData({ ...formData, username: e.target.value })} /></div>
                                    <div className="form-group"><label>Password</label><input className="form-input" type="password" required onChange={e => setFormData({ ...formData, password: e.target.value })} /></div>
                                    {modalType === 'MALL' ? (
                                        <><div className="form-group"><label>Admin Name</label><input className="form-input" required onChange={e => setFormData({ ...formData, adminName: e.target.value })} /></div>
                                            <div className="form-group"><label>Email</label><input className="form-input" required onChange={e => setFormData({ ...formData, email: e.target.value })} /></div></>
                                    ) : (
                                        <><div className="form-group"><label>Owner Name</label><input className="form-input" required onChange={e => setFormData({ ...formData, ownerName: e.target.value })} /></div>
                                            <div className="form-group"><label>Contact</label><input className="form-input" required onChange={e => setFormData({ ...formData, contactNumber: e.target.value })} /></div></>
                                    )}
                                </>
                            )}

                            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn-primary" disabled={!isFormValid()}>{modalMode === 'edit' ? 'Update Changes' : 'Confirm Action'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};
export default SystemAdminDashboard;
