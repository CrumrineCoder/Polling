import { pollConstants } from '../_constants/pollConstants.js';

// Poll creation reducer, mainly just handles loading and saving to Redux state
export default function createPoll(state = {}, action) {
  switch (action.type) {
    // upon requesting a poll be created, return the loading variable "creating" and set it to true
    case pollConstants.POLL_REGISTER_REQUEST:
      return { creating: true };
    // Don't return anything if the poll is created or failed.
    case pollConstants.POLL_REGISTER_SUCCESS:
      return {};
    case pollConstants.POLL_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}