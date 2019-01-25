import { pollConstants } from '../_constants/pollConstants.js';

// Poll creation reducer, mainly just handles loading and saving to Redux state
export default function editPoll(state = {}, action) {
  switch (action.type) {
    // upon requesting a poll be created, return the loading variable "creating" and set it to true
    case pollConstants.EDIT_POLL_REQUEST:
      return { creating: true };
    // Don't return anything if the poll is created or failed.
    case pollConstants.EDIT_POLL_SUCCESS:
      return {};
    case pollConstants.EDIT_POLL_FAILURE:
      return {};
    default:
      return state
  }
}