import React, { useState } from 'react';
import './Navigation.css';

function Navigation({ setCurrentPage, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setActiveTab(page);
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'malls', label: 'Malls', icon: '🏢' },
    // Shops and Items are now accessed via Malls -> Drilldown
    // { id: 'shops', label: 'Shops', icon: '🏪' }, 
    // { id: 'items', label: 'Inventory', icon: '📦' },
    { id: 'customers', label: 'Customers', icon: '👥' },
    { id: 'orders', label: 'Orders', icon: '🧾' }, // Orders might still be useful globally
    { id: 'employees', label: 'All Staff', icon: '👔' }, // Global staff list is okay for HR view
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => handleNavClick('dashboard')}>
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">Mall Admin</span>
        </div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li className="nav-item" key={item.id}>
              <button
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-footer">
        <button className="nav-link logout" onClick={onLogout}>
          <span className="icon">🚪</span>
          <span className="label">Logout</span>
        </button>
        <p>© 2026 MallProject</p>
      </div>
    </nav>
  );
}

export default Navigation;
