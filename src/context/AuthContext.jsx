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

  useEffect(() => {
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
  }, []);

  // FIXED: signUp function with proper payload and headers
  const signUp = async (formData) => {
    if (!formData.email || !formData.password || !formData.fullname) {
      return { success: false, error: 'Missing required fields' };
    }
    
    try {
      // Create properly formatted payload with snake_case keys
      const payload = {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullname, // Changed to snake_case
        confirm_password: formData.confirmPassword // Changed to snake_case
      };

      console.log("Registration payload:", payload);
      
      // FIXED: Added trailing slash and explicit headers
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
      setCurrentUser(data.user || { 
        email: formData.email, 
        name: formData.fullname 
      });
      
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      // IMPROVED: Better error logging
      console.error("Registration error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });

      let errorMessage = 'Registration failed';
      if (error.response?.data) {
        // Handle Django REST framework errors
        if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } 
        // Handle validation errors
        else if (typeof error.response.data === 'object') {
          errorMessage = Object.entries(error.response.data)
            .flatMap(([key, errors]) => 
              Array.isArray(errors) 
                ? errors.map(err => `${key}: ${err}`)
                : `${key}: ${errors}`
            )
            .join('; ');
        }
        else if (typeof error.response.data === 'string') {
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

  // ADDED: login function that was missing
  const login = async ({ email, password }) => {
    try {
      console.log("Login attempt with:", { email, password });
      const { data } = await api.post('/auth/login/', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log("Login response:", data);

      if (!data.access || !data.refresh) {
        throw new Error("Invalid response from server - missing tokens");
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setCurrentUser(data.user || { email });
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      console.error("Login error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      
      let message = 'Login failed';
      if (error.response?.data) {
        message = error.response.data.detail || 
                 error.response.data.message || 
                 JSON.stringify(error.response.data);
      }
      
      return { success: false, error: message };
    }
  };

  // Updated logout function
  const logout = async () => {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      try {
        await api.post('/auth/logout/', { refresh }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
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
    signUp,
    login, // Now properly defined
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}