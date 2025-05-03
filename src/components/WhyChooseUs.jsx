import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 1rem 0;
  
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
  color: var(--head-color);
  font-size: 2.5rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--box-shadow);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  color: var(--primary-blue);
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: var(--font-secondary);
  line-height: 1.6;
`;

const WhyChooseUs = () => {
  const features = [
    {
      icon: '🎓',
      title: 'Quality Education',
      description: 'Expert-led courses designed to meet global standards.'
    },
    {
      icon: '🌍',
      title: 'Accessible Learning',
      description: 'Education for all, anywhere, anytime. We believe that learning should be accessible, affordable and enjoyable.'
    },
    {
      icon: '📈',
      title: 'Career Growth',
      description: 'Practical skills that boost professional success. We\'re dedicated to making that a reality for you.'
    }
  ];

  return (
    <Section>
      <Container>
        <Title>Why Choose Edenites Academy?</Title>
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </Container>
    </Section>
  );
};

export default WhyChooseUs;
