import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', { email, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_FAIL', payload: err.response.data.message });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', { username, email, password });
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'REGISTER_FAIL', payload: err.response.data.message });
  }
};

export const updateNCoins = (nCoins) => ({
  type: 'UPDATE_NCOINS',
  payload: nCoins
});

export const fetchUserData = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/user');
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'FETCH_USER_FAIL', payload: err.response.data.message });
  }
};
