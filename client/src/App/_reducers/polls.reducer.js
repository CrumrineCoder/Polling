import { pollConstants } from '../_constants/pollConstants.js';
import { LOCATION_CHANGE } from 'react-router-redux';

// isFetching is a loading variable and is iniitally set to false
// didInvalidate is a variable for error handling and is initially set to false
// votes is an array for storing returned polls, and is initially set to empty
const initialState = {
  isFetching: false,
  didInvalidate: false,
  votes: []
}

// select which poll(s) we're getting from the backend. start with "all" for getting all polls
export function selectedPoll(state = "All", action) {
  switch (action.type) {
    // If the user changes to a different location, don't use this reducer
    case LOCATION_CHANGE: {
      return null;
    }
    // Save the incoming poll to the Redux state 
    case pollConstants.GET_SELECT:
      return action.poll
    default:
      return state
  }
}

// Upon receiving all the  votes for the poll(s), save them to the Redux state by calling the votes() function below (this reducer is mainly used to access the votes for the votes() function for readability)
export function votesByPoll(state = {}, action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return {};
    }
    case pollConstants.GET_FAILURE:
    case pollConstants.GET_SUCCESS:
    case pollConstants.GET_REQUEST:
      return Object.assign({}, state, {
        [action.poll]: votes(state[action.poll], action)
      })
    default:
      return state
  }
}

// function used above for async action while getting polls
const votes = (state = initialState, action) => {
  switch (action.type) {
    // upon a failure, return the state and set inValidate to true, which will handle error messages
    case pollConstants.GET_FAILURE:
      return {
        ...state,
        didInvalidate: true
      }
    // upon a request, set isFetching to true and invalidate to false, which will let the app with its asynchronous flow of data
    case pollConstants.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    // upon receiving the data, save the data, set isFetching and Invalidate to false, and when the polls were last updated
    case pollConstants.GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        votes: action.votes,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
