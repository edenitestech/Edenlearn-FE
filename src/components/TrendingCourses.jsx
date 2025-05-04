import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TopCourses = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
      offset: 20
    });
  }, []);

  const courses = [
    {
      id: 1,
      title: 'AWS Certified Solutions Architect',
      category: 'IT Certifications',
      instructor: 'John Doe',
      rating: 4.8,
      students: 1200,
      price: 5,
      image: '../image/AWS.png',
      isTrending: true
    },
    {
      id: 2,
      title: 'React JS Masterclass',
      category: 'Web Development',
      instructor: 'Jane Smith',
      rating: 4.9,
      students: 850,
      price: 5,
      image: '../image/React pic.webp',
      isTrending: true
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      category: 'Data Science',
      instructor: 'Mike Johnson',
      rating: 4.7,
      students: 1500,
      price: 5,
      image: '../image/Data Science.webp',
      isTrending: true
    },
    {
      id: 4,
      title: 'Leather Crafting Basics',
      category: 'Creative Arts',
      instructor: 'Adeline Kaycee',
      rating: 4.9,
      students: 450,
      price: 5,
      image: '../image/Leather Crafting.png',
      isTrending: true
    },
    {
      id: 5,
      title: 'Fashion Pattern Making',
      category: 'Fashion Design',
      instructor: 'Chiamaka Onwe',
      rating: 4.8,
      students: 380,
      price: 5,
      image: '../image/Python.webp',
      isTrending: true
    },
    {
      id: 6,
      title: 'JAMB Complete Prep',
      category: 'Exam Preparation',
      instructor: 'Edenites Academy',
      rating: 4.9,
      students: 2100,
      price: 5,
      image: '../image/Jamb prep.png',
      isTrending: true
    },
    // New course 1
    {
      id: 7,
      title: 'Python Programming Bootcamp',
      category: 'Programming',
      instructor: 'Alex Rodriguez',
      rating: 4.8,
      students: 1800,
      price: 5,
      image: '../image/Python.webp',
      isTrending: true
    },
    // New course 2
    {
      id: 8,
      title: 'Digital Marketing Mastery',
      category: 'Marketing',
      instructor: 'Sarah Williams',
      rating: 4.7,
      students: 950,
      price: 5,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZGlnaXRhbCUyMG1hcmtldGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      isTrending: true
    }
  ];

  return (
    <TopCoursesSection data-aos="fade-up">
      <Container>
        <SectionTitle 
          data-aos="fade-down" 
          data-aos-delay="100"
          data-aos-anchor-placement="center-bottom"
        >
          Top Trending Courses
        </SectionTitle>
        
        <CoursesGrid>
          {courses.map((course, index) => (
            <CourseCard 
              key={course.id}
              data-aos="zoom-in-up"
              data-aos-delay={100 + (index * 50)} // Staggered delay
              data-aos-anchor-placement="top-center"
            >
              <CourseImage>
                <img 
                  src={course.image} 
                  alt={course.title} 
                  data-aos="zoom-in"
                  data-aos-delay="300"
                />
                {course.isTrending && (
                  <TrendingBadge 
                    data-aos="fade-left"
                    data-aos-delay="500"
                  >
                    Trending
                  </TrendingBadge>
                )}
              </CourseImage>
              
              <CourseDetails>
                <CourseCategory>{course.category}</CourseCategory>
                <CourseTitle>{course.title}</CourseTitle>
                <CourseInstructor>By {course.instructor}</CourseInstructor>
                <CourseMeta>
                  <Rating>⭐ {course.rating}</Rating>
                  <Students>👥 {course.students.toLocaleString()}</Students>
                </CourseMeta>
                <CoursePrice>${course.price}</CoursePrice>
                <EnrollButton
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Enroll Now
                </EnrollButton>
              </CourseDetails>
            </CourseCard>
          ))}
        </CoursesGrid>
        
        <ViewAllLink 
          to="/courses"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          View All Courses
        </ViewAllLink>
      </Container>
    </TopCoursesSection>
  );
};

export default TopCourses;

// Styled Components
const TopCoursesSection = styled.section`
  padding: 1rem 0;
`;




const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: var(--head-color);
  margin-bottom: 1.5rem;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--primary-green);
    margin: 0.3rem auto 0;
    border-radius: 2px;
  }
`;

const CoursesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-evenly;
`;

const CourseCard = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px var(--box-shadow);
  transition: all 0.3s ease !important; /* Important to override AOS */
  display: flex;
  flex-direction: column;
  width: 240px;
  transform: translateZ(0); /* Hardware acceleration */

  &[data-aos] {
    transition: transform 0.6s ease, opacity 0.6s ease !important;
  }

  &:hover {
    transform: translateY(-5px) scale(1.02) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
`;

const CourseImage = styled.div`
  height: 120px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.5s ease;
    transform: translateZ(0);
  }

  ${CourseCard}:hover & img {
    transform: scale(1.05) translateZ(0);
  }
`;

const TrendingBadge = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--primary-green);
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: 50px;
  font-size: 0.65rem;
  font-weight: 600;
`;

const CourseDetails = styled.div`
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CourseCategory = styled.span`
  font-size: 0.7rem;
  color: var(--primary-green);
  background: rgba(17, 156, 76, 0.1);
  padding: 0.15rem 0.5rem;
  border-radius: 50px;
  margin-bottom: 0.3rem;
  align-self: flex-start;
`;

const CourseTitle = styled.h3`
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
  color: var(--head-color);
  line-height: 1.2;
`;

const CourseInstructor = styled.p`
  font-size: 0.75rem;
  color: var(--font-secondary);
  margin-bottom: 0.3rem;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
  font-size: 0.75rem;
  color: var(--font-secondary);
`;

const Rating = styled.span`
  color: var(--primary-orange);
  font-weight: 600;
`;

const Students = styled.span`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const CoursePrice = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const EnrollButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  background: var(--head-color);
  color: var(--font-color);
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: auto;
  font-size: 0.8rem;

  &:hover {
    background: #b6dac1;
    color: var(--head-color);
    transform: translateY(-1px);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const ViewAllLink = styled(Link)`
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.6rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
  background: var(--head-color);
  color: var(--font-color);
  border: none;

  &:hover {
    transform: translateY(-1px);
    color: var(--primary-green);
    box-shadow: 0.2em 0.2em 0 0 var(--head-color), inset 0.2em 0.2em 0 0 var(--head-color);
    background: var(--bg-default);
  }
`;
