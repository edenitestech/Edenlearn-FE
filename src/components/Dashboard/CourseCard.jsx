import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CourseCardContainer = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  width: 260px;
  display: flex;
  flex-direction: column;
`;

const CourseImage = styled.div`
  height: 150px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
`;

const CourseDetails = styled.div`
  padding: .5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const CourseCategory = styled.span`
  font-size: 0.75rem;
  color: var(--primary-green);
  background: rgba(17, 156, 76, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  margin-bottom: 0.25rem;
  align-self: flex-start;
`;

const CourseTitle = styled.h3`
  font-size: 1.05rem;
  margin-bottom: 0.25rem;
  color: var(--head-color);
  line-height: 1.3;
`;

const CourseInstructor = styled.p`
  font-size: 0.85rem;
  color: var(--font-secondary);
  margin-bottom: 0.75rem;
`;

const CourseMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.25rem 0;
  font-size: 0.85rem;
  color: var(--font-secondary);
`;

const Rating = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--primary-orange);
  font-weight: 600;
`;

const Students = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CoursePrice = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--head-color);
  margin: 0.5rem 0 1rem;
`;

const EnrollButton = styled.button`
  
  cursor: pointer;
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.6rem 1.2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  margin-top: .2rem;

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const CourseCard = ({ title, instructor, price, image, category, rating, students }) => {
  return (
    <CourseCardContainer
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CourseImage>
        <img src={image} alt={title} />
      </CourseImage>
      <CourseDetails>
        {category && <CourseCategory>{category}</CourseCategory>}
        <CourseTitle>{title}</CourseTitle>
        <CourseInstructor>By {instructor}</CourseInstructor>
        <CourseMeta>
          {rating && <Rating>⭐ {rating}</Rating>}
          {students && <Students>👥 {students.toLocaleString()}</Students>}
        </CourseMeta>
        <CoursePrice>$ {price}</CoursePrice>
        <EnrollButton>Enroll Now</EnrollButton>
      </CourseDetails>
    </CourseCardContainer>
  );
};

export default CourseCard;