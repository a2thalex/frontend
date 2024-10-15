import api from '../../utils/api';

export const SUBMIT_FEEDBACK_REQUEST = 'SUBMIT_FEEDBACK_REQUEST';
export const SUBMIT_FEEDBACK_SUCCESS = 'SUBMIT_FEEDBACK_SUCCESS';
export const SUBMIT_FEEDBACK_FAILURE = 'SUBMIT_FEEDBACK_FAILURE';

export const submitFeedback = (trackId, content) => async (dispatch) => {
  dispatch({ type: SUBMIT_FEEDBACK_REQUEST });
  try {
    const response = await api.post(`/tracks/${trackId}/feedback`, { content });
    dispatch({ type: SUBMIT_FEEDBACK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SUBMIT_FEEDBACK_FAILURE, payload: error.message });
  }
};
