import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Hero images
const heroImages = [
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3'
];

// Styled components
const HeroSection = styled.div`
  height: 500px;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
  transition: background-image 1s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 3rem;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 4rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CtaButton = styled.button`
  background: var(--primary-green);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;

  &:hover {
    background: #2e7d32;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryImage = styled.div`
  height: 200px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const CategoryContent = styled.div`
  padding: 1.5rem;
`;

const CategoryTitle = styled.h2`
  color: var(--primary-blue);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const CategoryDescription = styled.p`
  color: var(--font-secondary);
  margin-bottom: 1.5rem;
`;

const ExploreButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--primary-blue);
  font-weight: 600;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ITSoftwarePage = () => {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const navigate = useNavigate();

  // All categories data
  const categories = [
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Professional certification programs to validate your IT skills',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
    },
    {
      id: 'development',
      title: 'Development',
      description: 'Master software development across multiple platforms and languages',
      image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3',
    },
    {
      id: 'popular_topics',
      title: 'Popular Topics',
      description: 'Cutting-edge technologies shaping the future of IT',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3',
    },
    {
      id: 'network_security',
      title: 'Network & Security',
      description: 'Secure and optimize network infrastructures',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3',
    },
    {
      id: 'hardware',
      title: 'Hardware',
      description: 'Master computer hardware and embedded systems',
      image: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
    },
    {
      id: 'operating_systems',
      title: 'Operating Systems',
      description: 'Learn system administration across platforms',
      image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3',
    }
  ];

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });
  }, []);

  // Rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage(prev => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/it-software/${categoryId}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]} data-aos="fade">
        <HeroContent>
          <HeroTitle data-aos="fade-up">IT & Software Academy</HeroTitle>
          <HeroSubtitle data-aos="fade-up" data-aos-delay="200">
            Master cutting-edge technologies with our professional programs
          </HeroSubtitle>
          <CtaButton 
            onClick={() => navigate('/it-software/courses')}
            data-aos="fade-up" 
            data-aos-delay="400"
          >
            Explore All Courses
          </CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <h2 data-aos="fade-up">Our IT & Software Categories</h2>
        <p data-aos="fade-up" data-aos-delay="100">
          Browse through our comprehensive course categories
        </p>

        <CategoriesGrid>
          {categories.map((category, index) => (
            <CategoryCard 
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={100 * (index % 3)}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CategoryImage image={category.image} />
              <CategoryContent>
                <CategoryTitle>{category.title}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
                <ExploreButton>
                  Explore Courses <FaArrowRight />
                </ExploreButton>
              </CategoryContent>
            </CategoryCard>
          ))}
        </CategoriesGrid>
      </PageContainer>
    </div>
  );
};

export default ITSoftwarePage;