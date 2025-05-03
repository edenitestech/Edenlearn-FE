// OurMission.jsx (Rewritten with Styled-Components)

import React from 'react';
import styled from 'styled-components';
import MissionImage from '../assets/_MG_2880.jpg';

const Section = styled.section`
  padding: 2rem 0;
  background-color: #f9f9f9;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--head-color);
  text-align: center;

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

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 0.5rem;
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

  @media (max-width: 480px) {
    padding: 1rem;
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
`;

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 992px) {
    max-height: 350px;
  }

  @media (max-width: 768px) {
    max-height: 300px;
  }

  @media (max-width: 480px) {
    max-height: 250px;
  }
`;

const OurMission = () => {
  return (
    <Section>
      <Container>
        <Content>
          <Title>Our Mission</Title>
          <Paragraph>
            Edenites Academy empowers global learners through affordable, 
            multi-disciplinary education that blends technical skills, 
            creative arts, and academic excellence. 
            We transform students into skilled professionals and 
            innovators across IT, design, craftsmanship, and core academics.
          </Paragraph>
          <Stats>
            <StatItem>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Students Enrolled</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Holisitic Courses</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>200+</StatNumber>
              <StatLabel>Expert Instructors</StatLabel>
            </StatItem>
          </Stats>
        </Content>

        <ImageWrapper>
          <StyledImage src={MissionImage} alt="Edenites Mission" />
        </ImageWrapper>
      </Container>
    </Section>
  );
};

export default OurMission;
