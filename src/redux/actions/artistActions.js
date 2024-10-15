import api from '../../utils/api';

export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';
export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';
export const FETCH_ARTIST_TRACKS_REQUEST = 'FETCH_ARTIST_TRACKS_REQUEST';
export const FETCH_ARTIST_TRACKS_SUCCESS = 'FETCH_ARTIST_TRACKS_SUCCESS';
export const FETCH_ARTIST_TRACKS_FAILURE = 'FETCH_ARTIST_TRACKS_FAILURE';

export const fetchArtists = () => async (dispatch) => {
  dispatch({ type: FETCH_ARTISTS_REQUEST });
  try {
    const response = await api.get('/artists');
    dispatch({ type: FETCH_ARTISTS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ARTISTS_FAILURE, payload: error.message });
  }
};

export const fetchArtist = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ARTIST_REQUEST });
  try {
    const response = await api.get(`/artists/${id}`);
    dispatch({ type: FETCH_ARTIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ARTIST_FAILURE, payload: error.message });
  }
};

export const fetchArtistTracks = (id) => async (dispatch) => {
  dispatch({ type: FETCH_ARTIST_TRACKS_REQUEST });
  try {
    const response = await api.get(`/artists/${id}/tracks`);
    dispatch({ type: FETCH_ARTIST_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_ARTIST_TRACKS_FAILURE, payload: error.message });
  }
};
