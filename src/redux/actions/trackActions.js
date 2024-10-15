import api from '../../utils/api';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';
export const FETCH_TRACK_REQUEST = 'FETCH_TRACK_REQUEST';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_FAILURE = 'FETCH_TRACK_FAILURE';
export const FETCH_TRACK_FEEDBACK_REQUEST = 'FETCH_TRACK_FEEDBACK_REQUEST';
export const FETCH_TRACK_FEEDBACK_SUCCESS = 'FETCH_TRACK_FEEDBACK_SUCCESS';
export const FETCH_TRACK_FEEDBACK_FAILURE = 'FETCH_TRACK_FEEDBACK_FAILURE';

export const fetchTracks = () => async (dispatch) => {
  dispatch({ type: FETCH_TRACKS_REQUEST });
  try {
    const response = await api.get('/tracks');
    dispatch({ type: FETCH_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRACKS_FAILURE, payload: error.message });
  }
};

export const fetchTrack = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TRACK_REQUEST });
  try {
    const response = await api.get(`/tracks/${id}`);
    dispatch({ type: FETCH_TRACK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRACK_FAILURE, payload: error.message });
  }
};

export const fetchTrackFeedback = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TRACK_FEEDBACK_REQUEST });
  try {
    const response = await api.get(`/tracks/${id}/feedback`);
    dispatch({ type: FETCH_TRACK_FEEDBACK_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRACK_FEEDBACK_FAILURE, payload: error.message });
  }
};
