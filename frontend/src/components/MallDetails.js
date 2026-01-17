import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './MallDetails.css';

const MallDetails = ({ mall, onBack, onSelectShop }) => {
    const [shops, setShops] = useState([]);
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMallData();
    }, [mall]);

    const fetchMallData = async () => {
        try {
            // Fetch shops linked to this mall. Assuming backend has search by mallId.
            // If not, we might need to fetch all and filter, or add backend endpoint.
            // Checking ShopRepository... it has findByMallId might work if exposed.
            // Let's assume standard /shops endpoint gives all and we filter, 
            // OR better, we use the OneToMany link if exposed in mall object. 
            // But typically we fetch fresh.
            const shopsRes = await axios.get(`${API_BASE_URL}/shops`);
            setShops(shopsRes.data.filter(s => s.mall && s.mall.mallId === mall.mallId));

            // Fetch Mall Admin
            // MallAdminController has get by id. Maybe search by mall?
            // Assuming 1-to-1, maybe we can get it. 
            // Or we just show "No Admin Assigned" for now if not easily fetchable by mallId.
            // Actually Mall entity has `mallAdmin` field. If we fetched mall, we might have it.
            if (mall.mallAdmin) {
                setAdmin(mall.mallAdmin);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mall-details-container">
            <button className="btn-back" onClick={onBack}>← Back to Malls</button>

            <div className="hero-section">
                <div className="hero-content">
                    <h1>{mall.mallName}</h1>
                    <p className="location-badge">📍 {mall.location}</p>
                </div>
                <div className="admin-card">
                    <div className="admin-avatar">👤</div>
                    <div className="admin-info">
                        <small>Mall Admin</small>
                        <strong>{admin ? admin.adminName : "No Admin Assigned"}</strong>
                    </div>
                </div>
            </div>

            <div className="shops-section">
                <div className="section-header">
                    <h2>🏪 Shops in {mall.mallName}</h2>
                    <button className="btn-add-shop" onClick={() => alert("Add Shop to Mall feature")}>+ Add Shop</button>
                </div>

                {loading ? <p>Loading Shops...</p> : (
                    <div className="shops-grid-mini">
                        {shops.length === 0 ? <p className="empty-msg">No shops opened yet.</p> : (
                            shops.map(shop => (
                                <div key={shop.shopId} className="shop-card-mini" onClick={() => onSelectShop(shop)}>
                                    <div className="status-dot" style={{ background: shop.status === 'Open' ? '#10b981' : '#ef4444' }}></div>
                                    <h3>{shop.shopName}</h3>
                                    <p>{shop.shopType}</p>
                                    <span className="arrow-link">Manage ➜</span>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MallDetails;
