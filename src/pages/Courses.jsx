import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useFetch } from '../hooks/useFetch';
import CourseCard from '../components/Dashboard/CourseCard';

const CoursesContainer = styled.div`
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  text-align: center;
  font-size: 2.25rem;
  color: var(--head-color);
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background: var(--primary-green);
    margin: 0.5rem auto 0;
    border-radius: 2px;
  }
`;

const CoursesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  justify-items: center;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: var(--font-secondary);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #e74c3c;
  font-weight: 600;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.1rem;
  color: var(--font-secondary);
`;

const Courses = () => {
  const { data: courses, loading, error } = useFetch('/api/courses', true);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <CoursesContainer>
      <PageTitle>All Courses</PageTitle>
      
      {loading ? (
        <LoadingMessage>Loading courses...</LoadingMessage>
      ) : error ? (
        <ErrorMessage>Error loading courses: {error.message}</ErrorMessage>
      ) : courses.length === 0 ? (
        <EmptyState>No courses available</EmptyState>
      ) : (
        <CoursesGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={itemVariants}
            >
              <CourseCard {...course} />
            </motion.div>
          ))}
        </CoursesGrid>
      )}
    </CoursesContainer>
  );
};

export default Courses;