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
    const response = await api.post('/auth/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: { token: response.data.token } });
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || 'An error occurred' });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await api.post('/auth/register', { username, email, password });
    if (response.data.token) {
      dispatch({ type: REGISTER_SUCCESS, payload: { token: response.data.token } });
      localStorage.setItem('token', response.data.token);
    } else {
      // If registration is successful but doesn't return a token, we'll just dispatch success
      dispatch({ type: REGISTER_SUCCESS });
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Registration failed';
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
  }
};

// New action to check if the user is already authenticated
export const checkAuth = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: { token } });
  }
};
