import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt:', formData);
  };

  return (
    <div className="login-wrapper">
      <div className="login-form">
        <div className="form-header">
          <h2>Welcome back to Edenites Academy</h2>
          <p>Login to continue your learning journey</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com" 
              required 
            />
          </div>
          
          <div className="form-group">
            <div className="password-label-container">
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={!formData.email || !formData.password}
          >
            Login
          </button>
        </form>
        
        <div className="form-footer">
          <p>New to Edenites? <button onClick={onSwitch} className="switch-form">Join for Free</button></p>
        </div>
      </div>
    </div>
  );
};

export default Login;