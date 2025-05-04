import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform;

  &[data-aos] {
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.8s ease !important;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  transition: transform 0.5s ease;
  display: inline-block;
  transform: translateZ(0);

  ${FeatureCard}:hover & {
    transform: scale(1.1) rotate(5deg) translateZ(0);
  }
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
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50
    });
  }, []);
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
    <Section data-aos="fade-up">
      <Container>
        <Title 
          data-aos="fade-down" 
          data-aos-delay="100"
          data-aos-anchor-placement="center-bottom"
        >
          Why Choose Edenites Academy?
        </Title>
        
        <FeaturesGrid>
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              data-aos="flip-up"
              data-aos-delay={150 * index}
              data-aos-anchor-placement="top-center"
            >
              <FeatureIcon 
                data-aos="zoom-in" 
                data-aos-delay={300 + (index * 50)}
              >
                {feature.icon}
              </FeatureIcon>
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


