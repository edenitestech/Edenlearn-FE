import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Parallax background
const ParallaxSection = styled.section`
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)),
    url('https://images.unsplash.com/photo-1581090700227-1c065c9450c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 4rem 2rem;
`;

const FormContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  background: var(--bg-section);
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: var(--head-color);
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-blue);
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.error ? '#f44336' : '#ccc'};
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${props => props.error ? '#f44336' : 'var(--primary-green)'};
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid ${props => props.error ? '#f44336' : '#ccc'};
  border-radius: 4px;
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    border-color: ${props => props.error ? '#f44336' : 'var(--primary-green)'};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  display: inline-block;
  background: var(--font-color);
  color: var(--head-color);
  border: 1px solid var(--head-color);
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  margin-top: 2rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: var(--head-color);
    color: var(--font-color);
    box-shadow: inset 0 -3.25em 0 0 var(--head-color);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: #f44336;
  font-size: 0.85rem;
  margin-top: 0.25rem;
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  text-align: center;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1.5rem;
  text-align: center;
`;

const HRContactForm = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.phone && !/^\d{10,14}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10-14 digits';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        position: '',
        message: ''
      });

      setTimeout(() => {
        navigate('/thank-you'); // ✅ Redirect after 2 seconds
      }, 2000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ParallaxSection>
      <FormContainer data-aos="fade-up">
        <FormTitle>Contact Our HR Team</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Full Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            {errors.name && <ErrorText>{errors.name}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            {errors.phone && <ErrorText>{errors.phone}</ErrorText>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="position">Position of Interest (Optional)</Label>
            <Input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message">Your Message</Label>
            <TextArea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              error={errors.message}
            />
            {errors.message && <ErrorText>{errors.message}</ErrorText>}
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </SubmitButton>

          {submitStatus === 'success' && (
            <SuccessMessage>
              ✅ Thank you! Redirecting shortly...
            </SuccessMessage>
          )}

          {submitStatus === 'error' && (
            <ErrorMessage>
              ❌ There was an error submitting your message. Please try again later.
            </ErrorMessage>
          )}
        </form>
      </FormContainer>
    </ParallaxSection>
  );
};

export default HRContactForm;
