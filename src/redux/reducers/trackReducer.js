import {
  FETCH_TRACKS_REQUEST,
  FETCH_TRACKS_SUCCESS,
  FETCH_TRACKS_FAILURE,
  FETCH_TRACK_REQUEST,
  FETCH_TRACK_SUCCESS,
  FETCH_TRACK_FAILURE,
  FETCH_TRACK_FEEDBACK_REQUEST,
  FETCH_TRACK_FEEDBACK_SUCCESS,
  FETCH_TRACK_FEEDBACK_FAILURE
} from '../actions/trackActions';

const initialState = {
  tracks: [],
  currentTrack: null,
  trackFeedback: [],
  loading: false,
  error: null
};

const trackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TRACKS_REQUEST:
    case FETCH_TRACK_REQUEST:
    case FETCH_TRACK_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tracks: action.payload,
        error: null
      };
    case FETCH_TRACK_SUCCESS:
      return {
        ...state,
        loading: false,
        currentTrack: action.payload,
        error: null
      };
    case FETCH_TRACK_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        trackFeedback: action.payload,
        error: null
      };
    case FETCH_TRACKS_FAILURE:
    case FETCH_TRACK_FAILURE:
    case FETCH_TRACK_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default trackReducer;
