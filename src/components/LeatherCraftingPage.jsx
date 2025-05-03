import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Hero images (leather crafting themed)
const heroImages = [
  'https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3'
];

// Category images
const categoryImages = {
  coreProducts: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?ixlib=rb-4.0.3',
  techniques: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3',
  gettingStarted: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
};

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
  background: rgba(255, 255, 255, 0.7);
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.9);
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
  background: rgba(255, 255, 255, 0.85);
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

const BrandsSection = styled.div`
  margin-top: 3rem;
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
`;

const BrandsTitle = styled.h2`
  color: var(--primary-blue);
  font-family: 'Poppins', sans-serif;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const BrandsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const BrandItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const NewBadge = styled.span`
  background: var(--primary-green);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  display: inline-block;
`;

const LeatherCraftingPage = () => {
  const [openCategories, setOpenCategories] = useState({
    coreProducts: false,
    techniques: false,
    gettingStarted: false
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
    const path = `/leather-crafting/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  const brands = [
    { name: 'Legitizer Cares', new: false },
    { name: 'Fiebings', new: false },
    { name: 'Barge', new: false },
    { name: 'Bee Natural', new: false },
    { name: 'Bickmore', new: false },
    { name: 'CRAFTPLUS', new: true },
    { name: 'PRO THREAD', new: true },
    { name: 'BURNER', new: true },
    { name: 'Awood', new: false },
    { name: 'Other Master', new: false }
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>Leather Crafting</HeroTitle>
          <HeroSubtitle>
            Master traditional leatherworking techniques with our professional certification programs
          </HeroSubtitle>
          <CtaButton>Explore Our Courses</CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          <CategorySection>
            <CategoryImage image={categoryImages.coreProducts} />
            <CategoryHeader 
              onClick={() => toggleCategory('coreProducts')}
              isOpen={openCategories.coreProducts}
            >
              <CategoryTitle>Core Products</CategoryTitle>
              {openCategories.coreProducts ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.coreProducts}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Shoe Making')}>Shoe Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sandals')}>Sandals</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Bags & Accessories')}>Bags & Accessories</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Belts')}>Belts</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Wallets')}>Wallets</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.techniques} />
            <CategoryHeader 
              onClick={() => toggleCategory('techniques')}
              isOpen={openCategories.techniques}
            >
              <CategoryTitle>Techniques</CategoryTitle>
              {openCategories.techniques ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.techniques}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Leather Tooling')}>Leather Tooling</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Stitching Methods')}>Stitching Methods</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Finishing Techniques')}>Finishing Techniques</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Leather Carving')}>Leather Carving</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Leather Stamping')}>Leather Stamping</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.gettingStarted} />
            <CategoryHeader 
              onClick={() => toggleCategory('gettingStarted')}
              isOpen={openCategories.gettingStarted}
            >
              <CategoryTitle>Getting Started</CategoryTitle>
              {openCategories.gettingStarted ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.gettingStarted}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Leather Working Tools')}>Leather Working Tools</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sewing Leather')}>Sewing Leather</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Dyeing & Finishing')}>Dyeing & Finishing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Belt Making')}>Belt Making</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Pattern Making')}>Pattern Making</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>
        </CategoriesContainer>

        {/* Brands Section */}
        <BrandsSection>
          <BrandsTitle>Featured Brands & Supplies</BrandsTitle>
          <BrandsGrid>
            {brands.map((brand, index) => (
              <BrandItem key={index}>
                {brand.name}
                {brand.new && <NewBadge>NEW</NewBadge>}
              </BrandItem>
            ))}
          </BrandsGrid>
        </BrandsSection>
      </PageContainer>
    </div>
  );
};

export default LeatherCraftingPage;