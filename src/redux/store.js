import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import trackReducer from './reducers/trackReducer';
import playerReducer from './reducers/playerReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  player: playerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
