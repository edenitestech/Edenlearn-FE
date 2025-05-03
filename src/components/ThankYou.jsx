import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheckCircle } from 'react-icons/fa';

const ThankYouWrapper = styled.section`
  min-height: 100vh;
  background: var(--bg-section);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const ThankYouCard = styled.div`
  background: #fff;
  padding: 3rem 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const SuccessIcon = styled(FaCheckCircle)`
  font-size: 4rem;
  color: var(--primary-green);
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  color: var(--head-color);
  margin-bottom: 1rem;
  font-size: 2.2rem;
`;

const Message = styled.p`
  color: var(--font-primary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const CountdownText = styled.p`
  color: var(--font-secondary);
  margin-top: 1rem;
  font-size: 0.95rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: 0.3s;
  background: ${props => props.variant === 'secondary' ? 'var(--font-color)' : 'var(--head-color)'};
  color: ${props => props.variant === 'secondary' ? 'var(--head-color)' : 'var(--font-color)'};
  border: 1px solid var(--head-color);

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
`;

const ThankYou = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(15); // Starting countdown value (seconds)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 15000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <ThankYouWrapper>
      <ThankYouCard data-aos="zoom-in">
        <SuccessIcon />
        <Title>🎉 Thank You!</Title>
        <Message>Your submission has been received successfully. We'll get back to you shortly!</Message>

        <ButtonGroup>
          <ActionButton to="/" variant="primary">Go to Homepage</ActionButton>
          <ActionButton to="/courses" variant="secondary">Browse Courses</ActionButton>
        </ButtonGroup>

        <CountdownText>
          Redirecting to Homepage in {countdown} second{countdown !== 1 && 's'}...
        </CountdownText>
      </ThankYouCard>
    </ThankYouWrapper>
  );
};

export default ThankYou;
