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
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    withCredentials: true // If using cookies
  });

  // API debugging added
  api.interceptors.request.use(config => {
    console.log('Request:', config);
    return config;
  }, error => {
    console.log('Request error:', error);
    return Promise.reject(error);
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
    if (!formData.email || !formData.password || !formData.fullname) {
      return { success: false, error: 'Missing required fields' };
    }
    try {
      console.log("Registration payload:", formData);
      const { data } = await api.post('/auth/register/', {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        is_instructor: false
      });
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
