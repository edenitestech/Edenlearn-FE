// AxiosService.js

import axios from 'axios';

// Base URL should end in /api (e.g. http://localhost:8000/api)
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  // We’re not using cookie‐based auth—remove withCredentials unless you really need it:
  // withCredentials: true
});

// 1️⃣ Attach stored access token on every outgoing request:
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 2️⃣ If a 401 comes back, try to refresh the token once:
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      // don’t attempt refresh on login or register or refresh‐endpoint itself
      !originalRequest.url.includes('/auth/token/refresh/') &&
      !originalRequest.url.includes('/auth/login/') &&
      !originalRequest.url.includes('/auth/register/')
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token stored');

        // Note: this must call the Django “token/refresh/” endpoint with a trailing slash
        const { data } = await axios.post(
          /* full URL */
          `${api.baseURL}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        // Save new tokens
        localStorage.setItem('accessToken', data.access);
        // Keep refreshToken as‐is (it does not rotate here)

        // Re‐attach the new access token, then re‐issue the original request:
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        return api(originalRequest);
      } catch (_err) {
        // If refresh fails, force logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
