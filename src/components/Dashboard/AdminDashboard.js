import React from 'react';
import AdminStats from './AdminStats';
import UserManagement from './UserManagement';
import CourseManagement from './CourseManagement';
import './styles/DashboardComponents.css';

const AdminDashboard = () => {
  return (
    
    <div className="admin-dashboard">
      <AdminStats />
      <div className="admin-sections">
        <UserManagement />
        <CourseManagement />
      </div>
    </div>
  );
};

export default AdminDashboard;