import { pollConstants } from '../_constants/pollConstants.js';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  votes: []
}



export const reducer = (state = {}, action) => {
  console.log("LOCATION CHANGE!");
  switch(action.type) {
    case LOCATION_CHANGE: {
      console.log("LOCATION CHANGE CALLED!"); 
      return {};
    }
    default:
      return state;
  }
}

export function selectedPoll(state = "All", action) {
  console.log("selectedPoll");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case pollConstants.GETONE_SELECT:
      return action.poll
    default:
      return state
  }
}

export function resultsExitReducer(state = initialState, action) {
  console.log("resultsExitReducer");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case pollConstants.RESULTS_EXIT: {
      state = initialState
      break
    }
    default:
     return state
  }
}

export function votesByPoll(state = {}, action) {
  console.log("VotesByPoll");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case pollConstants.GETONE_FAILURE:
    case pollConstants.GETONE_SUCCESS:
    case pollConstants.GETONE_REQUEST:
      return Object.assign({}, state, {
        [action.poll]: votes(state[action.poll], action)
      })
    default:
      return state
  }
}
const votes = (state = initialState, action) => {
  console.log("posts");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case pollConstants.GETONE_FAILURE:
      console.log("reducer failure posts");
      return {
        ...state,
        didInvalidate: true
      }
    case pollConstants.GETONE_REQUEST:
      console.log("reducer request posts");
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case pollConstants.GETONE_SUCCESS:
      console.log("reducer success/receive posts");
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
