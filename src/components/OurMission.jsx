import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MissionImage from '../assets/_MG_2880.jpg';

const OurMission = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: false,
      offset: 100
    });
  }, []);
  

  return (
    <Section>
      <Container>
        <Content 
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <Title data-aos="fade-down" data-aos-delay="100">
            Our Mission
          </Title>
          
          <Paragraph data-aos="fade-right" data-aos-delay="300">
            Edenites Academy empowers global learners through affordable, 
            multi-disciplinary education that blends technical skills, 
            creative arts, and academic excellence. 
            We transform students into skilled professionals and 
            innovators across IT, design, craftsmanship, and core academics.
          </Paragraph>
          
          <Stats>
            <StatItem data-aos="zoom-in" data-aos-delay="400">
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Students Enrolled</StatLabel>
            </StatItem>
            
            <StatItem data-aos="zoom-in" data-aos-delay="500">
              <StatNumber>500+</StatNumber>
              <StatLabel>Holistic Courses</StatLabel>
            </StatItem>
            
            <StatItem data-aos="zoom-in" data-aos-delay="600">
              <StatNumber>200+</StatNumber>
              <StatLabel>Expert Instructors</StatLabel>
            </StatItem>
          </Stats>
        </Content>

        <ImageWrapper 
          data-aos="fade-left"
          data-aos-delay="400"
          data-aos-duration="1000"
        >
          <StyledImage 
            src={MissionImage} 
            alt="Edenites Mission" 
          />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

const Section = styled.section`
  padding: 2rem 0;
  background-color: #f9f9f9;
  overflow: hidden;
`;


const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 892px) {
    flex-direction: column;
    gap: 2rem;
  }
`;


const Content = styled.div`
  flex: 1;
  width: 100%;
  transform: translateZ(0);
  will-change: transform;

  &[data-aos="fade-right"] {
    transform: translateX(-50px);
    opacity: 0;
    transition-property: transform, opacity;
  }

  &[data-aos="fade-right"].aos-animate {
    transform: translateX(0);
    opacity: 1;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--head-color);
  text-align: center;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--font-primary);
  margin-bottom: 2rem;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  word-break: break-word;
  overflow-wrap: break-word;
  transform: translateZ(0);
  will-change: transform;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  &[data-aos] {
    transition: transform 0.8s ease, opacity 0.8s ease !important;
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--box-shadow);
  min-width: 0;
  transform: translateZ(0);
  will-change: transform;
  transition: all 0.4s ease !important;

  @media (max-width: 480px) {
    padding: 1rem;
  }

  &[data-aos] {
    transition: transform 0.8s ease, opacity 0.8s ease !important;
  }

  &:hover {
    transform: translateY(-5px) scale(1.03) !important;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const StatNumber = styled.span`
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const StatLabel = styled.span`
  font-size: 0.9rem;
  color: var(--font-secondary);
  word-break: break-word;

  @media (max-width: 480px) {
    font-size: 0.6rem;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
  transform: translateZ(0);
  will-change: transform;

  &[data-aos="fade-left"] {
    transform: translateX(50px);
    opacity: 0;
    transition-property: transform, opacity;
  }

  &[data-aos="fade-left"].aos-animate {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  transform: translateZ(0);
  will-change: transform;
  transition: transform 0.5s ease;

  @media (max-width: 992px) {
    max-height: 350px;
  }

  @media (max-width: 768px) {
    max-height: 300px;
  }

  @media (max-width: 480px) {
    max-height: 250px;
  }

  ${ImageWrapper}:hover & {
    cursor: pointer;
    transform: scale(1.03);
  }
`;

export default OurMission;


