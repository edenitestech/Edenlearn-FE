import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown, FaChevronUp, FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Hero images (rotating every 10 seconds)
const heroImages = [
  'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3'
];

// Category images
const categoryImages = {
  examPrep: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV4YW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
  teachingAcademics: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVhY2hlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
};

// Animation for heading
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

// Styled components
const HeroSection = styled.div`
  height: 400px;
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
    background: rgba(0, 0, 0, 0.4);
  }
`;

const HeroTitle = styled.h1`
  color: white;
  font-size: 4rem;
  font-family: 'Poppins', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
  animation: ${fadeIn} 1.5s ease-out;
  text-align: center;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Open Sans', sans-serif;
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
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryImage = styled.div`
  height: 150px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1.5rem;
  padding-bottom: ${({ isOpen }) => (isOpen ? '1rem' : '1.5rem')};
  background: white;
`;

const CategoryTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  font-family: 'Poppins', sans-serif;
  margin: 0;
`;

const CategoryContent = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 0 1.5rem 1.5rem;
`;

const TopicList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TopicItem = styled.li`
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  color: #34495e;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    color: #3498db;
    background-color: rgba(52, 152, 219, 0.05);
    padding-left: 5px;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const DownloadBadge = styled.span`
  background: #27ae60;
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const AppPromoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const AppCard = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const AppImage = styled.div`
  height: 150px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const AppContent = styled.div`
  padding: 1.5rem;
`;

const AppTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const AppDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.5;
`;

const DownloadButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
  width: 100%;

  &:hover {
    background: #2980b9;
  }
`;

const CBTExamsPage = () => {
  const [openCategories, setOpenCategories] = useState({
    examPrep: true,
    teachingAcademics: true
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
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleTopicClick = (topic) => {
    const path = `/exams/${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    navigate(path);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection image={heroImages[currentHeroImage]}>
        <HeroTitle>Exam Preparation</HeroTitle>
      </HeroSection>

      <PageContainer>
        <CategoriesContainer>
          <CategorySection>
            <CategoryImage image={categoryImages.examPrep} />
            <CategoryHeader 
              onClick={() => toggleCategory('examPrep')}
              isOpen={openCategories.examPrep}
            >
              <CategoryTitle>Exam Preparation</CategoryTitle>
              {openCategories.examPrep ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.examPrep}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('jamb')}>
                  JAMB Prep
                  <DownloadBadge>
                    <FaDownload size={12} /> Popular
                  </DownloadBadge>
                </TopicItem>
                <TopicItem onClick={() => handleTopicClick('waec')}>
                  WAEC Prep
                  <DownloadBadge>
                    <FaDownload size={12} /> New
                  </DownloadBadge>
                </TopicItem>
                <TopicItem onClick={() => handleTopicClick('neco')}>
                  NECO Prep
                  <DownloadBadge>
                    <FaDownload size={12} /> Updated
                  </DownloadBadge>
                </TopicItem>
                <TopicItem onClick={() => handleTopicClick('Post-UTME')}>
                  Post-UTME
                </TopicItem>
                <TopicItem onClick={() => handleTopicClick('Common Entrance')}>
                  Common Entrance
                </TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>

          <CategorySection>
            <CategoryImage image={categoryImages.teachingAcademics} />
            <CategoryHeader 
              onClick={() => toggleCategory('teachingAcademics')}
              isOpen={openCategories.teachingAcademics}
            >
              <CategoryTitle>Teaching & Academics</CategoryTitle>
              {openCategories.teachingAcademics ? <FaChevronUp /> : <FaChevronDown />}
            </CategoryHeader>
            <CategoryContent isOpen={openCategories.teachingAcademics}>
              <TopicList>
                <TopicItem onClick={() => handleTopicClick('Mathematics')}>Mathematics</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Sciences')}>Sciences</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Humanities')}>Humanities</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Language Learning')}>Language Learning</TopicItem>
                <TopicItem onClick={() => handleTopicClick('Teacher Training')}>
                  Teacher Training
                  <DownloadBadge>
                    <FaDownload size={12} /> New
                  </DownloadBadge>
                </TopicItem>
              </TopicList>
            </CategoryContent>
          </CategorySection>
        </CategoriesContainer>

        {/* App Promo Section */}
        <AppPromoSection>
          <AppCard>
            <AppImage image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2FlY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
            <AppContent>
              <AppTitle>WAEC Offline Past Questions</AppTitle>
              <AppDescription>
                With all answers & explanations in one app. Study 100% offline with objective and theory questions.
              </AppDescription>
              <DownloadButton>
                <FaDownload /> Download for free
              </DownloadButton>
            </AppContent>
          </AppCard>

          <AppCard>
            <AppImage image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV4YW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
            <AppContent>
              <AppTitle>JAMB CBT Software 2025</AppTitle>
              <AppDescription>
                All past questions, study materials & tools for candidates, schools, centers, and resellers.
              </AppDescription>
              <DownloadButton>
                <FaDownload /> Download Now, It's Free!
              </DownloadButton>
            </AppContent>
          </AppCard>
        </AppPromoSection>
      </PageContainer>
    </div>
  );
};

export default CBTExamsPage;