import axios from 'axios';

// Axios instance with updated baseURL and interceptors
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
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
          }
        }
        return Promise.reject(error);
      }
    );
    export default api;