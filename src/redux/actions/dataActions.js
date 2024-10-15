// Action Types
export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';
export const FETCH_FEATURED_TRACKS_REQUEST = 'FETCH_FEATURED_TRACKS_REQUEST';
export const FETCH_FEATURED_TRACKS_SUCCESS = 'FETCH_FEATURED_TRACKS_SUCCESS';
export const FETCH_FEATURED_TRACKS_FAILURE = 'FETCH_FEATURED_TRACKS_FAILURE';
export const FETCH_FEATURED_ARTISTS_REQUEST = 'FETCH_FEATURED_ARTISTS_REQUEST';
export const FETCH_FEATURED_ARTISTS_SUCCESS = 'FETCH_FEATURED_ARTISTS_SUCCESS';
export const FETCH_FEATURED_ARTISTS_FAILURE = 'FETCH_FEATURED_ARTISTS_FAILURE';

// Action Creators
export const fetchDataRequest = () => ({ type: FETCH_DATA_REQUEST });
export const fetchDataSuccess = (data) => ({ type: FETCH_DATA_SUCCESS, payload: data });
export const fetchDataFailure = (error) => ({ type: FETCH_DATA_FAILURE, payload: error });

export const fetchFeaturedTracksRequest = () => ({ type: FETCH_FEATURED_TRACKS_REQUEST });
export const fetchFeaturedTracksSuccess = (tracks) => ({ type: FETCH_FEATURED_TRACKS_SUCCESS, payload: tracks });
export const fetchFeaturedTracksFailure = (error) => ({ type: FETCH_FEATURED_TRACKS_FAILURE, payload: error });

export const fetchFeaturedArtistsRequest = () => ({ type: FETCH_FEATURED_ARTISTS_REQUEST });
export const fetchFeaturedArtistsSuccess = (artists) => ({ type: FETCH_FEATURED_ARTISTS_SUCCESS, payload: artists });
export const fetchFeaturedArtistsFailure = (error) => ({ type: FETCH_FEATURED_ARTISTS_FAILURE, payload: error });

// Thunk action to fetch data
export const fetchData = () => async (dispatch) => {
  dispatch(fetchDataRequest());
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    dispatch(fetchDataSuccess(data));
  } catch (error) {
    dispatch(fetchDataFailure(error.message));
  }
};

// Thunk action to fetch featured tracks
export const fetchFeaturedTracks = () => async (dispatch) => {
  dispatch(fetchFeaturedTracksRequest());
  try {
    const response = await fetch('/api/featured-tracks');
    const tracks = await response.json();
    dispatch(fetchFeaturedTracksSuccess(tracks));
  } catch (error) {
    dispatch(fetchFeaturedTracksFailure(error.message));
  }
};

// Thunk action to fetch featured artists
export const fetchFeaturedArtists = () => async (dispatch) => {
  dispatch(fetchFeaturedArtistsRequest());
  try {
    const response = await fetch('/api/featured-artists');
    const artists = await response.json();
    dispatch(fetchFeaturedArtistsSuccess(artists));
  } catch (error) {
    dispatch(fetchFeaturedArtistsFailure(error.message));
  }
};
