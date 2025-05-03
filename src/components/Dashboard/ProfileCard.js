// import React from 'react';
// import { useAuth } from '../context/AuthContext';
// import '../styles/DashboardComponents.css';

// const ProfileCard = () => {
//   const { currentUser } = useAuth();

//   // Sample data - replace with actual API call
//   const stats = [
//     { label: "Courses Enrolled", value: 5 },
//     { label: "Courses Completed", value: 2 },
//     { label: "Certificates", value: 1 },
//     { label: "Learning Streak", value: "7 days" }
//   ];

//   return (
//     <div className="dashboard-card profile-card">
//       <div className="profile-header">
//         <div className="avatar">
//           {currentUser?.name?.charAt(0) || 'U'}
//         </div>
//         <div className="profile-info">
//           <h3>{currentUser?.name || 'Student'}</h3>
//           <p>{currentUser?.email || 'student@edenites.com'}</p>
//         </div>
//       </div>
      
//       <div className="profile-stats">
//         {stats.map((stat, index) => (
//           <div className="stat-item" key={index}>
//             <div className="stat-value">{stat.value}</div>
//             <div className="stat-label">{stat.label}</div>
//           </div>
//         ))}
//       </div>
      
//       <button className="edit-profile">Edit Profile</button>
//     </div>
//   );
// };

// export default ProfileCard;

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './styles/DashboardComponents.css';

const ProfileCard = () => {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-card profile-card">
      {/* Your profile card JSX */}
    </div>
  );
};

export default ProfileCard;