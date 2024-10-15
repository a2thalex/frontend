import {
  FETCH_ARTISTS_REQUEST,
  FETCH_ARTISTS_SUCCESS,
  FETCH_ARTISTS_FAILURE,
  FETCH_ARTIST_REQUEST,
  FETCH_ARTIST_SUCCESS,
  FETCH_ARTIST_FAILURE,
  FETCH_ARTIST_TRACKS_REQUEST,
  FETCH_ARTIST_TRACKS_SUCCESS,
  FETCH_ARTIST_TRACKS_FAILURE
} from '../actions/artistActions';

const initialState = {
  artists: [],
  currentArtist: null,
  artistTracks: [],
  loading: false,
  error: null
};

const artistReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ARTISTS_REQUEST:
    case FETCH_ARTIST_REQUEST:
    case FETCH_ARTIST_TRACKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_ARTISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        artists: action.payload,
        error: null
      };
    case FETCH_ARTIST_SUCCESS:
      return {
        ...state,
        loading: false,
        currentArtist: action.payload,
        error: null
      };
    case FETCH_ARTIST_TRACKS_SUCCESS:
      return {
        ...state,
        loading: false,
        artistTracks: action.payload,
        error: null
      };
    case FETCH_ARTISTS_FAILURE:
    case FETCH_ARTIST_FAILURE:
    case FETCH_ARTIST_TRACKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default artistReducer;
