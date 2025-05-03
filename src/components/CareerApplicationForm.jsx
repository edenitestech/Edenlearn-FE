// src/pages/CareerApplication.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormWrapper = styled.div`
  max-width: 600px;
  margin: 5rem auto;
  padding: 2rem;
  background: var(--bg-section);
  border-radius: 8px;
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
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.8rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: 100%;
  background: var(--head-color);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 5px;
  font-weight: 600;
  margin-top: 1.5rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: var(--primary-green);
  }
`;

const CareerApplication = () => {
  const navigate = useNavigate(); // ✅ Add useNavigate here

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    resume: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'resume') {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Application submitted:', formData);

    // Simulate slight delay before navigating
    setTimeout(() => {
      navigate('/thank-you'); // ✅ Redirect after successful application
    }, 1000);

    // Clear form (optional)
    setFormData({ fullName: '', email: '', resume: '', message: '' });
  };

  return (
    <FormWrapper data-aos="zoom-in">
      <FormTitle>Apply Now</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Full Name</Label>
          <Input type="text" name="fullName" required value={formData.fullName} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Email Address</Label>
          <Input type="email" name="email" required value={formData.email} onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Upload Resume (PDF)</Label>
          <Input type="file" name="resume" accept="application/pdf" required onChange={handleChange} />
        </FormGroup>

        <FormGroup>
          <Label>Message (Optional)</Label>
          <TextArea name="message" rows="4" value={formData.message} onChange={handleChange} />
        </FormGroup>

        <SubmitButton type="submit">
          Submit Application
        </SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default CareerApplication;
