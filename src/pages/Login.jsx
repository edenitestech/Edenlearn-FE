// Login.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import {
  FormHeader,
  Form,
  FormGroup,
  Label,
  Input,
  AuthButton,
  ErrorMessage,
  FormFooter,
  SwitchFormButton,
  PasswordLabelContainer,
  ForgotPasswordLink,
} from '../components/AuthStyles';

const LoginContainer = styled.div`
  width: 100%;
  padding: 1rem;
`;

const Login = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login error (unexpected):', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginContainer>
      <FormHeader>
        <h2>Welcome back to Edenites Academy</h2>
        <p>Login to continue your learning journey</p>
      </FormHeader>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </FormGroup>

        <FormGroup>
          <PasswordLabelContainer>
            <Label htmlFor="password">Password</Label>
            <ForgotPasswordLink to="/forgot-password">
              Forgot password?
            </ForgotPasswordLink>
          </PasswordLabelContainer>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </FormGroup>

        <AuthButton
          type="submit"
          disabled={!formData.email || !formData.password || isLoading}
        >
          {isLoading ? 'Logging in…' : 'Login'}
        </AuthButton>
      </Form>

      <FormFooter>
        <p>
          New to Edenites?{' '}
          <SwitchFormButton onClick={onSwitch}>Join for Free</SwitchFormButton>
        </p>
      </FormFooter>
    </LoginContainer>
  );
};

export default Login;
