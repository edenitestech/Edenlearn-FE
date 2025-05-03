import React, { useState } from 'react';
import '../styles/SignUp.css';

const SignUp = ({ onSwitch }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    acceptedTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateStep1 = () => {
    return (
      formData.fullname &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  const nextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      nextStep();
      return;
    }
    if (!formData.acceptedTerms) return;
    // Handle final submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="signup-form">
      <div className="form-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
      </div>

      {step === 1 && (
        <div className="form-step active">
          <div className="form-header">
            <h2>Join Edenites Academy</h2>
            <p>Start your learning journey today</p>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter a strong password (8-72 characters)"
              minLength="8"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="button"
            className="auth-button"
            onClick={nextStep}
            disabled={!validateStep1()}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step active">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg.gabbytech101@gmail.com"
              required
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              required
            />
            <label className="privacy-acceptance">
              I accept Edenites Academy's Terms of Use and Privacy Notice
            </label>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              className="nav-button prev-btn"
              onClick={prevStep}
            >
              Back
            </button>
            <button
              type="submit"
              className="auth-button"
              onClick={handleSubmit}
              disabled={!formData.acceptedTerms}
            >
              Join for Free
            </button>
          </div>
        </div>
      )}

      <div className="form-footer">
        <p>Already have an account? <button onClick={onSwitch} className="switch-form">Log in</button></p>
      </div>
    </div>
  );
};

export default SignUp;