// src/components/CourseDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FaArrowLeft,
  FaStar,
  FaUsers,
  FaClock,
  FaBook,
  FaCertificate
} from 'react-icons/fa';
import allCourses from '../data/mockCourses'; // imported mock data

const CourseDetailPage = () => {
  const { slug, categoryId, courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let courseData = null;

      if (slug) {
        courseData = allCourses[slug];
      } else if (categoryId && courseId) {
        courseData = allCourses[courseId];
      }

      if (courseData) {
        setCourse(courseData);
      } else {
        navigate('/courses');
      }

      setLoading(false);
    }, 500);
  }, [slug, categoryId, courseId, navigate]);

  if (loading) {
    return <LoadingContainer>Loading course details...</LoadingContainer>;
  }

  if (!course) {
    return <ErrorContainer>Course not found</ErrorContainer>;
  }

  return (
    <PageContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back to Courses
      </BackButton>

      <CourseHeader>
        <CourseCategory>{course.category}</CourseCategory>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseMeta>
          <MetaItem>
            <FaStar /> {course.rating} ({course.students.toLocaleString()} students)
          </MetaItem>
          <MetaItem>
            <FaClock /> {course.duration}
          </MetaItem>
          <MetaItem>
            <FaUsers /> Taught by {course.instructor}
          </MetaItem>
        </CourseMeta>
      </CourseHeader>

      <CourseContent>
        <MainContent>
          <CourseImage src={course.image} alt={course.title} />

          <Section>
            <SectionTitle>About This Course</SectionTitle>
            <CourseDescription>{course.description}</CourseDescription>
          </Section>

          <Section>
            <SectionTitle>What You'll Learn</SectionTitle>
            <SyllabusList>
              {course.syllabus.map((item, index) => (
                <SyllabusItem key={index}>{item}</SyllabusItem>
              ))}
            </SyllabusList>
          </Section>

          <Section>
            <SectionTitle>Prerequisites</SectionTitle>
            <PrerequisitesList>
              {course.prerequisites.length > 0 ? (
                course.prerequisites.map((item, index) => (
                  <PrerequisiteItem key={index}>{item}</PrerequisiteItem>
                ))
              ) : (
                <PrerequisiteItem>None</PrerequisiteItem>
              )}
            </PrerequisitesList>
          </Section>
        </MainContent>

        <Sidebar>
          <EnrollmentCard>
            <Price>${course.price}</Price>
            <EnrollButton onClick={() => navigate('/checkout')}>
              Enroll Now
            </EnrollButton>
            <IncludesList>
              <IncludesItem>
                <FaBook /> Full lifetime access
              </IncludesItem>
              <IncludesItem>
                <FaCertificate /> Certificate of completion
              </IncludesItem>
            </IncludesList>
          </EnrollmentCard>
        </Sidebar>
      </CourseContent>
    </PageContainer>
  );
};

// Styled Components

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: red;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: var(--primary-blue);
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  padding: 0.5rem 0;

  &:hover {
    text-decoration: underline;
  }
`;

const CourseHeader = styled.div`
  margin-bottom: 2rem;
`;

const CourseCategory = styled.span`
  display: inline-block;
  font-size: 0.9rem;
  color: var(--primary-green);
  background: rgba(17, 156, 76, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  margin-bottom: 0.8rem;
`;

const CourseTitle = styled.h1`
  font-size: 2.2rem;
  color: var(--primary-blue);
  margin-bottom: 1rem;
`;

const CourseMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: var(--font-secondary);
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
`;

const CourseContent = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 2;
`;

const Sidebar = styled.div`
  flex: 1;
`;

const CourseImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-blue);
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--primary-green);
  }
`;

const CourseDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--font-primary);
`;

const SyllabusList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding-left: 1rem;
`;

const SyllabusItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
  position: relative;

  &::before {
    content: '✓';
    color: var(--primary-green);
    position: absolute;
    left: -1rem;
  }
`;

const PrerequisitesList = styled.ul`
  padding-left: 1rem;
`;

const PrerequisiteItem = styled.li`
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;
`;

const EnrollmentCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: sticky;
  top: 1rem;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary-blue);
  margin-bottom: 1.5rem;
`;

const EnrollButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary-green);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: #2e7d32;
    transform: translateY(-2px);
  }
`;

const IncludesList = styled.ul`
  border-top: 1px solid #eee;
  padding-top: 1rem;
`;

const IncludesItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: var(--font-secondary);
`;

export default CourseDetailPage;
