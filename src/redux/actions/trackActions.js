import axios from 'axios';

// Action Types
export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';
export const FETCH_TRACK_REQUEST = 'FETCH_TRACK_REQUEST';
export const FETCH_TRACK_SUCCESS = 'FETCH_TRACK_SUCCESS';
export const FETCH_TRACK_FAILURE = 'FETCH_TRACK_FAILURE';
export const FETCH_TRACK_FEEDBACK_REQUEST = 'FETCH_TRACK_FEEDBACK_REQUEST';
export const FETCH_TRACK_FEEDBACK_SUCCESS = 'FETCH_TRACK_FEEDBACK_SUCCESS';
export const FETCH_TRACK_FEEDBACK_FAILURE = 'FETCH_TRACK_FEEDBACK_FAILURE';

// Action Creators
export const fetchTracksRequest = () => ({ type: FETCH_TRACKS_REQUEST });
export const fetchTracksSuccess = (tracks) => ({ type: FETCH_TRACKS_SUCCESS, payload: tracks });
export const fetchTracksFailure = (error) => ({ type: FETCH_TRACKS_FAILURE, payload: error });

export const fetchTrackRequest = () => ({ type: FETCH_TRACK_REQUEST });
export const fetchTrackSuccess = (track) => ({ type: FETCH_TRACK_SUCCESS, payload: track });
export const fetchTrackFailure = (error) => ({ type: FETCH_TRACK_FAILURE, payload: error });

export const fetchTrackFeedbackRequest = () => ({ type: FETCH_TRACK_FEEDBACK_REQUEST });
export const fetchTrackFeedbackSuccess = (feedback) => ({ type: FETCH_TRACK_FEEDBACK_SUCCESS, payload: feedback });
export const fetchTrackFeedbackFailure = (error) => ({ type: FETCH_TRACK_FEEDBACK_FAILURE, payload: error });

// Thunk action to fetch tracks
export const fetchTracks = () => async (dispatch) => {
  dispatch(fetchTracksRequest());
  try {
    const response = await axios.get('/api/tracks');
    dispatch(fetchTracksSuccess(response.data));
  } catch (error) {
    dispatch(fetchTracksFailure(error.message));
  }
};

// Thunk action to fetch a single track
export const fetchTrack = (trackId) => async (dispatch) => {
  dispatch(fetchTrackRequest());
  try {
    const response = await axios.get(`/api/tracks/${trackId}`);
    dispatch(fetchTrackSuccess(response.data));
  } catch (error) {
    dispatch(fetchTrackFailure(error.message));
  }
};

// Thunk action to fetch track feedback
export const fetchTrackFeedback = (trackId) => async (dispatch) => {
  dispatch(fetchTrackFeedbackRequest());
  try {
    const response = await axios.get(`/api/tracks/${trackId}/feedback`);
    dispatch(fetchTrackFeedbackSuccess(response.data));
  } catch (error) {
    dispatch(fetchTrackFeedbackFailure(error.message));
  }
};
