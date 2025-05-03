// src/components/Preloader.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/e-favicon2.png'; 

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const PreloaderWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: var(--bg-default);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  animation: ${spin} 5s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.div`
  font-size: 1.2rem;
  color: var(--head-color);
`;

const Preloader = () => {
  return (
    <PreloaderWrapper>
      <Logo src={logo} alt="Edenites Academy" />
      <LoadingText>Loading Edenites Academy...</LoadingText>
    </PreloaderWrapper>
  );
};

export default Preloader;
