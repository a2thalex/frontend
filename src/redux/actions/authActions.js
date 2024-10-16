import api from '../../utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    console.log('Attempting login with:', { email, password });
    console.log('API base URL:', api.defaults.baseURL);
    const response = await api.post('/auth/login', { email, password });
    console.log('Login response:', response);
    if (response.data.token) {
      dispatch({ type: LOGIN_SUCCESS, payload: { token: response.data.token } });
      localStorage.setItem('token', response.data.token);
      console.log('Token saved to localStorage');
    } else {
      console.error('Login successful but no token received');
      dispatch({ type: LOGIN_FAILURE, payload: 'No token received' });
    }
    return { type: LOGIN_SUCCESS };
  } catch (error) {
    console.error('Login error:', error);
    console.error('Error response:', error.response);
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || 'An error occurred' });
    return { type: LOGIN_FAILURE };
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  console.log('Token removed from localStorage');
  dispatch({ type: LOGOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    console.log('Attempting registration with:', { username, email, password });
    console.log('API base URL:', api.defaults.baseURL);
    const response = await api.post('/auth/register', { username, email, password });
    console.log('Registration response:', response);
    dispatch({ type: REGISTER_SUCCESS });
    
    // Automatically log in after successful registration
    return dispatch(login(email, password));
  } catch (error) {
    console.error('Registration error:', error);
    console.error('Error response:', error.response);
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    return { type: REGISTER_FAILURE };
  }
};

export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token found in localStorage, dispatching LOGIN_SUCCESS');
    dispatch({ type: LOGIN_SUCCESS, payload: { token } });
  } else {
    console.log('No token found in localStorage');
  }
};
