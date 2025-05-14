// AuthStyles.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const AuthWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  background-position: center;
  background-size: cover;
  background: radial-gradient(circle at center,rgba(140, 218, 193, 0.25),rgba(255, 255, 255, 0.32),rgba(0, 0, 128, 0.22)),
    url('../assets/Auth_background.png');
`;

export const AuthContainer = styled.div`
  width: 100%;
  max-width: 450px;
  background: transparent;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.66);
  padding: .5rem 2rem;
  position: relative;
  overflow: hidden;
  font-family: "poppins", san-serif;
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: .5rem;
  
  h2 {
    color: var(--font-primary);
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }
  
  p {
    color: var(--font-secondary);
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  color: var(--font-primary);
  font-weight: 600;
  margin-top: .5rem;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.8rem 1rem ;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--head-color);
  }
`;

export const AuthButton = styled.button`
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  font-weight: 600;
  text-decoration: none;
  width: 48%;
  cursor: pointer;
  transition: background-color .5s;
  
  &:hover:not(:disabled) {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  color: var(--accent-error);
  background-color: #fef2f2;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  text-align: center;
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: .5rem;
  color: var(--font-secondary);
  font-size: 0.9rem;
`;

export const SwitchFormButton = styled.button`
  background: none;
  border: none;
  color: var(--head-color);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const PasswordLabelContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ForgotPasswordLink = styled(Link)`
  color: var(--head-color);
  font-size: 0.8rem;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;