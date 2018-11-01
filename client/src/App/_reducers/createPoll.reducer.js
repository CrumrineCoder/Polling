import { pollConstants } from '../_constants/pollConstants.js';

export default function createPoll(state = {}, action) {
  switch (action.type) {
    case pollConstants.POLL_REGISTER_REQUEST:
      console.log("POLL_REGISTER_REQUEST");
      return { creating: true };
    case pollConstants.POLL_REGISTER_SUCCESS:
      return {};
    case pollConstants.POLL_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}