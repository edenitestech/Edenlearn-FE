import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;
`;

const Header = styled.header`
  
  text-align: center;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--head-color);
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
  font-style: italic;
`;

const Subtitle = styled.p`

  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--font-secondary);
  max-width: 800px;
  margin: 0 auto;

  @media (max-width: 480px) {
    font-size: .85rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: var(--primary-green);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid var(--bg-section);
  padding-bottom: 0.5rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const BenefitCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const BenefitTitle = styled.h3`
  color: var(--head-color);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "✓";
    color: var(--primary-green);
    font-weight: bold;
  }
`;

const DomainsList = styled.ul`
  columns: 2;
  column-gap: 2rem;
  margin: 1rem 0;
  list-style: none;
  padding: 0;

  @media (max-width: 768px) {
    columns: 1;
  }
`;

const DomainItem = styled.li`
  margin-bottom: 0.8rem;
  font-weight: 500;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: "•";
    color: var(--head-color);
    font-size: 1.5rem;
    position: absolute;
    left: 0;
    top: -0.2rem;
  }
`;

const StepsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
`;

const StepCard = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StepNumber = styled.div`
  width: 40px;
  height: 40px;
  background: var(--head-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-weight: bold;
`;

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const MiniForm = styled.form`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const CTAWrapper = styled.div`
  text-align: center;
  margin: 3rem 0;
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
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: var(--head-color);
  color: white;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--primary-green);
    transform: translateY(-2px);
  }
`;

const Quote = styled.blockquote`
  font-style: italic;
  color: #666;
  text-align: center;
  margin: 2rem 0;
  padding: 1rem;
  border-left: 4px solid var(--head-color);
  background: #f9f9f9;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-weight: bold;
  background-color: var(--bg-section);
  padding: 2rem;
  border-radius: 8px;
`;

// React component
const TeachWithUs = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`\u2705 Thank you ${formData.fullName}, we will contact you soon!`);
    setFormData({ fullName: '', email: '' });
  };

  return (
    <Container>
      <Header>
        <Title>Teach with Edenites</Title>
        <Subtitle>
          Share your knowledge with millions of learners worldwide and join our community of expert instructors.
          Empower the next generation while building your personal brand and earning income.
        </Subtitle>
      </Header>

      <Section>
        <SectionTitle>Why Teach With Us?</SectionTitle>
        <BenefitsGrid>
          <BenefitCard>
            <BenefitTitle>Reach a Global Audience</BenefitTitle>
            <p>Teach students from around the world who are eager to learn from industry experts like you.</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitTitle>Flexible Teaching</BenefitTitle>
            <p>Create courses on your schedule and at your own pace - we handle the platform and marketing.</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitTitle>Monetize Your Expertise</BenefitTitle>
            <p>Earn revenue through our competitive instructor compensation model while doing what you love.</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitTitle>Support & Resources</BenefitTitle>
            <p>Get guidance on course creation, student engagement, and growing your audience.</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitTitle>Build Your Brand</BenefitTitle>
            <p>Establish yourself as an authority in your field with our professional platform.</p>
          </BenefitCard>
          <BenefitCard>
            <BenefitTitle>Community Support</BenefitTitle>
            <p>Connect with other instructors through our exclusive forums and networking events.</p>
          </BenefitCard>
        </BenefitsGrid>
      </Section>

      <Section>
        <SectionTitle>What We're Looking For</SectionTitle>
        <p>We welcome instructors in various domains, including:</p>
        <DomainsList>
          <DomainItem>Technology & Programming (AI, Web Dev, Data Science)</DomainItem>
          <DomainItem>Business & Entrepreneurship</DomainItem>
          <DomainItem>Creative Arts & Design</DomainItem>
          <DomainItem>Personal Development & Leadership</DomainItem>
          <DomainItem>Languages & Communication</DomainItem>
          <DomainItem>Science & Mathematics</DomainItem>
          <DomainItem>Health & Wellness</DomainItem>
          <DomainItem>Professional Certifications</DomainItem>
        </DomainsList>
      </Section>

      <Section>
        <SectionTitle>How to Get Started</SectionTitle>
        <StepsContainer>
          <StepCard>
            <StepNumber>1</StepNumber>
            <h3>Submit Your Application</h3>
            <p>Tell us about your expertise and teaching experience.</p>
          </StepCard>
          <StepCard>
            <StepNumber>2</StepNumber>
            <h3>Create Your Course</h3>
            <p>Follow our guidelines to design engaging, high-quality content.</p>
          </StepCard>
          <StepCard>
            <StepNumber>3</StepNumber>
            <h3>Publish & Teach</h3>
            <p>Launch your course and connect with learners.</p>
          </StepCard>
          <StepCard>
            <StepNumber>4</StepNumber>
            <h3>Grow With Us</h3>
            <p>Get feedback, refine your content, and expand your reach.</p>
          </StepCard>
        </StepsContainer>
      </Section>

      <Section>
        <SectionTitle>Ready to Get Started?</SectionTitle>
        <p>Fill out this quick form and we will reach out to you!</p>
        <FormContainer>
          <MiniForm onSubmit={handleSubmit}>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
            />
            <SubmitButton type="submit">Apply Now</SubmitButton>
          </MiniForm>
        </FormContainer>
      </Section>

      <Quote>
        "Teaching is the greatest act of optimism." — Colleen Wilcox
      </Quote>

      <CTAWrapper>
        <PrimaryButton to="/careers" variant="primary">Apply to Teach</PrimaryButton>
        <SecondaryButton to="/instructor-guidelines" variant="secondary">Instructor's Guidelines</SecondaryButton>
      </CTAWrapper>

      <Footer>
        Edenites Academy — Empowering Minds, One Course at a Time.<br />
        Have questions? Contact us at <strong>teach@edenites.com</strong>
      </Footer>
    </Container>
  );
};

export default TeachWithUs;