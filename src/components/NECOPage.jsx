import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Hero = styled.section`
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  text-align: center;

  h1 {
    font-size: 3rem;
    color: var(--head-color);
    margin-bottom: 1rem;
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 2rem;
    }

    @media (max-width: 480px) {
      font-size: 1.4rem;
    }
  }

  p {
    font-size: 1.2rem;
    color: var(--font-secondary);
    max-width: 700px;
    margin: 0 auto;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 500px;
  margin: 2rem auto;
  display: block;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 1px solid var(--head-color);
  border-radius: 4px;
  outline: none;

  &:focus {
    border-color: var(--primary-green);
    box-shadow: 0 0 5px rgba(0, 128, 0, 0.3);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const Card = styled.div`
  position: relative;
  background: #fffdf5;
  padding: 2rem;
  color: var(--head-color);
  border-radius: 8px;
  border: 1px solid #e0e0d1;
  transition: 0.3s;
  text-align: left;
  box-shadow: inset 0 0 5px #e0e0d1, 0 5px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-green);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 60px;
    background: radial-gradient(circle at top right, #fffdf5 30%, #e0e0d1 70%);
    border-bottom-left-radius: 50px;
    box-shadow: -3px 3px 6px rgba(0, 0, 0, 0.1);
    transform: rotate(0deg);
    z-index: 1;
  }
`;

const StartButton = styled(Link)`
  display: inline-block;
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const NECOPrepPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects] = useState([
    { name: 'Mathematics', topics: 31 },
    { name: 'English Language', topics: 35 },
    { name: 'Civic Education', topics: 20 },
    { name: 'Physics', topics: 29 },
    { name: 'Chemistry', topics: 27 },
    { name: 'Biology', topics: 37 },
    { name: 'Agricultural Science', topics: 24 },
    { name: 'Further Mathematics', topics: 22 },
    { name: 'Health Science', topics: 18 },
    { name: 'Technical Drawing', topics: 16 },
    { name: 'Computer Studies', topics: 20 },
    { name: 'Economics', topics: 26 },
    { name: 'Commerce', topics: 21 },
    { name: 'Financial Accounting', topics: 23 },
    { name: 'Marketing', topics: 17 },
    { name: 'Office Practice', topics: 15 },
    { name: 'Business Methods', topics: 14 },
    { name: 'Bookkeeping', topics: 12 },
    { name: 'Government', topics: 26 },
    { name: 'Literature-in-English', topics: 23 },
    { name: 'Christian Religious Studies', topics: 19 },
    { name: 'Islamic Religious Studies', topics: 18 },
    { name: 'History', topics: 16 },
    { name: 'Visual Arts', topics: 14 },
    { name: 'Music', topics: 13 },
    { name: 'French', topics: 14 },
    { name: 'Yoruba', topics: 17 },
    { name: 'Igbo', topics: 17 },
    { name: 'Hausa', topics: 17 },
    { name: 'Catering Craft Practice', topics: 18 },
    { name: 'Data Processing', topics: 20 },
    { name: 'Animal Husbandry', topics: 16 },
    { name: 'Garment Making', topics: 14 },
    { name: 'GSM Phone Maintenance', topics: 12 },
  ]);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Hero>
        <h1>NECO Prep Page</h1>
        <p>Get ready for NECO with our comprehensive subject resources and practice questions.</p>
      </Hero>

      <SearchBar
        type="text"
        placeholder="Search by subject or category (e.g., science, arts)..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <Grid>
        {filteredSubjects.map((subject, index) => (
          <Card key={index}>
            <h3>{subject.name}</h3>
            <p>{subject.topics} topics available</p>
            <StartButton to={`/neco/subjects/${subject.name.toLowerCase().replace(/ /g, '-')}`}>
              Start Practice
            </StartButton>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default NECOPrepPage;
