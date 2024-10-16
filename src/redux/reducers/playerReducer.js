import {
  PLAY_TRACK,
  PAUSE_TRACK,
  SET_CURRENT_TRACK,
  SET_CURRENT_TIME,
  SET_DURATION,
  NEXT_TRACK,
  PREVIOUS_TRACK
} from '../actions/playerActions';

const initialState = {
  currentTrack: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  queue: []
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_TRACK:
      return { ...state, isPlaying: true };
    case PAUSE_TRACK:
      return { ...state, isPlaying: false };
    case SET_CURRENT_TRACK:
      return { ...state, currentTrack: action.payload, isPlaying: true, currentTime: 0 };
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case SET_DURATION:
      return { ...state, duration: action.payload };
    case NEXT_TRACK:
      // Implement next track logic
      return state;
    case PREVIOUS_TRACK:
      // Implement previous track logic
      return state;
    default:
      return state;
  }
};

export default playerReducer;
