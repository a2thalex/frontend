import axios from 'axios';

// Action Types
export const FETCH_FEATURED_TRACKS_REQUEST = 'FETCH_FEATURED_TRACKS_REQUEST';
export const FETCH_FEATURED_TRACKS_SUCCESS = 'FETCH_FEATURED_TRACKS_SUCCESS';
export const FETCH_FEATURED_TRACKS_FAILURE = 'FETCH_FEATURED_TRACKS_FAILURE';
export const FETCH_FEATURED_ARTISTS_REQUEST = 'FETCH_FEATURED_ARTISTS_REQUEST';
export const FETCH_FEATURED_ARTISTS_SUCCESS = 'FETCH_FEATURED_ARTISTS_SUCCESS';
export const FETCH_FEATURED_ARTISTS_FAILURE = 'FETCH_FEATURED_ARTISTS_FAILURE';

// Action Creators
export const fetchFeaturedTracksRequest = () => ({ type: FETCH_FEATURED_TRACKS_REQUEST });
export const fetchFeaturedTracksSuccess = (tracks) => ({ type: FETCH_FEATURED_TRACKS_SUCCESS, payload: tracks });
export const fetchFeaturedTracksFailure = (error) => ({ type: FETCH_FEATURED_TRACKS_FAILURE, payload: error });

export const fetchFeaturedArtistsRequest = () => ({ type: FETCH_FEATURED_ARTISTS_REQUEST });
export const fetchFeaturedArtistsSuccess = (artists) => ({ type: FETCH_FEATURED_ARTISTS_SUCCESS, payload: artists });
export const fetchFeaturedArtistsFailure = (error) => ({ type: FETCH_FEATURED_ARTISTS_FAILURE, payload: error });

// Thunk action to fetch featured tracks
export const fetchFeaturedTracks = () => async (dispatch) => {
  dispatch(fetchFeaturedTracksRequest());
  try {
    const response = await axios.get('/api/featured-tracks');
    dispatch(fetchFeaturedTracksSuccess(response.data));
  } catch (error) {
    dispatch(fetchFeaturedTracksFailure(error.message));
  }
};

// Thunk action to fetch featured artists
export const fetchFeaturedArtists = () => async (dispatch) => {
  dispatch(fetchFeaturedArtistsRequest());
  try {
    const response = await axios.get('/api/featured-artists');
    dispatch(fetchFeaturedArtistsSuccess(response.data));
  } catch (error) {
    dispatch(fetchFeaturedArtistsFailure(error.message));
  }
};
