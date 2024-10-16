import api from '../../utils/api';

export const FETCH_TRACKS_REQUEST = 'FETCH_TRACKS_REQUEST';
export const FETCH_TRACKS_SUCCESS = 'FETCH_TRACKS_SUCCESS';
export const FETCH_TRACKS_FAILURE = 'FETCH_TRACKS_FAILURE';

export const fetchTracks = () => async (dispatch) => {
  dispatch({ type: FETCH_TRACKS_REQUEST });
  try {
    const response = await api.get('/tracks');
    dispatch({ type: FETCH_TRACKS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_TRACKS_FAILURE, payload: error.message });
  }
};
