import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://ntunz-backend-2b1ea1133876.herokuapp.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    // For file uploads, we need to set the content type to multipart/form-data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Instead of automatically logging out, we'll dispatch an action to update the auth state
      // This will be handled in the auth reducer
      if (window.store) {
        window.store.dispatch({ type: 'AUTH_ERROR' });
      }
    }
    return Promise.reject(error);
  }
);

// Upload track function
export const uploadTrack = async (trackData) => {
  try {
    const response = await api.post('/tracks/upload', trackData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
