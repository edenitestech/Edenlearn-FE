import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FaLaptopCode, FaTshirt, FaTools, FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurProducts = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize AOS only once (this can be moved to App.js if using globally)
    AOS.init({
      duration: 600,
      once: true,        // Animations only happen once
      mirror: false,     // Don't animate elements again when scrolling back up
      offset: 120,       // Animation starts 120px from bottom of viewport
      anchorPlacement: 'top-bottom' // Animation starts when top of element hits bottom of viewport
    });
  }, []);

  const products = [
    {
      icon: <FaLaptopCode />,
      title: 'IT and Software',
      description: 'Master cutting-edge technologies with our expert-led courses in programming and software development.',
      path: '/it-software'
    },
    {
      icon: <FaTshirt />,
      title: 'Fashion Design',
      description: 'Unleash your creativity with comprehensive fashion design courses from basics to advanced techniques.',
      path: '/fashion-design'
    },
    {
      icon: <FaTools />,
      title: 'Leather Crafting',
      description: 'Learn the art of leather crafting with hands-on training from skilled artisans.',
      path: '/leather-crafting'
    },
    {
      icon: <FaBook />,
      title: 'CBT Exams',
      description: 'Prepare for WAEC, NECO, and JAMB with our comprehensive computer-based test preparation courses.',
      path: '/cbt-exams'
    }
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <Section id="our-products">
      <Container>
        <Title data-aos="fade-down" data-aos-delay="100">
          Our Learning Programs
        </Title>
        <ProductsGrid>
          {products.map((product, index) => (
            <ProductCard 
              key={index}
              onClick={() => handleCardClick(product.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(product.path)}
              data-aos="fade-up"
              data-aos-delay={100 + (index * 100)} // Staggered delays
            >
              <ProductIcon>{product.icon}</ProductIcon>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
            </ProductCard>
          ))}
        </ProductsGrid>
      </Container>
    </Section>
  );
};

// Styled components (unchanged from your original)
const Section = styled.section`
  padding: 2rem 0;
  background-color: var(--bg-light);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: var(--head-color);
  font-size: 2.5rem;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--box-shadow);
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  transform: translateZ(0); /* Hardware acceleration */

  &:hover {
    transform: translateY(-5px) translateZ(0);
    box-shadow: 0 8px 25px #1c233a;
  }
`;

const ProductIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-blue);
`;

const ProductTitle = styled.h3`
  color: var(--primary-blue);
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: var(--font-secondary);
  line-height: 1.4;
  font-size: 0.9rem;
`;

export default OurProducts;