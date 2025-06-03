// src/components/CourseDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaStar, FaUsers, FaClock, FaBook, FaCertificate } from 'react-icons/fa';
// ────────────────────────────────────────────────────────────
// All course data (mocked)
// ────────────────────────────────────────────────────────────
const allCourses = {
  'aws-certified-solutions-architect': {
    id: 'aws-solutions-architect',
    title: 'AWS Certified Solutions Architect',
    category: 'IT Certifications',
    instructor: 'Cee Jay',
    rating: 4.8,
    students: 1200,
    price: 5,
    duration: '6 weeks',
    description: 'Master AWS cloud architecture and become a certified solutions architect. Learn to design distributed systems on AWS.',
    syllabus: [
      'AWS Fundamentals',
      'Designing Resilient Architectures',
      'Define Performant Architectures',
      'Specify Secure Applications',
      'Cost Optimization'
    ],
    prerequisites: ['Basic cloud computing knowledge'],
    image: '../image.AWS.png'
  },
  'react-js-masterclass': {
    id: 'react',
    title: 'React JS Masterclass',
    category: 'Web Development',
    instructor: 'Gabby Tech',
    rating: 4.9,
    students: 850,
    price: 5,
    duration: '8 weeks',
    description: 'Become a React expert by building real-world applications with hooks, context API, and advanced patterns.',
    syllabus: [
      'React Fundamentals',
      'Hooks and Context API',
      'State Management',
      'Performance Optimization',
      'Testing React Apps'
    ],
    prerequisites: ['JavaScript basics', 'HTML/CSS'],
    image: '../image/React pic.webp'
  },
  'html-css': {
    id: 'html-css',
    title: 'HTML & CSS Fundamentals',
    category: 'Web Development',
    instructor: 'John Code',
    rating: 4.7,
    students: 1500,
    price: 5,
    duration: '4 weeks',
    description: 'Learn the building blocks of web development with hands-on projects.',
    syllabus: [
      'HTML5 Semantic Elements',
      'CSS Flexbox and Grid',
      'Responsive Design',
      'CSS Animations',
      'Accessibility'
    ],
    prerequisites: [],
    image: '../image/AWS.png'
  },
  'javascript': {
    id: 'javascript',
    title: 'JavaScript Programming',
    category: 'Web Development',
    instructor: 'Judec',
    rating: 4.8,
    students: 1800,
    price: 5,
    duration: '6 weeks',
    description: 'Master JavaScript from basics to advanced concepts with real-world projects.',
    syllabus: [
      'Variables and Data Types',
      'Functions and Scope',
      'DOM Manipulation',
      'ES6+ Features',
      'Async Programming'
    ],
    prerequisites: ['HTML/CSS basics'],
    image: '../image/JavaScript.png'
  }
};

const CourseDetailPage = () => {
  const { slug } = useParams();         // For trending courses
  const { categoryId, courseId } = useParams(); // For IT software courses
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // // Mock data – in a real app, you would fetch this from an API
  // const allCourses = {
  //   // Trending courses
  //   'aws-certified-solutions-architect': {
  //     id: 'aws-solutions-architect',
  //     title: 'AWS Certified Solutions Architect',
  //     category: 'IT Certifications',
  //     instructor: 'Cee Jay',
  //     rating: 4.8,
  //     students: 1200,
  //     price: 5,
  //     duration: '6 weeks',
  //     description: 'Master AWS cloud architecture and become a certified solutions architect. Learn to design distributed systems on AWS.',
  //     syllabus: [
  //       'AWS Fundamentals',
  //       'Designing Resilient Architectures',
  //       'Define Performant Architectures',
  //       'Specify Secure Applications',
  //       'Cost Optimization'
  //     ],
  //     prerequisites: ['Basic cloud computing knowledge'],
  //     image: '../image.AWS.png'
  //   },
  //   'react-js-masterclass': {
  //     id: 'react',
  //     title: 'React JS Masterclass',
  //     category: 'Web Development',
  //     instructor: 'Gabby Tech',
  //     rating: 4.9,
  //     students: 850,
  //     price: 5,
  //     duration: '8 weeks',
  //     description: 'Become a React expert by building real-world applications with hooks, context API, and advanced patterns.',
  //     syllabus: [
  //       'React Fundamentals',
  //       'Hooks and Context API',
  //       'State Management',
  //       'Performance Optimization',
  //       'Testing React Apps'
  //     ],
  //     prerequisites: ['JavaScript basics', 'HTML/CSS'],
  //     image: '../image/React pic.webp'
  //   },
  //   // IT Software courses
  //   'html-css': {
  //     id: 'html-css',
  //     title: 'HTML & CSS Fundamentals',
  //     category: 'Web Development',
  //     instructor: 'John Code',
  //     rating: 4.7,
  //     students: 1500,
  //     price: 5,
  //     duration: '4 weeks',
  //     description: 'Learn the building blocks of web development with hands-on projects.',
  //     syllabus: [
  //       'HTML5 Semantic Elements',
  //       'CSS Flexbox and Grid',
  //       'Responsive Design',
  //       'CSS Animations',
  //       'Accessibility'
  //     ],
  //     prerequisites: [],
  //     image: '../image/AWS.png'
  //   },
  //   'javascript': {
  //     id: 'javascript',
  //     title: 'JavaScript Programming',
  //     category: 'Web Development',
  //     instructor: 'Judec',
  //     rating: 4.8,
  //     students: 1800,
  //     price: 5,
  //     duration: '6 weeks',
  //     description: 'Master JavaScript from basics to advanced concepts with real-world projects.',
  //     syllabus: [
  //       'Variables and Data Types',
  //       'Functions and Scope',
  //       'DOM Manipulation',
  //       'ES6+ Features',
  //       'Async Programming'
  //     ],
  //     prerequisites: ['HTML/CSS basics'],
  //     image: '../image/JavaScript.png'
  //   }
  // };

  // ────────────────────────────────────────────────────────────────────────────
  // We want this effect to run when slug/categoryId/courseId/navigate changes,
  // but ESLint will warn that “allCourses” is used inside. To silence that warning,
  // we add the disable comment here:
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let courseData;

      if (slug) {
        // Handle trending courses
        courseData = allCourses[slug];
      } else if (categoryId && courseId) {
        // Handle IT software courses
        courseData = allCourses[courseId];
      }

      if (courseData) {
        setCourse(courseData);
      } else {
        // Course not found – redirect or show error
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
