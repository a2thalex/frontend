import {
  FETCH_FEATURED_TRACKS_REQUEST,
  FETCH_FEATURED_TRACKS_SUCCESS,
  FETCH_FEATURED_TRACKS_FAILURE,
  FETCH_FEATURED_ARTISTS_REQUEST,
  FETCH_FEATURED_ARTISTS_SUCCESS,
  FETCH_FEATURED_ARTISTS_FAILURE
} from '../actions/dataActions';

const initialState = {
  featuredTracks: [],
  featuredArtists: [],
  loading: false,
  error: null
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURED_TRACKS_REQUEST:
    case FETCH_FEATURED_ARTISTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_FEATURED_TRACKS_SUCCESS:
      return {
        ...state,
        featuredTracks: action.payload,
        loading: false
      };
    case FETCH_FEATURED_ARTISTS_SUCCESS:
      return {
        ...state,
        featuredArtists: action.payload,
        loading: false
      };
    case FETCH_FEATURED_TRACKS_FAILURE:
    case FETCH_FEATURED_ARTISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default dataReducer;
