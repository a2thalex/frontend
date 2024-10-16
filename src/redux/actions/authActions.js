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
    dispatch({ type: LOGIN_SUCCESS, payload: { token: response.data.token } });
    localStorage.setItem('token', response.data.token);
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
    return { type: REGISTER_SUCCESS };
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
    dispatch({ type: LOGIN_SUCCESS, payload: { token } });
  }
};
