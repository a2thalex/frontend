import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/authReducer';
import trackReducer from './reducers/trackReducer';
import artistReducer from './reducers/artistReducer';
import feedbackReducer from './reducers/feedbackReducer';
import dataReducer from './reducers/dataReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  tracks: trackReducer,
  artists: artistReducer,
  feedback: feedbackReducer,
  data: dataReducer,
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
