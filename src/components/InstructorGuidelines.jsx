import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: var(--head-color);
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #6b7280;
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--head-color);
  margin-bottom: 0.8rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #374151;
  line-height: 1.7;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 2rem;
  color: #374151;

`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: "✨";
    position: absolute;
    left: 0;
    color: var(--primary-green);
  }
`;

const EarningsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const EarningCard = styled.div`
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid var(--head-color);

  h3 {
    color: var(--head-color);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.95rem;
    color: #555;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 1rem;
  background: var(--head-color);
  color: var(--font-color);
  border: none;

  &:hover {
    transform: translateY(-2px);
    color: var(--primary-green);
    box-shadow: 0.3em 0.3em 0 0 var(--head-color), inset 0.3em 0.3em 0 0 var(--head-color);
    background: var(--bg-default);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: clamp(0.875rem, 2vw, 1rem);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 1rem;
  
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);

  &:hover {
    transform: translateY(-2px);
    background-color: var(--head-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
    color: var(--font-color);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

// Component
const InstructorGuidelines = () => {
  return (
    <Container>
      <Header>
        <h1>Become an Instructor</h1>
        <p>Share your knowledge and earn money teaching what you love</p>
      </Header>

      <Section>
        <SectionTitle>Who Can Teach?</SectionTitle>
        <Text>
          We welcome passionate, qualified instructors who are committed to delivering high-quality educational content. 
          Whether you’re an experienced teacher or a skilled professional, we would love to work with you.
        </Text>
      </Section>

      <Section>
        <SectionTitle>Expectations</SectionTitle>
        <List>
          <ListItem>Prepare engaging, clear, and well-structured lessons.</ListItem>
          <ListItem>Communicate concepts in a simple and understandable way.</ListItem>
          <ListItem>Submit lesson plans and materials on time.</ListItem>
          <ListItem>Provide assignments and practice exercises where necessary.</ListItem>
          <ListItem>Maintain professionalism and respect toward all students.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Course Requirements</SectionTitle>
        <Text>Every course must have:</Text>
        <List>
          <ListItem>A well-outlined syllabus.</ListItem>
          <ListItem>Short video or text-based lessons (if applicable).</ListItem>
          <ListItem>Assessment methods (quizzes, projects, or tests).</ListItem>
          <ListItem>Support for students' questions and clarifications.</ListItem>
        </List>
      </Section>

      {/* Earnings Section */}
      <Section>
        <SectionTitle>Instructor's Earnings</SectionTitle>
        <Text>Earn a percentage of course sales and grow your passive income!</Text>

        <EarningsGrid>
          <EarningCard>
            <h3>Revenue Share</h3>
            <p>Earn up to 70% commission on each course sold.</p>
          </EarningCard>
          <EarningCard>
            <h3>Passive Income</h3>
            <p>Keep earning from your courses long after they’re published.</p>
          </EarningCard>
          <EarningCard>
            <h3>Bonuses & Incentives</h3>
            <p>Access special bonuses for top-performing instructors.</p>
          </EarningCard>
        </EarningsGrid>
      </Section>

      <Section>
        <SectionTitle>How to Apply</SectionTitle>
        <Text>
          If you are interested, please fill out the Instructor Application Form or contact us at <strong>edenitestech@gmail.com</strong>.
        </Text>
      </Section>

      {/* CTA Buttons */}
      <CTAButtons>
        <PrimaryButton to="/apply">Apply Now</PrimaryButton>
        <SecondaryButton to="/courses">Browse Courses</SecondaryButton>
      </CTAButtons>

    </Container>
  );
};

export default InstructorGuidelines;
