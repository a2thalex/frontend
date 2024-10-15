import api from '../../utils/api';

export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

export const fetchUserProfile = () => async (dispatch) => {
  dispatch({ type: FETCH_USER_PROFILE_REQUEST });
  try {
    const response = await api.get('/users/profile');
    dispatch({ type: FETCH_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_USER_PROFILE_FAILURE, payload: error.message });
  }
};

export const updateUserProfile = (profileData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_PROFILE_REQUEST });
  try {
    const response = await api.put('/users/profile', profileData);
    dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_USER_PROFILE_FAILURE, payload: error.message });
  }
};
