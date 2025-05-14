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

  // Axios instance with updated baseURL and interceptors
  const api = axios.create({
    baseURL: 'https://e-learning-be-3n5m.onrender.com/api',
    headers: { 'Content-Type': 'application/json' }
  });

  // Attach access token to requests
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refresh = localStorage.getItem('refreshToken');
          const { data } = await axios.post(`${api.baseURL}/auth/token/refresh/`, { refresh });
          localStorage.setItem('accessToken', data.access);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return api(originalRequest);
        } catch (e) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/login');
        }
      }
      return Promise.reject(error);
    }
  );

  // Verify token on initial load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      api.get('/auth/profile/') // Note trailing slash
        .then(res => setCurrentUser(res.data))
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken'); // Added
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Updated signup function
  const signup = async (formData) => {
    try {
      console.log("Registration payload:", formData); // Debug
      const { data } = await api.post('/auth/register/', {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        is_instructor: false
      });
      console.log("Registration response:", data); // Debug
  
      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setCurrentUser(data.user);
      navigate('/dashboard');
      return { success: true };
  
    } catch (error) {
      console.error("Full registration error:", error); // Debug
      const resp = error.response?.data || {};
      const key = Object.keys(resp)[0];
      const message = Array.isArray(resp[key]) ? resp[key][0] : resp[key];
      alert(`Registration failed: ${message}`); // Force UI feedback
      return { success: false, error: message };
    }
  };

  // Updated login function
  const login = async ({ email, password }) => {
    try {
      const { data } = await api.post('/auth/login/', { // Trailing slash
        username: email, // Changed from 'email' to 'username'
        password
      });

      localStorage.setItem('accessToken', data.access); // Updated
      localStorage.setItem('refreshToken', data.refresh); // Added
      setCurrentUser(data.user);
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      const message = error.response?.data?.detail || 'Login failed';
      return { success: false, error: message };
    }
  };

  // Updated logout function
  const logout = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      try {
        await api.post('/auth/logout/', { refresh }); // Trailing slash
      } catch (e) {
        console.warn('Logout token blacklist failed', e);
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