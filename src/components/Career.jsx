// src/pages/CareersPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components
const CareersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;
`;

const HeroSlider = styled.section`
  position: relative;
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 300px;
  }
`;

const Slide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.active ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: overlay;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  color: white;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    font-size: .85rem;
  }
`;

const SlideIndicators = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  z-index: 3;
`;

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255,255,255,0.5)'};
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: var(--head-color);
  margin: 1rem 0 2rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const CareerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const CareerCard = styled.div`
  position: relative;
  background: #fffdf5; /* Scroll-like parchment color */
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e0e0d1;
  transition: 0.3s;
  text-align: left;
  box-shadow: inset 0 0 5px #e0e0d1, 0 5px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-green);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  /* Scroll unfurl effect - top-right curl */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 60px;
    background: radial-gradient(circle at top right, #fffdf5 30%, #e0e0d1 70%);
    border-bottom-left-radius: 50px;
    box-shadow: -3px 3px 6px rgba(0,0,0,0.1);
    transform: rotate(0deg);
    z-index: 1;
  }
`;

const CareerTitle = styled.h3`
  color: var(--head-color);
  margin-bottom: 0.5rem;
`;

const CareerMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--font-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const ApplyButton = styled(Link)`
  display: inline-block;
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const BenefitsSection = styled.section`
  background: var(--font-color);
  padding: 2rem;
  border-radius: 8px;
  margin: 4rem 0;
`;

const BenefitList = styled.ul`
  columns: 2;
  list-style: none;
  padding: 0;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    columns: 1;
  }
`;

const BenefitItem = styled.li`
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.5rem;

  &::before {
    content: "✨";
    position: absolute;
    left: 0;
    color: var(--primary-green);
  }
`;

// Sample Data
const careerOpportunities = [
  { id: 1, title: "IT Instructor", type: "Full-time", location: "Remote", department: "Technology Education" },
  { id: 2, title: "Fashion Design Tutor", type: "Part-time", location: "Lagos", department: "Creative Arts" },
  { id: 3, title: "Leather Crafting Expert", type: "Contract", location: "Abuja", department: "Vocational Training" },
  { id: 4, title: "STEM Curriculum Developer", type: "Full-time", location: "Remote", department: "Academic Programs" },
  { id: 5, title: "Student Success Advisor", type: "Full-time", location: "Remote", department: "Student Services" },
  { id: 6, title: "E-Learning Specialist", type: "Contract", location: "Remote", department: "Technology" },
];

const benefits = [
  "Competitive compensation packages",
  "Flexible work arrangements",
  "Professional development opportunities",
  "Creative work environment",
  "Impactful work transforming education",
  "Health and wellness benefits",
  "Collaborative team culture",
  "Access to all academy courses",
];

// Slider Images and Content
const slides = [
  {
    id: 1,
    title: "Shape the Future of Education",
    text: "Join our team of passionate educators and industry experts",
    background: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    title: "Innovative Learning Environment",
    text: "Work with cutting-edge technologies and creative teaching methods",
    background: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    title: "Grow With Us",
    text: "Professional development and career advancement opportunities",
    background: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    title: "Make a Difference",
    text: "Help students achieve their dreams through quality education",
    background: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];

// Main Component
const CareersPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <CareersContainer>
      <HeroSlider>
        {slides.map((slide, index) => (
          <Slide 
            key={slide.id}
            active={index === currentSlide}
            style={{ backgroundImage: `url(${slide.background})` }}
          >
            <SlideContent>
              <HeroTitle>{slide.title}</HeroTitle>
              <HeroText>{slide.text}</HeroText>
              <ApplyButton to="/careers/apply">Explore Careers</ApplyButton>
            </SlideContent>
          </Slide>
        ))}
        <SlideIndicators>
          {slides.map((_, index) => (
            <Indicator 
              key={index}
              active={index === currentSlide}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </SlideIndicators>
      </HeroSlider>

      <SectionTitle>Current Opportunities</SectionTitle>
      <CareerGrid>
        {careerOpportunities.map((job) => (
          <CareerCard key={job.id}>
            <CareerTitle>{job.title}</CareerTitle>
            <CareerMeta>
              <span>{job.type}</span>
              <span>{job.location}</span>
            </CareerMeta>
            <p style={{ color: 'var(--font-secondary)' }}>{job.department}</p>
            <ApplyButton to={`/careers/apply/${job.id}`}>Apply Now</ApplyButton>
          </CareerCard>
        ))}
      </CareerGrid>

      <BenefitsSection>
        <SectionTitle>Why Join Our Team?</SectionTitle>
        <BenefitList>
          {benefits.map((benefit, index) => (
            <BenefitItem key={index}>{benefit}</BenefitItem>
          ))}
        </BenefitList>
      </BenefitsSection>

      <section style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3 style={{ color: 'var(--head-color)', marginBottom: '1rem' }}>Can't find your perfect role?</h3>
        <p style={{ marginBottom: '1.5rem' }}>We're always looking for talented individuals to join our team.</p>
        <ApplyButton to="/careers/contact">Contact Our HR Team</ApplyButton>
      </section>
    </CareersContainer>
  );
};

export default CareersPage;