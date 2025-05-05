import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { AuthWrapper as Wrapper, AuthContainer } from './AuthStyles';

const AuthWrapper = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeForm = searchParams.get('form') === 'signup' ? 'signup' : 'login';

  const switchForm = (formName) => {
    setSearchParams({ form: formName });
  };

  return (
    <Wrapper>
      <AuthContainer>
        {activeForm === 'login' ? (
          <Login onSwitch={() => switchForm('signup')} />
        ) : (
          <SignUp onSwitch={() => switchForm('login')} />
        )}
      </AuthContainer>
    </Wrapper>
  );
};

export default AuthWrapper;