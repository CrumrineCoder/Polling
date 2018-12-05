import { pollConstants } from '../_constants/pollConstants.js';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  votes: []
}

export function selectedPoll(state = "All", action) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return null;
    }
    case pollConstants.GET_SELECT:
      return action.poll
    default:
      return state
  }
}

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

const votes = (state = initialState, action) => {
  switch (action.type) {
    case pollConstants.GET_FAILURE:
      return {
        ...state,
        didInvalidate: true
      }
    case pollConstants.GET_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
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
