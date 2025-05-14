import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  AuthContainer,
  FormHeader,
  Form,
  FormGroup,
  Label,
  Input,
  AuthButton,
  ErrorMessage,
  FormFooter,
  SwitchFormButton
} from '../components/AuthStyles';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const FormProgress = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  position: relative;
  margin-bottom: .2rem;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: #e0e0e0;
    z-index: 1;
    transform: translateY(-50%);
  }
`;

const ProgressStep = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--head-color)' : '#e0e0e0'};
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  color: ${props => props.active ? 'white' : '#666'};
  font-weight: 600;
  position: relative;
  z-index: 2;
  transition: all 0.5s ease;
  transform: ${props => props.active ? 'scale(1.1)' : 'scale(1)'};
`;

const FormStep = styled.div`
  opacity: ${props => props.active ? 1 : 0};
  height: ${props => props.active ? 'auto' : 0};
  transform: translateX(${props => props.active ? 0 : '20px'});
  transition: opacity 0.5s ease, transform 0.5s ease;
  overflow: hidden;
`;

const FormNavigation = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: .5rem;
`;

const NavButton = styled.button`
  width: 48%;
  padding: 0.8rem .5rem;
  background: none;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  color: ${props => props.type === 'prev' ? 'var(--font-secondary)' : 'inherit'};

  &:hover {
    border-color: var(--head-color);
    
    background-color: var(--head-color);
    color: ${props => props.type === 'prev' ? 'var(--head-color)' : 'inherit'};
    color: var(--font-color);
  }
`;

const FormCheckbox = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  input {
    margin-right: 0.8rem;
    width: 18px;
    height: 18px;
  }
`;

const PrivacyAcceptance = styled.label`
  color: var(--font-primary);
  font-size: 0.9rem;
  font-weight: 600;
`;

const SignUp = ({ onSwitch }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    acceptedTerms: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep1 = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
      return;
    }
    if (!formData.acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }

    setIsLoading(true);
    setError(''); // Clear previous errors
    
    if (!formData.email || !formData.password || !formData.fullname) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    const result = await signup({
      email: formData.email,
      password: formData.password,
      fullname: formData.fullname,
      confirmPassword: formData.confirmPassword 
    });
  
    setIsLoading(false);
  

    if (!result.success) {
      setError(result.error || 'Registration failed. Please try again.');
      return;
    }
  };



  return (
    <SignUpContainer>
      <FormProgress>
        <ProgressStep active={step >= 1}>1</ProgressStep>
        <ProgressStep active={step >= 2}>2</ProgressStep>
      </FormProgress>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <FormStep active={step === 1}>
          <FormHeader>
            <h2>Join Edenites Academy</h2>
            <p>Start your learning journey today</p>
          </FormHeader>
          
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password (8-72 characters)"
              minLength="8"
              required
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </FormGroup>
          
          <AuthButton
            type="button"
            onClick={nextStep}
            disabled={!formData.fullname || !formData.password || !formData.confirmPassword}
          >
            Next
          </AuthButton>
        </FormStep>

        <FormStep active={step === 2}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg.gabbytech101@gmail.com"
              required
            />
          </FormGroup>
          
          <FormCheckbox>
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              required
            />
            <PrivacyAcceptance>
              I accept Edenites Academy's Terms of Use and Privacy Notice
            </PrivacyAcceptance>
          </FormCheckbox>
          
          <FormNavigation>
            <NavButton type="prev" onClick={prevStep}>
              Back
            </NavButton>
            <AuthButton
              type="submit"
              disabled={!formData.acceptedTerms || isLoading}
            >
              {isLoading ? 'Creating account...' : 'Join for Free'}
            </AuthButton>
          </FormNavigation>
        </FormStep>
      </Form>
      
      <FormFooter>
        <p>Already have an account? <SwitchFormButton onClick={onSwitch}>Log in</SwitchFormButton></p>
      </FormFooter>
    </SignUpContainer>
  );
};

export default SignUp;