import { pollConstants } from '../_constants/pollConstants.js';

// Poll creation reducer, mainly just handles loading and saving to Redux state
export default function deletePoll(state = {}, action) {
  switch (action.type) {
    // upon requesting a poll be created, return the loading variable "creating" and set it to true
    case pollConstants.DELETE_POLL_REQUEST:
      return { deleting: true };
    // Don't return anything if the poll is created or failed.
    case pollConstants.DELETE_POLL_SUCCESS:
      return {};
    case pollConstants.DELETE_POLL_FAILURE:
      return {};
    default:
      return state
  }
}