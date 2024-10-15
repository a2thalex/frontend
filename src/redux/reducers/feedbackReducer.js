import {
  SUBMIT_FEEDBACK_REQUEST,
  SUBMIT_FEEDBACK_SUCCESS,
  SUBMIT_FEEDBACK_FAILURE
} from '../actions/feedbackActions';

const initialState = {
  loading: false,
  error: null,
  feedback: []
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case SUBMIT_FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedback: [...state.feedback, action.payload]
      };
    case SUBMIT_FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default feedbackReducer;
