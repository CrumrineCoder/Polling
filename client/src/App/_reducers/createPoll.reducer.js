import { pollConstants } from '../_constants';

export function createPoll(state = {}, action) {
  switch (action.type) {
    case pollConstants.POLL_REGISTER_REQUEST:
      return { creating: true };
    case pollConstants.POLL_REGISTER_SUCCESS:
      return {};
    case pollConstants.POLL_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}