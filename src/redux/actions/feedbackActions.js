import axios from 'axios';

// Action Types
export const SUBMIT_FEEDBACK_REQUEST = 'SUBMIT_FEEDBACK_REQUEST';
export const SUBMIT_FEEDBACK_SUCCESS = 'SUBMIT_FEEDBACK_SUCCESS';
export const SUBMIT_FEEDBACK_FAILURE = 'SUBMIT_FEEDBACK_FAILURE';

// Action Creators
export const submitFeedback = (trackId, feedbackData) => async (dispatch) => {
  dispatch({ type: SUBMIT_FEEDBACK_REQUEST });

  try {
    const response = await axios.post(`/api/feedback/${trackId}`, feedbackData);
    dispatch({
      type: SUBMIT_FEEDBACK_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SUBMIT_FEEDBACK_FAILURE,
      payload: error.response ? error.response.data : 'An error occurred while submitting feedback'
    });
  }
};
