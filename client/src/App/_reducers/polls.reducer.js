import { pollConstants } from '../_constants/pollConstants.js';

let initialState = {
  isFetching: false,
  didInvalidate: false,
  votes: []
};
// Change This
export function selectedPoll(state = 'reactjs', action) {
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

function votes(state = initialState, action) {
  console.log("votes");
  console.log(state);
  console.log(action);
  switch (action.type) {
    case pollConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case pollConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        polls: action.payload
      });

    case pollConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });
      case pollConstants.GETONE_FAILURE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case pollConstants.GETONE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case pollConstants.GETONE_REQUEST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        votes: action.votes,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
