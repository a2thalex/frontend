export const PLAY_TRACK = 'PLAY_TRACK';
export const PAUSE_TRACK = 'PAUSE_TRACK';
export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const SET_DURATION = 'SET_DURATION';
export const NEXT_TRACK = 'NEXT_TRACK';
export const PREVIOUS_TRACK = 'PREVIOUS_TRACK';

export const playTrack = () => ({ type: PLAY_TRACK });
export const pauseTrack = () => ({ type: PAUSE_TRACK });
export const setCurrentTrack = (track) => ({ type: SET_CURRENT_TRACK, payload: track });
export const setCurrentTime = (time) => ({ type: SET_CURRENT_TIME, payload: time });
export const setDuration = (duration) => ({ type: SET_DURATION, payload: duration });
export const nextTrack = () => ({ type: NEXT_TRACK });
export const previousTrack = () => ({ type: PREVIOUS_TRACK });
