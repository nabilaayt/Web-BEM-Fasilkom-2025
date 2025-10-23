import axios from 'axios';

const base = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = base.replace(/\/+$/, '') + '/api';
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    const isAdminPage = window.location.pathname.startsWith('/admin');
    if (status === 401 && isAdminPage && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);


export default api;