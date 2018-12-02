import { pollConstants } from '../_constants/pollConstants.js';

let initialState = {
  isFetching: false,
  didInvalidate: false,
  votes: []
};
// Change This
export function selectedPoll(state = 'default', action) {
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
const votes = (state = {
  isFetching: false,
  didInvalidate: false,
  votes: []
}, action) => {
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
