import React from 'react';
import './styles/DashboardComponents.css';

const UpcomingCourses = () => {
  // Sample data - replace with actual API call
  const upcomingCourses = [
    {
      id: 101,
      title: "Advanced Machine Learning",
      startDate: "June 15, 2024",
      instructor: "Dr. Sarah Johnson",
      image: "/images/ml-advanced.jpg"
    },
    {
      id: 102,
      title: "Cloud Computing Basics",
      startDate: "June 20, 2024",
      instructor: "Prof. Michael Chen",
      image: "/images/cloud-computing.jpg"
    }
  ];

  return (
    <div className="dashboard-card upcoming-courses">
      <div className="card-header">
        <h3>Upcoming Courses</h3>
      </div>
      
      <div className="upcoming-list">
        {upcomingCourses.map(course => (
          <div className="upcoming-item" key={course.id}>
            <div className="upcoming-image">
              <img src={course.image} alt={course.title} />
            </div>
            
            <div className="upcoming-details">
              <h4>{course.title}</h4>
              <p className="instructor">By {course.instructor}</p>
              <p className="start-date">Starts: {course.startDate}</p>
              <button className="enroll-btn">Enroll Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingCourses;