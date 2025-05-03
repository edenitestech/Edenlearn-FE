// AuthWrapper.js
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import '../styles/AuthWrapper.css';

const AuthWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeForm, setActiveForm] = useState('login');

  useEffect(() => {
    const formParam = searchParams.get('form');
    setActiveForm(formParam === 'signup' ? 'signup' : 'login');
  }, [searchParams]);

  const switchForm = (formName) => {
    setSearchParams({ form: formName });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {activeForm === 'login' ? (
          <Login onSwitch={() => switchForm('signup')} />
        ) : (
          <SignUp onSwitch={() => switchForm('login')} />
        )}
      </div>
    </div>
  );
};

export default AuthWrapper;