import axios from 'axios';

console.log('process.env:', process.env);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
const baseURL = 'https://ntunz-backend-2b1ea1133876.herokuapp.com';
console.log('Hardcoded baseURL:', baseURL);

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Full request URL:', `${config.baseURL}${config.url}`);
    console.log('Request method:', config.method);
    console.log('Request data:', config.data);
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No token found in localStorage');
    }
    // For file uploads, we need to set the content type to multipart/form-data
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    console.log('Request headers:', config.headers);
    console.log('Authorization header:', config.headers['Authorization']);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response status:', response.status);
    console.log('Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    if (error.response && error.response.status === 401) {
      console.warn('Received 401 Unauthorized response');
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
    console.error('Error uploading track:', error);
    throw error;
  }
};

export default api;
