import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getEnrolledCourses } from '../../services/courseService';
import './styles/DashboardComponents.css';


const CourseProgress = () => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const enrolledCourses = await getEnrolledCourses(currentUser.uid);
        setCourses(enrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  if (loading) return <div>Loading your courses...</div>;

  return (
    <div className="dashboard-card course-progress">
      {/* Your course progress JSX */}
    </div>
  );
};

export default CourseProgress;