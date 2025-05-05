
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Styled Components with refined color scheme
const JAMBContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background: #f8fafc;
`;

const HeroSection = styled.section`
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  text-align: center;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  color: var(--head-color);
  margin-bottom: 1rem;
  letter-spacing: 0.05rem;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.2rem;
  color: var(--font-secondary);
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 480px) {
    font-size: .85rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.7rem 1.3rem;
  border: none;
  border-radius: 6px;
  background: ${props => props.active ? '#036d35' : '#e2f5ea'};
  color: ${props => props.active ? 'white' : '#036d35'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    background: ${props => props.active ? '#028a3f' : '#d0ebda'};
    transform: translateY(-1px);
  }
`;

const TabContent = styled.div`
  background: white;
  padding: 2rem;
  color: var(--head-color);
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
`;

const SubjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.2rem;
  margin: 1.5rem 0;
`;

const SubjectCard = styled.div`
  position: relative;
  background: #fffdf5; /* Scroll-like parchment color */
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #e0e0d1;
  transition: 0.3s;
  text-align: left;
  box-shadow: inset 0 0 5px #e0e0d1, 0 5px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    border-color: var(--primary-green);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.45);
  }

  /* Scroll unfurl effect - top-right curl */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 120px;
    height: 60px;
    background: radial-gradient(circle at top right, #fffdf5 30%, #e0e0d1 70%);
    border-bottom-left-radius: 50px;
    box-shadow: -3px 3px 6px rgba(0,0,0,0.1);
    transform: rotate(0deg);
    z-index: 1;
  }

  h3 {
    color: #036d35;
    margin-bottom: 0.5rem;
  }

  p {
    color: #4b5563;
    font-size: 0.9rem;
    margin: 0.3rem 0;
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

const StrategyCard = styled.div`
  background: white;
  padding: 1.2rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border-left: 3px solid #10b981;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);

  h3 {
    color: #036d35;
    margin-bottom: 0.5rem;
  }

  ul {
    padding-left: 1.2rem;
    li {
      margin-bottom: 0.3rem;
      color: #4b5563;
    }
  }
`;

const CountdownTimer = styled.div`
  background: #036d35;
  color: white;
  padding: 1.2rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }

  div {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const PracticeQuestionWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PracticeQuestionContainer = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin: 1.5rem 0;
  width: 100%;
  max-width: 550px;
`;

const OptionButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.7rem;
  margin: 0.4rem 0;
  background: ${props => 
    props.showAnswer && props.correct ? '#10b981' : 
    props.showAnswer && props.selected && !props.correct ? '#ef4444' : 
    props.selected ? '#e2f5ea' : 'white'};
  color: ${props => 
    (props.showAnswer && props.correct) || 
    (props.showAnswer && props.selected && !props.correct) ? 'white' : '#1f2937'};
  border: 1px solid ${props => 
    props.showAnswer && props.correct ? '#10b981' : 
    props.showAnswer && props.selected && !props.correct ? '#ef4444' : 
    props.selected ? '#10b981' : '#e5e7eb'};
  border-radius: 5px;
  text-align: left;
  cursor: ${props => props.showAnswer ? 'default' : 'pointer'};
  transition: all 0.2s ease;
  font-size: 0.9rem;

  &:hover {
    border-color: ${props => !props.showAnswer && '#10b981'};
  }
`;

const ActionButton = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-right: 0.8rem;
  font-size: 0.9rem;
  background: ${props => props.primary ? '#036d35' : '#e2f5ea'};
  color: ${props => props.primary ? 'white' : '#036d35'};

  &:hover {
    background: ${props => props.primary ? '#028a3f' : '#d0ebda'};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const JAMBPage = () => {
  // Tabs state
  const [activeTab, setActiveTab] = useState('subjects');
  
  // All JAMB subjects
  const subjects = [
    { name: 'English Language', topics: 30, duration: '45 hours' },
    { name: 'Mathematics', topics: 25, duration: '40 hours' },
    { name: 'Biology', topics: 32, duration: '55 hours' },
    { name: 'Chemistry', topics: 26, duration: '48 hours' },
    { name: 'Physics', topics: 28, duration: '50 hours' },
    { name: 'Literature in English', topics: 18, duration: '33 hours' },
    { name: 'Government', topics: 23, duration: '35 hours' },
    { name: 'Economics', topics: 22, duration: '38 hours' },
    { name: 'Geography', topics: 16, duration: '34 hours' },
    { name: 'Christian Religious Studies (CRS)', topics: 33, duration: '52 hours' },
    { name: 'Islamic Religious Studies (IRS)', topics: 33, duration: '52 hours' },
    { name: 'Agricultural Science', topics: 24, duration: '42 hours' },
    { name: 'Commerce', topics: 41, duration: '32 hours' },
    { name: 'Principles of Accounts', topics: 20, duration: '36 hours' },
    { name: 'History', topics: 19, duration: '34 hours' },
    { name: 'Fine Arts', topics: 15, duration: '30 hours' },
    { name: 'French', topics: 17, duration: '30 hours' },
    { name: 'Arabic', topics: 20, duration: '30 hours' },
    { name: 'Igbo', topics: 18, duration: '28 hours' },
    { name: 'Yoruba', topics: 18, duration: '28 hours' },
    { name: 'Hausa', topics: 18, duration: '28 hours' },
    { name: 'Music', topics: 14, duration: '25 hours' },
    { name: 'Home Economics', topics: 20, duration: '33 hours' }
  ];
  

  // Practice questions data (same as your provided array)
  const allPracticeQuestions = [
    {
      question: "Which of the following is not a property of metals?",
      options: [
        "High melting point",
        "Malleability",
        "Low density",
        "Good conductivity"
      ],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "What is the derivative of x³?",
      options: [
        "3x²",
        "2x³",
        "3x",
        "x²"
      ],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "Who is the author of 'Things Fall Apart'?",
      options: [
        "Wole Soyinka",
        "Chinua Achebe",
        "Chimamanda Adichie",
        "Ben Okri"
      ],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Which organelle is called the powerhouse of the cell?",
      options: [
        "Nucleus",
        "Mitochondria",
        "Ribosome",
        "Endoplasmic reticulum"
      ],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "What is the capital of Nigeria?",
      options: [
        "Lagos",
        "Abuja",
        "Kano",
        "Port Harcourt"
      ],
      correctAnswer: 1,
      subject: "Geography"
    },
    {
      question: "What tense is the verb in the sentence: 'He has finished his work'?",
      options: ["Simple past", "Present perfect", "Past perfect", "Present continuous"],
      correctAnswer: 1,
      subject: "English"
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Solve for x: 2x - 5 = 11",
      options: ["3", "8", "6", "7"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "What is the SI unit of force?",
      options: ["Pascal", "Newton", "Joule", "Watt"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "In Literature, what is a 'protagonist'?",
      options: ["The villain", "The side character", "The main character", "The narrator"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "The largest organ in the human body is the?",
      options: ["Liver", "Skin", "Heart", "Lung"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Who was the first President of Nigeria?",
      options: ["Nnamdi Azikiwe", "Tafawa Balewa", "Obafemi Awolowo", "Yakubu Gowon"],
      correctAnswer: 0,
      subject: "Government"
    },
    {
      question: "Demand curve usually slopes?",
      options: ["Upward", "Downward", "Vertically", "Horizontally"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "Which river is the longest in Africa?",
      options: ["Niger", "Zambezi", "Nile", "Congo"],
      correctAnswer: 2,
      subject: "Geography"
    },
    {
      question: "Which book in the Bible tells the story of Moses leading Israelites out of Egypt?",
      options: ["Genesis", "Exodus", "Leviticus", "Numbers"],
      correctAnswer: 1,
      subject: "CRK"
    },
    {
      question: "An atom of an element contains 17 protons. What is the element?",
      options: ["Sodium", "Chlorine", "Potassium", "Calcium"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Find the value of (2³ × 2²).",
      options: ["2⁵", "2⁶", "2⁷", "2⁴"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["10 m/s²", "9.8 m/s²", "9.0 m/s²", "8.5 m/s²"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which poetic device compares two things using 'like' or 'as'?",
      options: ["Metaphor", "Personification", "Simile", "Hyperbole"],
      correctAnswer: 2,
      subject: "Literature"
    },
    {
      question: "Which blood cells help in clotting of blood?",
      options: ["Red blood cells", "White blood cells", "Platelets", "Plasma"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "Which organ of government interprets laws?",
      options: ["Executive", "Legislature", "Judiciary", "Electoral Commission"],
      correctAnswer: 2,
      subject: "Government"
    },
    {
      question: "The basic economic problem is?",
      options: ["Inflation", "Scarcity", "Poverty", "Unemployment"],
      correctAnswer: 1,
      subject: "Economics"
    },
    {
      question: "The Tropic of Cancer is located at?",
      options: ["23.5° North", "23.5° South", "0°", "66.5° North"],
      correctAnswer: 0,
      subject: "Geography"
    },
    {
      question: "What miracle did Jesus perform at the wedding in Cana?",
      options: ["Healing a leper", "Raising Lazarus", "Turning water into wine", "Feeding 5,000"],
      correctAnswer: 2,
      subject: "CRK"
    },
    {
      question: "Which of these is a noble gas?",
      options: ["Oxygen", "Nitrogen", "Neon", "Hydrogen"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      question: "Simplify: (5x² - 2x + 1) - (2x² + x - 3)",
      options: ["3x² - 3x + 4", "7x² - x + 2", "3x² + 3x - 2", "3x² - x - 2"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "What is the SI unit of electric current?",
      options: ["Volt (V)", "Ampere (A)", "Ohm (Ω)", "Watt (W)"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      question: "Which law states that the angle of incidence equals the angle of reflection?",
      options: ["Snell's Law", "Boyle's Law", "Law of Reflection", "Ohm's Law"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      question: "What is the acceleration due to gravity on Earth?",
      options: ["9.8 m/s²", "6.7 m/s²", "10.2 m/s²", "8.5 m/s²"],
      correctAnswer: 0,
      subject: "Physics"
    },
    {
      question: "Which of these is NOT a vector quantity?",
      options: ["Velocity", "Force", "Speed", "Displacement"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      question: "The process by which liquid changes to gas at all temperatures is called:",
      options: ["Boiling", "Evaporation", "Sublimation", "Condensation"],
      correctAnswer: 1,
      subject: "Physics"
    },
    // Additional Chemistry questions
    {
      question: "What is the atomic number of Oxygen?",
      options: ["6", "8", "16", "10"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which gas is responsible for the brown color of smog?",
      options: ["Carbon monoxide", "Nitrogen dioxide", "Sulfur dioxide", "Methane"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The pH of a neutral solution is:",
      options: ["0", "7", "14", "10"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "Which of these elements is a halogen?",
      options: ["Sodium", "Chlorine", "Calcium", "Aluminum"],
      correctAnswer: 1,
      subject: "Chemistry"
    },
    {
      question: "The process of converting sugar to alcohol is called:",
      options: ["Fermentation", "Distillation", "Oxidation", "Polymerization"],
      correctAnswer: 0,
      subject: "Chemistry"
    },
    // Additional Biology questions
    {
      question: "Which of these is NOT a function of the kidney?",
      options: ["Excretion", "Osmoregulation", "Photosynthesis", "Homeostasis"],
      correctAnswer: 2,
      subject: "Biology"
    },
    {
      question: "The basic unit of life is:",
      options: ["Atom", "Cell", "Tissue", "Molecule"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "Which blood group is the universal donor?",
      options: ["A", "B", "AB", "O"],
      correctAnswer: 3,
      subject: "Biology"
    },
    {
      question: "Photosynthesis occurs in which part of the plant cell?",
      options: ["Mitochondria", "Chloroplast", "Nucleus", "Ribosome"],
      correctAnswer: 1,
      subject: "Biology"
    },
    {
      question: "The study of insects is called:",
      options: ["Ornithology", "Entomology", "Ichthyology", "Botany"],
      correctAnswer: 1,
      subject: "Biology"
    },
    // Additional Mathematics questions
    {
      question: "What is the value of π (pi) to two decimal places?",
      options: ["3.12", "3.14", "3.16", "3.18"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "Solve for x: 2x + 5 = 15",
      options: ["5", "7", "10", "15"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      question: "What is the area of a circle with radius 7cm? (π = 22/7)",
      options: ["44 cm²", "154 cm²", "308 cm²", "616 cm²"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "The sum of angles in a triangle is:",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      question: "If y = x² + 3x + 2, what is dy/dx?",
      options: ["2x + 3", "x + 3", "2x + 2", "x² + 3"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    // Additional English/Literature questions
    {
      question: "Which of these is a figure of speech that compares two unlike things using 'like' or 'as'?",
      options: ["Metaphor", "Simile", "Personification", "Hyperbole"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "Who wrote 'The Lion and the Jewel'?",
      options: ["Chinua Achebe", "Wole Soyinka", "Buchi Emecheta", "Flora Nwapa"],
      correctAnswer: 1,
      subject: "Literature"
    },
    {
      question: "The arrangement of events in a story is called:",
      options: ["Plot", "Setting", "Theme", "Conflict"],
      correctAnswer: 0,
      subject: "Literature"
    },
    {
      question: "Which of these is NOT a type of pronoun?",
      options: ["Personal", "Possessive", "Reflexive", "Adverbial"],
      correctAnswer: 3,
      subject: "English"
    },
    {
      question: "The word 'quickly' is an example of:",
      options: ["Adjective", "Adverb", "Noun", "Verb"],
      correctAnswer: 1,
      subject: "English"
    },
    // Government questions
    {
      question: "The legislative arm of government is responsible for:",
      options: ["Implementing laws", "Making laws", "Interpreting laws", "Enforcing laws"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "Nigeria gained independence in which year?",
      options: ["1957", "1960", "1963", "1970"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "The concept of separation of powers was propounded by:",
      options: ["Karl Marx", "Montesquieu", "John Locke", "Thomas Hobbes"],
      correctAnswer: 1,
      subject: "Government"
    },
    {
      question: "Which of these is NOT a feature of democracy?",
      options: ["Periodic elections", "Rule of law", "One-party system", "Fundamental human rights"],
      correctAnswer: 2,
      subject: "Government"
    }
  ];

  // State for random questions
  const [practiceQuestions, setPracticeQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  // Initialize with random questions
  useEffect(() => {
    const shuffled = [...allPracticeQuestions].sort(() => 0.5 - Math.random());
    setPracticeQuestions(shuffled.slice(0, 10));
  }, []);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Initialize countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const nextExam = new Date(now.getFullYear(), 5, 15); // June 15th
      if (now > nextExam) {
        nextExam.setFullYear(nextExam.getFullYear() + 1);
      }
      
      const difference = nextExam - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => 
      prev < practiceQuestions.length - 1 ? prev + 1 : 0
    );
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const getNewRandomQuestions = () => {
    const shuffled = [...allPracticeQuestions].sort(() => 0.5 - Math.random());
    setPracticeQuestions(shuffled.slice(0, 10));
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  return (
    <JAMBContainer data-aos="fade-in">
      <HeroSection>
        <HeroTitle>JAMB Exam Preparation</HeroTitle>
        <HeroText>Comprehensive resources to help you ace your UTME examination</HeroText>
      </HeroSection>

      <CountdownTimer>
        <h2>Next JAMB Exam Starts In:</h2>
        <div>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
      </CountdownTimer>

      <TabContainer>
        <TabButton 
          active={activeTab === 'subjects'}
          onClick={() => setActiveTab('subjects')}
        >
          All Subjects
        </TabButton>
        <TabButton 
          active={activeTab === 'past-questions'}
          onClick={() => setActiveTab('past-questions')}
        >
          Past Questions
        </TabButton>
        <TabButton 
          active={activeTab === 'strategies'}
          onClick={() => setActiveTab('strategies')}
        >
          Exam Strategies
        </TabButton>
      </TabContainer>

      {activeTab === 'subjects' && (
        <TabContent>
          <h2>JAMB Subjects Available</h2>
          <SubjectGrid>
            {subjects.map((subject, index) => (
              <SubjectCard key={index}>
                <h3>{subject.name}</h3>
                <p>Topics: {subject.topics}</p>
                <p>Duration: {subject.duration}</p>
                <StartButton to={`/jamb/${subject.name.toLowerCase().replace('/', '-')}`}>
                  Start Learning
                </StartButton>
              </SubjectCard>
            ))}
          </SubjectGrid>
        </TabContent>
      )}

      {activeTab === 'past-questions' && (
        <TabContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Practice Past Questions</h2>
            <ActionButton 
              onClick={getNewRandomQuestions}
              style={{ background: '#036d35', color: 'white' }}
            >
              New Random Set
            </ActionButton>
          </div>
          
          {practiceQuestions.length > 0 && (
            <PracticeQuestionWrapper>
              <PracticeQuestionContainer>
                <div>
                  <h3 style={{ color: '#036d35', marginBottom: '0.5rem' }}>
                    {practiceQuestions[currentQuestionIndex].question}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>
                    Subject: {practiceQuestions[currentQuestionIndex].subject}
                  </p>
                  
                  {practiceQuestions[currentQuestionIndex].options.map((option, i) => (
                    <OptionButton
                      key={i}
                      onClick={() => !showAnswer && setSelectedOption(i)}
                      selected={selectedOption === i}
                      correct={i === practiceQuestions[currentQuestionIndex].correctAnswer}
                      showAnswer={showAnswer}
                    >
                      {option}
                      {showAnswer && i === practiceQuestions[currentQuestionIndex].correctAnswer && (
                        <span style={{ marginLeft: '0.5rem' }}>✓ Correct</span>
                      )}
                    </OptionButton>
                  ))}
                  
                  <div style={{ marginTop: '1.5rem', display: 'flex' }}>
                    <ActionButton 
                      primary 
                      onClick={() => setShowAnswer(true)}
                      disabled={selectedOption === null || showAnswer}
                    >
                      Check Answer
                    </ActionButton>
                    <ActionButton 
                      onClick={handleNextQuestion}
                      style={{ background: '#10b981', color: 'white' }}
                    >
                      Next Question
                    </ActionButton>
                  </div>
                </div>
              </PracticeQuestionContainer>
            </PracticeQuestionWrapper>
          )}
        </TabContent>
      )}

      {activeTab === 'strategies' && (
        <TabContent>
          <h2>Exam Strategies</h2>
          <StrategyCard>
            <h3>Time Management Tips</h3>
            <p>Learn how to allocate your time effectively during the exam:</p>
            <ul>
              <li>Spend no more than 45 seconds per question</li>
              <li>Answer easy questions first, then return to harder ones</li>
              <li>Practice with timed mock exams to build your pace</li>
              <li>Allocate time to review your answers if possible</li>
            </ul>
          </StrategyCard>
          <StrategyCard>
            <h3>Answering Techniques</h3>
            <p>Master the art of eliminating wrong options quickly:</p>
            <ul>
              <li>Look for absolute terms like "always" or "never" - these are often wrong</li>
              <li>Eliminate clearly wrong options first</li>
              <li>Watch for similar paired options - one is likely correct</li>
              <li>Pay attention to questions with "EXCEPT" or "NOT"</li>
            </ul>
          </StrategyCard>
        </TabContent>
      )}
    </JAMBContainer>
  );
};

export default JAMBPage;