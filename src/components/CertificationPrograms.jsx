import React, { useEffect } from 'react';
import styled from 'styled-components';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Section = styled.section`
  padding: 1rem 0;
  background-color: var(--bg-section);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: var(--head-color);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem; /* Reduced gap between cards */

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryCard = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
  height: 100%;
  display: flex;
  flex-direction: column;
  transform: translateZ(0);
  will-change: transform;

  &[data-aos] {
    transition: transform 0.7s ease, opacity 0.7s ease !important;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02) !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryTitle = styled.h3`
  font-size: 1.1rem; /* Slightly smaller font */
  margin-bottom: 0.75rem; /* Reduced margin */
  color: var(--head-color);
  padding-bottom: 0.3rem; /* Reduced padding */
  border-bottom: 2px solid var(--primary-green);
`;

const ItemsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 1rem; /* Reduced margin */
  flex-grow: 1; /* Takes available space */
`;

const Item = styled.li`
  padding: 0.3rem 0;
  color: var(--font-primary);
  position: relative;
  padding-left: 1rem;
  font-size: 0.9rem;
  transform: translateZ(0);
  will-change: transform;

  &[data-aos] {
    transition: transform 0.6s ease, 
    opacity 0.6s ease !important;
   }
`;

const SeeAllButton = styled.button`
  background: transparent;
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.4rem 0.8rem; /* Reduced padding */
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 1s ease-in-out;
  font-size: 0.9rem; /* Slightly smaller font */
  align-self: flex-start; /* Align button to left */
  margin-top: auto; /* Push button to bottom */

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const CertificationPrograms = () => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-quad',
      once: true,
      offset: 50
    });
  }, []);
  const categories = [
    {
      title: 'Certifications by Issuer',
      items: [
        'Amazon Web Services (AWS)',
        'Six Sigma Certifications',
        'Microsoft Certifications',
        'Cisco Certifications',
        'Tableau Certifications'
      ]
    },
    {
      title: 'Web Development',
      items: [
        'JavaScript',
        'React JS',
        'Angular',
        'Java',
        'Node.js'
      ]
    },
    {
      title: 'IT Certifications',
      items: [
        'AWS Certified Cloud Practitioner',
        'AZ-900: Microsoft Azure Fundamentals',
        'AWS Certified Solutions Architect',
        'Kubernetes',
        'CompTIA Security+'
      ]
    },
    {
      title: 'Data Science',
      items: [
        'Python',
        'Machine Learning',
        'ChatGPT',
        'Deep Learning',
        'Data Visualization'
      ]
    }
  ];

  return (
    <Section className="certification-programs" data-aos="fade-up">
      <Container>
        <Title 
          data-aos="fade-down" 
          data-aos-delay="100"
          data-aos-anchor-placement="center-bottom"
        >
          Explore Top Skills and Certifications
        </Title>
        
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard 
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={150 * index}
              data-aos-anchor-placement="top-center"
            >
              <CategoryTitle>{category.title}</CategoryTitle>
              <ItemsList>
                {category.items.map((item, i) => (
                  <Item 
                    key={i}
                    data-aos="fade-right"
                    data-aos-delay={200 + (i * 50)}
                  >
                    {item}
                  </Item>
                ))}
              </ItemsList>
              <SeeAllButton
                data-aos="fade-up"
                data-aos-delay="700"
              >
                See all {category.title.split(' ')[0]}
              </SeeAllButton>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </Container>
    </Section>
  );
};

export default CertificationPrograms;
