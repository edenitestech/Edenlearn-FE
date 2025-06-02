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
      setCurrentUser(data.user);
      navigate('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Full registration error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
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
        }
      }

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

      if (!data.access || !data.refresh) {
        throw new Error('Login succeeded but no tokens returned');
      }

      localStorage.setItem('accessToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);

      // Our backend does not return "user" here (only tokens), so fetch profile immediately:
      const profileResp = await api.get('/auth/profile/');
      setCurrentUser(profileResp.data);

      navigate('/dashboard');
      return { success: true };
    } catch (error) {
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
      }
      return { success: false, error: message };
    }
  };

  // ─── LOG OUT ───────────────────────────────────────────────────────────────
  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        // Hit "/auth/logout/" with { refresh: <token> }
        await api.post('/auth/logout/', { refresh: refreshToken });
      } catch (err) {
        console.warn('Logout blacklist failed:', err);
        // even if it fails, we continue to remove tokens
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
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
