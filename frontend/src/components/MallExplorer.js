import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import './MallExplorer.css';

const MallExplorer = ({ onSelectMall }) => {
    const [malls, setMalls] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMalls();
    }, []);

    const fetchMalls = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/malls`);
            console.log("Fetched malls:", response.data);
            if (Array.isArray(response.data)) {
                setMalls(response.data);
            } else {
                console.error("API did not return an array", response.data);
                setMalls([]);
            }
        } catch (err) {
            console.error("Failed to fetch malls", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading Malls...</div>;

    return (
        <div className="explorer-container">
            <div className="explorer-header">
                <h2>🏙️ Mall Explorer</h2>
                <p>Select a mall to manage its shops, staff, and operations.</p>
            </div>

            <div className="malls-grid">
                {Array.isArray(malls) && malls.map(mall => (
                    <div key={mall.mallId} className="mall-card interactive" onClick={() => onSelectMall(mall)}>
                        <div className="card-top">
                            <span className="icon-large">🏢</span>
                        </div>
                        <div className="card-content">
                            <h3>{mall.mallName}</h3>
                            <p className="location">📍 {mall.location}</p>
                            <div className="meta-info">
                                <span>📞 {mall.contactNumber}</span>
                            </div>
                        </div>
                        <div className="card-action">
                            <button className="btn-enter">Manage Mall ➜</button>
                        </div>
                    </div>
                ))}
                {/* Add New Mall Card */}
                <div className="mall-card add-card" onClick={() => alert("Add Mall feature to be integrated")}>
                    <div className="card-top">
                        <span className="icon-large">➕</span>
                    </div>
                    <div className="card-content">
                        <h3>Add New Mall</h3>
                        <p>Expand your empire</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MallExplorer;
