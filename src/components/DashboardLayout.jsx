import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import '../styles/DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-container">
        <Sidebar />
        <main className="dashboard-content">
          <Outlet /> {/* This will render the nested routes */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;