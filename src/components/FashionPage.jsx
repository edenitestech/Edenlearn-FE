import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Hero images (fashion-themed, rotating every 10 seconds)
const heroImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3'
];

// Category images mapping
const categoryImages = {
  coreSkills: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3',
  specializations: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3',
  fashionBusiness: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3',
  textileTechnology: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-4.0.3',
  fashionIllustration: 'https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3',
  patternMaking: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3'
};

// https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-4.0.3
// https://images.unsplash.com/photo-1583744946564-b52d01e2da64?ixlib=rb-4.0.3
// https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

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
  font-family: 'Poppins', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 1rem;
  animation: ${fadeIn} 1.5s ease-out;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  color: white;
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1.5s ease-out 0.3s both;

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
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  animation: ${fadeIn} 1.5s ease-out 0.6s both;

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
  font-family: 'Poppins', sans-serif;
`;

const CategoriesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const CategorySection = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 0;
  overflow: hidden;
  position: relative;
  min-height: 400px;
`;

const CategoryImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  z-index: 1;
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  position: relative;
  z-index: 3;
  background:rgb(255, 255, 255);
  transition: background 0.3s ease;

  &:hover {
    background:rgb(255, 255, 255);
  }
`;

const CategoryTitle = styled.h2`
  color: var(--primary-blue);
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  margin: 0;
`;

const CategoryContent = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  animation: ${props => props.isOpen ? slideIn : 'none'} 0.5s ease forwards;
  position: relative;
  z-index: 2;
  background:rgb(255, 255, 255);
  padding: 1rem;
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TopicItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  color: var(--font-primary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;

  &:hover {
    color: var(--primary-blue);
    background-color: rgba(0, 123, 255, 0.05);
    padding-left: 5px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const FashionDesignPage = () => {
  const [openCategories, setOpenCategories] = useState({
    coreSkills: false,
    specializations: false,
    fashionBusiness: false,
    textileTechnology: false,
    fashionIllustration: false,
    patternMaking: false
  });

  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const navigate = useNavigate();

  // Rotate hero images every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const toggleCategory = (category) => {
    setOpenCategories(prev => ({
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = false; // Close all other categories
        return acc;
      }, {}),
      [category]: !prev[category] // Toggle current category
    }));
  };

  const handleTopicClick = (topic) => {
    const path = `/fashion-design/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>Fashion Design Academy</HeroTitle>
          <HeroSubtitle>
            Master the art of fashion with our 2-year certification program. 
            Learn, create, and launch your fashion career.
          </HeroSubtitle>
          <CtaButton>Explore Our Programs</CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          <CategorySection>
            <CategoryImage image={categoryImages.coreSkills} />
            <CategoryHeader 
              onClick={() => toggleCategory('coreSkills')}
              isOpen={openCategories.coreSkills}
            >
              <CategoryTitle>Core Skills</CategoryTitle>
              {openCategories.coreSkills ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.coreSkills}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Sketching and Illustration')}>Sketching and Illustration</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Fabric Selection')}>Fabric Selection</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Color Theory')}>Color Theory</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sewing Techniques')}>Sewing Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Draping')}>Draping</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.specializations} />
            <CategoryHeader 
              onClick={() => toggleCategory('specializations')}
              isOpen={openCategories.specializations}
            >
              <CategoryTitle>Specializations</CategoryTitle>
              {openCategories.specializations ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.specializations}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Haute Couture')}>Haute Couture</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Ready-to-Wear')}>Ready-to-Wear</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Bridal Wear')}>Bridal Wear</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Childrenswear')}>Childrenswear</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sustainable Fashion')}>Sustainable Fashion</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.fashionBusiness} />
            <CategoryHeader 
              onClick={() => toggleCategory('fashionBusiness')}
              isOpen={openCategories.fashionBusiness}
            >
              <CategoryTitle>Fashion Business</CategoryTitle>
              {openCategories.fashionBusiness ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.fashionBusiness}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Brand Development')}>Brand Development</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Fashion Marketing')}>Fashion Marketing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Retail Management')}>Retail Management</TopicItem>
                <TopicItem onClick={() => handleTopicClick('E-commerce Strategies')}>E-commerce Strategies</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Fashion Show Production')}>Fashion Show Production</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.textileTechnology} />
            <CategoryHeader 
              onClick={() => toggleCategory('textileTechnology')}
              isOpen={openCategories.textileTechnology}
            >
              <CategoryTitle>Textile Technology</CategoryTitle>
              {openCategories.textileTechnology ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.textileTechnology}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Fabric Construction')}>Fabric Construction</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Dyeing Techniques')}>Dyeing Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Digital Textile Printing')}>Digital Textile Printing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Smart Textiles')}>Smart Textiles</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sustainable Materials')}>Sustainable Materials</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.fashionIllustration} />
            <CategoryHeader 
              onClick={() => toggleCategory('fashionIllustration')}
              isOpen={openCategories.fashionIllustration}
            >
              <CategoryTitle>Fashion Illustration</CategoryTitle>
              {openCategories.fashionIllustration ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.fashionIllustration}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Technical Drawing')}>Technical Drawing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Digital Illustration')}>Digital Illustration</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Fashion Croquis')}>Fashion Croquis</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Rendering Techniques')}>Rendering Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Portfolio Development')}>Portfolio Development</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.patternMaking} />
            <CategoryHeader 
              onClick={() => toggleCategory('patternMaking')}
              isOpen={openCategories.patternMaking}
            >
              <CategoryTitle>Pattern Making</CategoryTitle>
              {openCategories.patternMaking ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.patternMaking}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Flat Pattern Making')}>Flat Pattern Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Draping on Dress Form')}>Draping on Dress Form</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Grading Techniques')}>Grading Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Digital Pattern Making')}>Digital Pattern Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Fit Adjustments')}>Fit Adjustments</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>
        </CategoriesContainer>
      </PageContainer>
    </div>
  );
};

export default FashionDesignPage;