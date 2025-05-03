import React from 'react';
import './styles/DashboardComponents.css';

const AdminStats = ({ stats }) => {
  // Default stats if none provided
  const defaultStats = {
    totalUsers: 1243,
    activeUsers: 892,
    courses: 56,
    enrollments: 3456,
    revenue: "$24,589"
  };

  const displayStats = stats || defaultStats;

  return (
    <div className="dashboard-card admin-stats">
      <div className="card-header">
        <h3>Platform Overview</h3>
        <select className="time-filter">
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value">{displayStats.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{displayStats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <div className="stat-value">{displayStats.courses}</div>
            <div className="stat-label">Courses</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-content">
            <div className="stat-value">{displayStats.enrollments}</div>
            <div className="stat-label">Enrollments</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <div className="stat-value">{displayStats.revenue}</div>
            <div className="stat-label">Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;