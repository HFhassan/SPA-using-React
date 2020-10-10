import { feedbackForm } from './ActionCreators';
import * as ActionTypes from './ActionTypes';

export const Feedbacks = (state = { errMess: null, feedbacks:[]}, action) => {
  switch (action.type) {
    case ActionTypes.FEEDBACK_FORM:
      return {...state, errMess: null, feedbacks: action.payload};

    
    case ActionTypes.ADD_FEEDBACK:
        
        return { ...state, feedbacks: state.feedbacks.concat(feedbackForm)};

    default:
      return state;
  }
};