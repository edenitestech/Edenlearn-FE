import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './AxiosService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On mount, check authentication status
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        api.get('/auth/profile/')
          .then(res => setCurrentUser(res.data))
          .catch(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, []);

  // SIGN UP
  const signUp = async ({ email, password, confirmPassword, fullname }) => {
    if (!email || !password || !confirmPassword || !fullname) {
      return { success: false, error: 'Missing required fields' };
    }

    try {
      const payload = {
        email,
        password,
        full_name: fullname,
        confirm_password: confirmPassword,
        is_instructor: false
      };

      console.log("Registration payload:", payload);
      
      const { data } = await api.post('/auth/register/', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Registration response:", data);

      if (!data.access || !data.refresh) {
        throw new Error("Registration successful but missing tokens");
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setCurrentUser(data.user || { email, name: fullname });
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      console.error("Registration error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });

      let errorMessage = 'Registration failed';
      if (error.response?.data) {
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          errorMessage = Object.entries(error.response.data)
            .flatMap(([key, errors]) => 
              Array.isArray(errors) 
                ? errors.map(err => `${key}: ${err}`)
                : `${key}: ${errors}`
            )
            .join('; ');
        } else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  // LOG IN
  const login = async ({ email, password }) => {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    try {
      console.log("Login attempt with:", { email, password });
      
      const { data } = await api.post('/auth/login/', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Login response:", data);

      if (!data.access || !data.refresh) {
        throw new Error("Login succeeded but no tokens returned");
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      
      const profileResp = await api.get('/auth/profile/');
      setCurrentUser(profileResp.data);
      
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      console.error("Login error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      let message = 'Login failed';
      if (error.response?.data) {
        if (error.response.data.detail) {
          message = error.response.data.detail;
        } else if (typeof error.response.data === 'object') {
          message = Object.entries(error.response.data)
            .map(([key, val]) => {
              const msg = Array.isArray(val) ? val.join(', ') : val;
              return `${key}: ${msg}`;
            })
            .join(' · ');
        } else if (typeof error.response.data === 'string') {
          message = error.response.data;
        }
      }
      
      return { success: false, error: message };
    }
  };

  // LOG OUT
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await api.post('/auth/logout/', { refresh: refreshToken }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (err) {
        console.warn('Logout token blacklist failed', err);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    loading,
    signUp,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}