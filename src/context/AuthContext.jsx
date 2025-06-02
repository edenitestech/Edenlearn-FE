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

  // Some React Rules:
  // Never modify the State manually
  // Never mutate the State 
  // State can only be changed with its own set function

  // Take cognizance of the dependency array always used in the useEffect, i.e []
  // Take cognizance also of the use of components, states, props and hooks.

  // Verify token on initial load
    useEffect(() => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        api.get('/auth/profile/') // Note trailing slash
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

  

  // Updated signup function
  const signUp = async (formData) => {
    if (!formData.email || !formData.password || !formData.fullname) {
      return { success: false, error: 'Missing required fields' };
    }
    try {
      console.log("Registration payload:", formData);
      const { data } = await api.post('/auth/register', formData 
        // fullname: formData.fullname,
        // email: formData.email,
        // password: formData.password,
        // confirm_password: formData.confirmPassword,
        // is_instructor: false
        // formData
      );
      console.log("Registration response:", data);

      if (!data.access || !data.refresh) {
        throw new Error("Registration successful but missing tokens");
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setCurrentUser(data.user || { email: formData.email, name: formData.fullname });
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      console.error("Full registration error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        config: error.config
      });

      let errorMessage = 'Registration failed';
      if (error.response) {
        // Try to extract more detailed error information
        if (error.response.data) {
          // For Django REST framework errors
          if (error.response.data.detail) {
            errorMessage = error.response.data.detail;
          } 
          // For validation errors
          else if (typeof error.response.data === 'object') {
            errorMessage = Object.entries(error.response.data)
              .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
              .join('; ');
          }
          // For string errors
          else if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          }
        }
      }

      return { 
        success: false, 
        error: errorMessage || 'Unknown error occurred during registration' 
      };
    }
        
  };

  

  // Updated login function
  const login = async ({ email, password }) => {
    try {
      console.log("Login attempt with:", { email, password }); // Debug
      const { data } = await api.post('/auth/login/', {
        email, // Changed back to email if your backend expects email
        password
      });

      console.log("Login response:", data); // Debug

      if (!data.access || !data.refresh) {
        throw new Error("Invalid response from server - missing tokens");
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      setCurrentUser(data.user || { email }); // Fallback if user data not returned
      navigate('/dashboard');
      return { success: true };

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message); // Debug
      let message = 'Login failed';
      
      if (error.response) {
        // Handle different error response formats
        message = error.response.data?.detail || 
                  error.response.data?.message || 
                  (typeof error.response.data === 'string' ? error.response.data : 
                  JSON.stringify(error.response.data));
      }
      
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
  // To create the value object AFTER all functions are defined
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
