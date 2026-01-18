import React, { useState } from 'react';
import './Navigation.css';

function Navigation({ user, setCurrentPage, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setActiveTab(page);
  };

  // Define menus per role
  const getNavItems = () => {
    const role = user ? user.role : 'GUEST';

    if (role === 'SHOP_OWNER') {
      return [
        { id: 'shop-owner-dashboard', label: 'My Shop', icon: '🏪' },
        { id: 'items', label: 'Inventory', icon: '📦' },
        { id: 'orders', label: 'Orders', icon: '🧾' },
        { id: 'employees', label: 'My Staff', icon: '👔' },
      ];
    } else if (role === 'MALL_ADMIN') {
      return [
        { id: 'mall-admin-dashboard', label: 'My Mall', icon: '🏢' },
        { id: 'employees', label: 'Mall Staff', icon: '👔' },
        { id: 'customers', label: 'Customers', icon: '👥' }, // Mall level customers?
        // Maybe a way to view Shops inside dash?
      ];
    } else if (role === 'SUPER_ADMIN') {
      return [
        { id: 'system-admin-dashboard', label: 'System Overview', icon: '🌐' },
        { id: 'malls', label: 'All Malls', icon: '🏙️' },
      ];
    } else {
      // Customer or Guest (Original Default)
      return [
        { id: 'dashboard', label: 'Home', icon: '🏠' },
        { id: 'malls', label: 'Explore Malls', icon: '🏙️' },
        { id: 'orders', label: 'My Orders', icon: '🛍️' },
      ];
    }
  };

  const navItems = getNavItems();

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
