import {
  FETCH_FEATURED_TRACKS_REQUEST,
  FETCH_FEATURED_TRACKS_SUCCESS,
  FETCH_FEATURED_TRACKS_FAILURE,
  FETCH_FEATURED_ARTISTS_REQUEST,
  FETCH_FEATURED_ARTISTS_SUCCESS,
  FETCH_FEATURED_ARTISTS_FAILURE,
  FETCH_GENRES_WITH_TRACKS_REQUEST,
  FETCH_GENRES_WITH_TRACKS_SUCCESS,
  FETCH_GENRES_WITH_TRACKS_FAILURE,
  FETCH_FEATURED_ARTIST_AILLUSION_REQUEST,
  FETCH_FEATURED_ARTIST_AILLUSION_SUCCESS,
  FETCH_FEATURED_ARTIST_AILLUSION_FAILURE,
} from '../actions/dataActions';

const initialState = {
  featuredTracks: [],
  featuredArtists: [],
  genresWithTracks: [],
  featuredArtistAillusion: null,
  loading: false,
  error: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEATURED_TRACKS_REQUEST:
    case FETCH_FEATURED_ARTISTS_REQUEST:
    case FETCH_GENRES_WITH_TRACKS_REQUEST:
    case FETCH_FEATURED_ARTIST_AILLUSION_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FEATURED_TRACKS_SUCCESS:
      return {
        ...state,
        featuredTracks: action.payload,
        loading: false,
      };
    case FETCH_FEATURED_ARTISTS_SUCCESS:
      return {
        ...state,
        featuredArtists: action.payload,
        loading: false,
      };
    case FETCH_GENRES_WITH_TRACKS_SUCCESS:
      return {
        ...state,
        genresWithTracks: action.payload,
        loading: false,
      };
    case FETCH_FEATURED_ARTIST_AILLUSION_SUCCESS:
      return {
        ...state,
        featuredArtistAillusion: action.payload,
        loading: false,
      };
    case FETCH_FEATURED_TRACKS_FAILURE:
    case FETCH_FEATURED_ARTISTS_FAILURE:
    case FETCH_GENRES_WITH_TRACKS_FAILURE:
    case FETCH_FEATURED_ARTIST_AILLUSION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
