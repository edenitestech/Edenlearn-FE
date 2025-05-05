import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Configure axios instance
  const api = axios.create({
    baseURL: 'https://e-learning-be-3n5m.onrender.com/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Add request interceptor for auth token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Check for existing token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await api.get('/auth/profile');
      setCurrentUser(response.data);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Register new user
  const signup = async (formData) => {
    try {
      const response = await api.post('/auth/register', {  // Changed from '/auth/signup' to '/auth/register'
        email: formData.email,
        password: formData.password,
        name: formData.fullname
      });
      
      // Save user data and token
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data.user);  // Changed from setUser to setCurrentUser
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error.response?.data);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  // Login existing user
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      setCurrentUser(user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
      setCurrentUser(null);
      navigate('/login');
    }
  };

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}