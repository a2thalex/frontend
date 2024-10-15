import axios from 'axios';

// Action Types
export const FETCH_ARTISTS_REQUEST = 'FETCH_ARTISTS_REQUEST';
export const FETCH_ARTISTS_SUCCESS = 'FETCH_ARTISTS_SUCCESS';
export const FETCH_ARTISTS_FAILURE = 'FETCH_ARTISTS_FAILURE';
export const FETCH_ARTIST_REQUEST = 'FETCH_ARTIST_REQUEST';
export const FETCH_ARTIST_SUCCESS = 'FETCH_ARTIST_SUCCESS';
export const FETCH_ARTIST_FAILURE = 'FETCH_ARTIST_FAILURE';
export const FETCH_ARTIST_TRACKS_REQUEST = 'FETCH_ARTIST_TRACKS_REQUEST';
export const FETCH_ARTIST_TRACKS_SUCCESS = 'FETCH_ARTIST_TRACKS_SUCCESS';
export const FETCH_ARTIST_TRACKS_FAILURE = 'FETCH_ARTIST_TRACKS_FAILURE';

// Action Creators
export const fetchArtistsRequest = () => ({ type: FETCH_ARTISTS_REQUEST });
export const fetchArtistsSuccess = (artists) => ({ type: FETCH_ARTISTS_SUCCESS, payload: artists });
export const fetchArtistsFailure = (error) => ({ type: FETCH_ARTISTS_FAILURE, payload: error });

export const fetchArtistRequest = () => ({ type: FETCH_ARTIST_REQUEST });
export const fetchArtistSuccess = (artist) => ({ type: FETCH_ARTIST_SUCCESS, payload: artist });
export const fetchArtistFailure = (error) => ({ type: FETCH_ARTIST_FAILURE, payload: error });

export const fetchArtistTracksRequest = () => ({ type: FETCH_ARTIST_TRACKS_REQUEST });
export const fetchArtistTracksSuccess = (tracks) => ({ type: FETCH_ARTIST_TRACKS_SUCCESS, payload: tracks });
export const fetchArtistTracksFailure = (error) => ({ type: FETCH_ARTIST_TRACKS_FAILURE, payload: error });

// Thunk action to fetch artists
export const fetchArtists = () => async (dispatch) => {
  dispatch(fetchArtistsRequest());
  try {
    const response = await axios.get('/api/artists');
    dispatch(fetchArtistsSuccess(response.data));
  } catch (error) {
    dispatch(fetchArtistsFailure(error.message));
  }
};

// Thunk action to fetch a single artist
export const fetchArtist = (artistId) => async (dispatch) => {
  dispatch(fetchArtistRequest());
  try {
    const response = await axios.get(`/api/artists/${artistId}`);
    dispatch(fetchArtistSuccess(response.data));
  } catch (error) {
    dispatch(fetchArtistFailure(error.message));
  }
};

// Thunk action to fetch artist tracks
export const fetchArtistTracks = (artistId) => async (dispatch) => {
  dispatch(fetchArtistTracksRequest());
  try {
    const response = await axios.get(`/api/artists/${artistId}/tracks`);
    dispatch(fetchArtistTracksSuccess(response.data));
  } catch (error) {
    dispatch(fetchArtistTracksFailure(error.message));
  }
};
