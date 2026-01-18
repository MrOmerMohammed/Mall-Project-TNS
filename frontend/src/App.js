import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import MallExplorer from './components/MallExplorer';
import MallDetails from './components/MallDetails';
import ShopDetails from './components/ShopDetails';
import CustomerList from './components/CustomerList';
// We keep independent lists accessible if needed, but primary flow is Explorer
import OrderList from './components/OrderList';
import EmployeeList from './components/EmployeeList';
import Login from './components/Login';
import SystemAdminDashboard from './components/SystemAdminDashboard';
import MallAdminDashboard from './components/MallAdminDashboard';
import ShopOwnerDashboard from './components/ShopOwnerDashboard';

function App() {
  const [user, setUser] = useState(null); // Auth State
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Drill-down State
  const [selectedMall, setSelectedMall] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    // Role based redirect
    if (loggedInUser.role === 'MALL_ADMIN') {
      setCurrentPage('mall-admin-dashboard');
    } else if (loggedInUser.role === 'SHOP_OWNER') {
      setCurrentPage('shop-owner-dashboard');
    } else if (loggedInUser.role === 'SUPER_ADMIN') {
      setCurrentPage('system-admin-dashboard');
    } else {
      setCurrentPage('dashboard'); // Customer View
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setSelectedMall(null);
    setSelectedShop(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const handleMallSelect = (mall) => {
    setSelectedMall(mall);
    setSelectedShop(null);
    setCurrentPage('mall-details');
  };

  const handleShopSelect = (shop) => {
    setSelectedShop(shop);
    setCurrentPage('shop-details');
  };

  const handleBackToMalls = () => {
    setSelectedMall(null);
    setSelectedShop(null);
    setCurrentPage('malls');
  };

  const handleBackToMallDetails = () => {
    setSelectedShop(null);
    setCurrentPage('mall-details');
  };

  // Reset drill-down when using sidebar navigation
  const handleNavChange = (page) => {
    setCurrentPage(page);
    setSelectedMall(null);
    setSelectedShop(null);
  };

  return (
    <div className="App">
      <Navigation user={user} setCurrentPage={handleNavChange} onLogout={handleLogout} />
      <div className="container">

        {/* Header changes based on context */}
        <header className="app-header">
          {currentPage === 'dashboard' && (
            <>
              <h1>🛍️ Mall Management System</h1>
              <p>Overview of your entire operation</p>
            </>
          )}
          {currentPage === 'malls' && <h1>🏙️ Mall Explorer</h1>}
          {currentPage === 'customers' && <h1>👥 Customer Management</h1>}
        </header>

        {currentPage === 'dashboard' && <Dashboard setCurrentPage={handleNavChange} />}
        {currentPage === 'mall-admin-dashboard' && <MallAdminDashboard user={user} />}
        {currentPage === 'shop-owner-dashboard' && <ShopOwnerDashboard user={user} />}
        {currentPage === 'system-admin-dashboard' && <SystemAdminDashboard user={user} />}

        {/* Hierarchical Views */}
        {currentPage === 'malls' && <MallExplorer onSelectMall={handleMallSelect} />}

        {currentPage === 'mall-details' && selectedMall && (
          <MallDetails
            mall={selectedMall}
            onBack={handleBackToMalls}
            onSelectShop={handleShopSelect}
          />
        )}

        {currentPage === 'shop-details' && selectedShop && (
          <ShopDetails
            shop={selectedShop}
            onBack={handleBackToMallDetails}
          />
        )}

        {/* Global Lists (still available via Sidebar) */}
        {currentPage === 'customers' && <CustomerList />}
        {currentPage === 'orders' && <OrderList />}
        {currentPage === 'employees' && <EmployeeList />}
        {/* Note: 'shops' and 'items' global tabs might be hidden in nav or redirect to explorer */}
      </div>
    </div>
  );
}

export default App;
