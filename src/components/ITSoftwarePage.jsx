import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Hero images (IT-themed, rotating every 10 seconds)
const heroImages = [
  'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3'
];

// Category images mapping
const categoryImages = {
  certifications: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
  development: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-4.0.3',
  popularTopics: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3',
  networkSecurity: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3',
  hardware: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3',
  operatingSystems: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-4.0.3'
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

const ITSoftwarePage = () => {
  const [openCategories, setOpenCategories] = useState({
    certifications: false,
    development: false,
    popularTopics: false,
    networkSecurity: false,
    hardware: false,
    operatingSystems: false
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
    const path = `/it-software/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  return (
    <div 
    data-aos="zoom-in-left" 
    data-aos-anchor-placement="top-center"
    data-aos-duration="800"
      >
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroContent>
          <HeroTitle>IT & Software Academy</HeroTitle>
          <HeroSubtitle>
            Master cutting-edge technologies with our professional certification programs
          </HeroSubtitle>
          <CtaButton>Explore Our Courses</CtaButton>
        </HeroContent>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          <CategorySection>
            <CategoryImage image={categoryImages.certifications} />
            <CategoryHeader 
              onClick={() => toggleCategory('certifications')}
              isOpen={openCategories.certifications}
            >
              <CategoryTitle>Certifications</CategoryTitle>
              {openCategories.certifications ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.certifications}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('AWS Certified Solutions Architect')}>AWS Certified Solutions Architect</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Microsoft Certified: Azure Administrator')}>Microsoft Certified: Azure Administrator</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Google Professional Cloud Architect')}>Google Professional Cloud Architect</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Cisco CCNA')}>Cisco CCNA</TopicItem>
                <TopicItem onClick={() => handleTopicClick('CompTIA Security+')}>CompTIA Security+</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.development} />
            <CategoryHeader 
              onClick={() => toggleCategory('development')}
              isOpen={openCategories.development}
            >
              <CategoryTitle>Development</CategoryTitle>
              {openCategories.development ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.development}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Web Development')}>Web Development (HTML, CSS, JavaScript)</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Mobile App Development')}>Mobile App Development</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Python Programming')}>Python Programming</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Game Development')}>Game Development</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Database Design')}>Database Design</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.popularTopics} />
            <CategoryHeader 
              onClick={() => toggleCategory('popularTopics')}
              isOpen={openCategories.popularTopics}
            >
              <CategoryTitle>Popular Topics</CategoryTitle>
              {openCategories.popularTopics ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.popularTopics}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Machine Learning Fundamentals')}>Machine Learning Fundamentals</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Blockchain Basics')}>Blockchain Basics</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Cybersecurity Essentials')}>Cybersecurity Essentials</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Cloud Computing')}>Cloud Computing</TopicItem>
                <TopicItem onClick={() => handleTopicClick('DevOps Practices')}>DevOps Practices</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.networkSecurity} />
            <CategoryHeader 
              onClick={() => toggleCategory('networkSecurity')}
              isOpen={openCategories.networkSecurity}
            >
              <CategoryTitle>Network & Security</CategoryTitle>
              {openCategories.networkSecurity ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.networkSecurity}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Network Fundamentals')}>Network Fundamentals</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Ethical Hacking')}>Ethical Hacking</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Firewall Configuration')}>Firewall Configuration</TopicItem>
                <TopicItem onClick={() => handleTopicClick('VPN Technologies')}>VPN Technologies</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Penetration Testing')}>Penetration Testing</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.hardware} />
            <CategoryHeader 
              onClick={() => toggleCategory('hardware')}
              isOpen={openCategories.hardware}
            >
              <CategoryTitle>Hardware</CategoryTitle>
              {openCategories.hardware ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.hardware}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Computer Assembly')}>Computer Assembly</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Hardware Troubleshooting')}>Hardware Troubleshooting</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Embedded Systems')}>Embedded Systems</TopicItem>
                <TopicItem onClick={() => handleTopicClick('IoT Devices')}>IoT Devices</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Server Hardware')}>Server Hardware</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.operatingSystems} />
            <CategoryHeader 
              onClick={() => toggleCategory('operatingSystems')}
              isOpen={openCategories.operatingSystems}
            >
              <CategoryTitle>Operating Systems</CategoryTitle>
              {openCategories.operatingSystems ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.operatingSystems}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Windows Administration')}>Windows Administration</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Linux Command Line')}>Linux Command Line</TopicItem>
                <TopicItem onClick={() => handleTopicClick('macOS for Developers')}>macOS for Developers</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Virtualization Technologies')}>Virtualization Technologies</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Containerization with Docker')}>Containerization with Docker</TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>
        </CategoriesContainer>
      </PageContainer>
    </div>
  );
};

export default ITSoftwarePage;