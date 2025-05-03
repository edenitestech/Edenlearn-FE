import React from 'react';
import styled from 'styled-components';

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
  padding: 1rem; /* Reduced padding */
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  height: 100%; /* Ensure consistent height */
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
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
  padding: 0.3rem 0; /* Reduced padding */
  color: var(--font-primary);
  position: relative;
  padding-left: 1rem; /* Reduced padding */
  font-size: 0.9rem; /* Slightly smaller font */

  &::before {
    content: "•";
    color: var(--primary-green);
    position: absolute;
    left: 0;
  }
`;

const SeeAllButton = styled.button`
  background: transparent;
  color: var(--primary-green);
  border: 1px solid var(--primary-green);
  padding: 0.4rem 0.8rem; /* Reduced padding */
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem; /* Slightly smaller font */
  align-self: flex-start; /* Align button to left */
  margin-top: auto; /* Push button to bottom */

  &:hover {
    background: var(--primary-green);
    color: white;
  }
`;

const CertificationPrograms = () => {
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
    <Section className="certification-programs">
      <Container>
        <Title>Explore Top Skills and Certifications</Title>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard key={index}>
              <CategoryTitle>{category.title}</CategoryTitle>
              <ItemsList>
                {category.items.map((item, i) => (
                  <Item key={i}>{item}</Item>
                ))}
              </ItemsList>
              <SeeAllButton>
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