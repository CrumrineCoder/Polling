import { pollConstants } from '../_constants/pollConstants.js';

export default function createPoll(state = {}, action) {
  switch (action.type) {
    case pollConstants.POLL_VOTE_REQUEST:
      return { creating: true };
    case pollConstants.POLL_VOTE_SUCCESS:
      return {};
    case pollConstants.POLL_VOTE_FAILURE:
      return {};
    default:
      return state
  }
}