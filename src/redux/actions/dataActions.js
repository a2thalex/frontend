import api from '../../utils/api';

export const FETCH_FEATURED_TRACKS_REQUEST = 'FETCH_FEATURED_TRACKS_REQUEST';
export const FETCH_FEATURED_TRACKS_SUCCESS = 'FETCH_FEATURED_TRACKS_SUCCESS';
export const FETCH_FEATURED_TRACKS_FAILURE = 'FETCH_FEATURED_TRACKS_FAILURE';

export const FETCH_FEATURED_ARTISTS_REQUEST = 'FETCH_FEATURED_ARTISTS_REQUEST';
export const FETCH_FEATURED_ARTISTS_SUCCESS = 'FETCH_FEATURED_ARTISTS_SUCCESS';
export const FETCH_FEATURED_ARTISTS_FAILURE = 'FETCH_FEATURED_ARTISTS_FAILURE';

export const FETCH_GENRES_WITH_TRACKS_REQUEST = 'FETCH_GENRES_WITH_TRACKS_REQUEST';
export const FETCH_GENRES_WITH_TRACKS_SUCCESS = 'FETCH_GENRES_WITH_TRACKS_SUCCESS';
export const FETCH_GENRES_WITH_TRACKS_FAILURE = 'FETCH_GENRES_WITH_TRACKS_FAILURE';

export const FETCH_FEATURED_ARTIST_AILLUSION_REQUEST = 'FETCH_FEATURED_ARTIST_AILLUSION_REQUEST';
export const FETCH_FEATURED_ARTIST_AILLUSION_SUCCESS = 'FETCH_FEATURED_ARTIST_AILLUSION_SUCCESS';
export const FETCH_FEATURED_ARTIST_AILLUSION_FAILURE = 'FETCH_FEATURED_ARTIST_AILLUSION_FAILURE';

export const FETCH_RECENT_TRACKS_REQUEST = 'FETCH_RECENT_TRACKS_REQUEST';
export const FETCH_RECENT_TRACKS_SUCCESS = 'FETCH_RECENT_TRACKS_SUCCESS';
export const FETCH_RECENT_TRACKS_FAILURE = 'FETCH_RECENT_TRACKS_FAILURE';

export const fetchFeaturedTracks = () => async (dispatch) => {
  dispatch({ type: FETCH_FEATURED_TRACKS_REQUEST });
  try {
    const response = await api.get('/featured/tracks');
    dispatch({ type: FETCH_FEATURED_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FEATURED_TRACKS_FAILURE, payload: error.message });
  }
};

export const fetchFeaturedArtists = () => async (dispatch) => {
  dispatch({ type: FETCH_FEATURED_ARTISTS_REQUEST });
  try {
    const response = await api.get('/featured/artists');
    dispatch({ type: FETCH_FEATURED_ARTISTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FEATURED_ARTISTS_FAILURE, payload: error.message });
  }
};

export const fetchGenresWithTracks = () => async (dispatch) => {
  dispatch({ type: FETCH_GENRES_WITH_TRACKS_REQUEST });
  try {
    const response = await api.get('/featured/genres-with-tracks');
    dispatch({ type: FETCH_GENRES_WITH_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_GENRES_WITH_TRACKS_FAILURE, payload: error.message });
  }
};

export const fetchFeaturedArtistAillusion = () => async (dispatch) => {
  dispatch({ type: FETCH_FEATURED_ARTIST_AILLUSION_REQUEST });
  try {
    const response = await api.get('/featured/artist/aillusion');
    dispatch({ type: FETCH_FEATURED_ARTIST_AILLUSION_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_FEATURED_ARTIST_AILLUSION_FAILURE, payload: error.message });
  }
};

export const fetchRecentTracks = () => async (dispatch) => {
  dispatch({ type: FETCH_RECENT_TRACKS_REQUEST });
  try {
    const response = await api.get('/tracks/recent');
    dispatch({ type: FETCH_RECENT_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_RECENT_TRACKS_FAILURE, payload: error.message });
  }
};
