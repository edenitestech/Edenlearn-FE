import React from 'react';
import '../styles/DashboardComponents.css';

const RecommendedCourses = () => {
  // Sample data - replace with actual API call
  const recommendedCourses = [
    {
      id: 201,
      title: "Python for Data Analysis",
      category: "Data Science",
      duration: "6 weeks",
      level: "Intermediate",
      rating: 4.7,
      image: "/images/python-data.jpg"
    },
    {
      id: 202,
      title: "React Native Mobile Development",
      category: "Mobile Development",
      duration: "8 weeks",
      level: "Advanced",
      rating: 4.5,
      image: "/images/react-native.jpg"
    },
    {
      id: 203,
      title: "Ethical Hacking Fundamentals",
      category: "Cybersecurity",
      duration: "5 weeks",
      level: "Beginner",
      rating: 4.8,
      image: "/images/ethical-hacking.jpg"
    }
  ];

  return (
    <div className="dashboard-card recommended-courses">
      <div className="card-header">
        <h3>Recommended For You</h3>
        <button className="view-all">View All</button>
      </div>
      
      <div className="recommended-grid">
        {recommendedCourses.map(course => (
          <div className="recommended-item" key={course.id}>
            <div className="course-image">
              <img src={course.image} alt={course.title} />
              <div className="course-rating">
                ⭐ {course.rating}
              </div>
            </div>
            
            <div className="course-info">
              <h4>{course.title}</h4>
              <div className="course-meta">
                <span>{course.category}</span>
                <span>{course.duration}</span>
                <span>{course.level}</span>
              </div>
              <button className="explore-btn">Explore</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;