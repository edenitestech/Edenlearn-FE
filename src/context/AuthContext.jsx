// AuthContext.jsx

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

<<<<<<< HEAD
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
=======
  // On mount, if we already have an accessToken, fetch /auth/profile/ to confirm it:
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      api
        .get('/auth/profile/')   // << Must include trailing slash
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d

  // ─── SIGN UP ──────────────────────────────────────────────────────────────
  const signUp = async ({ email, password, confirmPassword, fullname }) => {
    if (!email || !password || !confirmPassword || !fullname) {
      return { success: false, error: 'Missing required fields.' };
    }

    try {
      console.log('Registration payload:', { email, password, confirmPassword, fullname });

      // We must hit "/auth/register/" (note trailing slash) and send EXACTLY the fields DRF expects:
      const { data } = await api.post('/auth/register/', {
        fullname,             // matches RegisterSerializer.fullname
        email,                // matches RegisterSerializer.email
        password,             // matches RegisterSerializer.password
        confirmPassword,      // matches RegisterSerializer.confirmPassword
        is_instructor: false  // optional; defaults to false
      });

      console.log('Registration response:', data);

      // Expecting backend to return { user: {...}, access: "...", refresh: "..." }
      if (!data.access || !data.refresh) {
        throw new Error('Registration succeeded but no tokens returned');
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
<<<<<<< HEAD
      setCurrentUser(data.user || { 
        email: formData.email, 
        name: formData.fullname 
      });
      
=======
      setCurrentUser(data.user);
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
<<<<<<< HEAD
      // IMPROVED: Better error logging
      console.error("Registration error details:", {
=======
      console.error('Full registration error:', {
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
        message: error.message,
        status: error.response?.status,
<<<<<<< HEAD
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
=======
        headers: error.response?.headers,
        config: error.config,
      });

      // Build a friendly message from DRF’s error payload:
      let errorMessage = 'Registration failed.';
      if (error.response?.data) {
        const respData = error.response.data;
        if (respData.detail) {
          errorMessage = respData.detail;
        } else if (typeof respData === 'object') {
          // e.g. { email: ["…"], password: ["…"] }
          errorMessage = Object.entries(respData)
            .map(([key, val]) => {
              const msg = Array.isArray(val) ? val.join(', ') : val;
              return `${key}: ${msg}`;
            })
            .join(' · ');
        } else if (typeof respData === 'string') {
          errorMessage = respData;
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
        }
        else if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

<<<<<<< HEAD
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
=======
      return { success: false, error: errorMessage };
    }
  };

  // ─── LOG IN ────────────────────────────────────────────────────────────────
  const login = async ({ email, password }) => {
    if (!email || !password) {
      return { success: false, error: 'Email & password are required.' };
    }

    try {
      console.log('Login attempt with:', { email, password });

      // Must post to "/auth/login/" with body { email, password } because MyTokenObtainPairSerializer will read "email"
      const { data } = await api.post('/auth/login/', { email, password });

      console.log('Login response:', data);
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d

      if (!data.access || !data.refresh) {
        throw new Error('Login succeeded but no tokens returned');
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
<<<<<<< HEAD
      setCurrentUser(data.user || { email });
=======

      // Our backend does not return "user" here (only tokens), so fetch profile immediately:
      const profileResp = await api.get('/auth/profile/');
      setCurrentUser(profileResp.data);

>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
<<<<<<< HEAD
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
=======
      console.error('Login error:', error.response?.data || error.message);

      let message = 'Login failed.';
      if (error.response?.data) {
        const respData = error.response.data;
        if (respData.detail) {
          message = respData.detail;
        } else if (typeof respData === 'object') {
          message = Object.entries(respData)
            .map(([key, val]) => {
              const msg = Array.isArray(val) ? val.join(', ') : val;
              return `${key}: ${msg}`;
            })
            .join(' · ');
        } else if (typeof respData === 'string') {
          message = respData;
        }
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
      }
      return { success: false, error: message };
    }
  };

  // ─── LOG OUT ───────────────────────────────────────────────────────────────
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
<<<<<<< HEAD
        await api.post('/auth/logout/', { refresh }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } catch (e) {
        console.warn('Logout token blacklist failed', e);
=======
        // Hit "/auth/logout/" with { refresh: <token> }
        await api.post('/auth/logout/', { refresh: refreshToken });
      } catch (err) {
        console.warn('Logout blacklist failed:', err);
        // even if it fails, we continue to remove tokens
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
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
<<<<<<< HEAD
    login, // Now properly defined
    logout
=======
    login,
    logout,
>>>>>>> 5a3de409c82b1985b079c98b0abcba9887d5ba9d
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}