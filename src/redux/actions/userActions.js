import axios from 'axios';

// Action Types
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST';
export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const FETCH_USER_PROFILE_FAILURE = 'FETCH_USER_PROFILE_FAILURE';
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_FAILURE = 'UPDATE_USER_PROFILE_FAILURE';

// Action Creators
export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, payload: user });
export const fetchUserFailure = (error) => ({ type: FETCH_USER_FAILURE, payload: error });

export const fetchUserProfileRequest = () => ({ type: FETCH_USER_PROFILE_REQUEST });
export const fetchUserProfileSuccess = (profile) => ({ type: FETCH_USER_PROFILE_SUCCESS, payload: profile });
export const fetchUserProfileFailure = (error) => ({ type: FETCH_USER_PROFILE_FAILURE, payload: error });

export const updateUserProfileRequest = () => ({ type: UPDATE_USER_PROFILE_REQUEST });
export const updateUserProfileSuccess = (profile) => ({ type: UPDATE_USER_PROFILE_SUCCESS, payload: profile });
export const updateUserProfileFailure = (error) => ({ type: UPDATE_USER_PROFILE_FAILURE, payload: error });

// Thunk action to fetch user data
export const fetchUser = (userId) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await axios.get(`/api/users/${userId}`);
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};

// Thunk action to fetch user profile
export const fetchUserProfile = (userId) => async (dispatch) => {
  dispatch(fetchUserProfileRequest());
  try {
    const response = await axios.get(`/api/users/${userId}/profile`);
    dispatch(fetchUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(fetchUserProfileFailure(error.message));
  }
};

// Thunk action to update user profile
export const updateUserProfile = (userId, profileData) => async (dispatch) => {
  dispatch(updateUserProfileRequest());
  try {
    const response = await axios.put(`/api/users/${userId}/profile`, profileData);
    dispatch(updateUserProfileSuccess(response.data));
  } catch (error) {
    dispatch(updateUserProfileFailure(error.message));
  }
};
