// HeroSection.jsx (Refactored using Styled-Components)

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import heroImage from '../assets/Hero-image copy.png';

const HeroSectionWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: var(--bg-section);
  padding: 1rem;
  width: 100%;

  @media (max-width: 480px) {
    padding: 1.5rem;
    min-height: auto;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 4rem;
  justify-content: space-between;

  @media (max-width: 992px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroText = styled.div`
  flex: 1;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    order: 1;
  }
`;

const Heading1 = styled.h1`
  font-size: clamp(3rem, 5vw, 3.5rem);
  margin-bottom: 1.5rem;
  color: var(--head-color);
  line-height: 1.2;
  font-style: italic;
  letter-spacing: .35rem;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
`;

const Heading2 = styled.h2`
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: 1.5rem;
  color: var(--primary-blue);
  font-weight: 400;
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-bottom: 2rem;
  color: var(--font-secondary);
  line-height: 1.6;
`;

const HeroImage = styled.div`
  flex: 1;
  max-width: 500px;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 992px) {
    img {
      max-height: 400px;
    }
  }

  @media (max-width: 768px) {
    order: 2;
    max-width: 100%;
    img {
      max-height: 350px;
    }
  }

  @media (max-width: 480px) {
    img {
      max-height: 300px;
    }
  }
`;

const HeroCTA = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const CTAButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  width: ${props => props.fullwidth ? '100%' : 'auto'};

  background: ${props => props.variant === 'primary' ? 'var(--head-color)' : 'var(--font-color)'};
  color: ${props => props.variant === 'primary' ? 'var(--font-color)' : 'var(--head-color)'};
  border: ${props => props.variant === 'secondary' ? '1px solid var(--head-color)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    transition: 2s;
    ${props => props.variant === 'primary' && `
      color: var(--primary-green);
      box-shadow: 0.3em 0.3em 0 0 var(--head-color), inset 0.3em 0.3em 0 0 var(--head-color);
      background: var(--bg-default);
    `}
    ${props => props.variant === 'secondary' && `
      background-color: var(--head-color);
      box-shadow: inset 0 -3.25em 0 0 var(--head-color);
      color: var(--font-color);
    `}
  }
`;

const HeroSection = () => {
  return (
    <HeroSectionWrapper>
      <HeroContent>
        <HeroText>
          <Heading1 data-aos="zoom-in">Edenites Academy</Heading1>
          <Heading2>Explore. | Learn. | Succeed.</Heading2>
          <Paragraph>Explore our courses and start learning today!</Paragraph>
          <HeroCTA>
            <CTAButton to="/login?form=signup" variant="primary">Start 7-day Free Trial</CTAButton>
            <CTAButton to="/courses" variant="secondary">Explore Courses</CTAButton>
          </HeroCTA>
        </HeroText>
        <HeroImage>
          <img src={heroImage} alt="Learning at Edenites" />
        </HeroImage>
      </HeroContent>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
