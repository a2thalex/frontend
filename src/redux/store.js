import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './reducers/authReducer';
import artistReducer from './reducers/artistReducer';
import trackReducer from './reducers/trackReducer';
import feedbackReducer from './reducers/feedbackReducer';
import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  artists: artistReducer,
  tracks: trackReducer,
  feedback: feedbackReducer,
  user: userReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
