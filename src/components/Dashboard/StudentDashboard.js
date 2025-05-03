import React from 'react';
import CourseProgress from './CourseProgress';
import UpcomingCourses from './UpcomingCourses';
import RecommendedCourses from './RecommendedCourses';
import ProfileCard from './ProfileCard';
import SuccessStories from './SuccessStories';
import './styles/studentDashboard.css';


const StudentDashboard = () => {
  return (
    <div className="student-dashboard">
      <div className="dashboard-grid">
        <div className="main-content">
          <CourseProgress />
          <RecommendedCourses />
          <SuccessStories />
        </div>
        
        <div className="sidebar">
          <ProfileCard />
          <UpcomingCourses />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;