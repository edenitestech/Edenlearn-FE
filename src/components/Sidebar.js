import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css'; // Optional (create if needed)

const Sidebar = () => {
  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li><Link to="/dashboard">Home</Link></li>
          <li><Link to="/dashboard/admin">Admin</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;