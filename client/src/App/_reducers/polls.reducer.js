import { pollConstants } from '../_constants';

export function polls(state = {}, action) {
  switch (action.type) {
    case pollConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case pollConstants.GETALL_SUCCESS:
      return {
        items: action.polls
      };
    case pollConstants.GETALL_FAILURE:
      return {
        error: action.error
      };
    case pollConstants.GETONE_REQUEST:
      return {
        loading: true
      };
    case pollConstants.GETONE_SUCCESS:
      return {
        items: action.poll
      };
    case pollConstants.GETONE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}

