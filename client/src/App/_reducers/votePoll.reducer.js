import { pollConstants } from '../_constants/pollConstants.js';

// handle loading variables for voting on polls whether it's a singular vote, creating a vote, or multiple votes
export default function votePoll(state = {}, action) {
  switch (action.type) {
    case pollConstants.POLL_VOTE_ANSWER_REQUEST:
      return { creating: true };
    case pollConstants.POLL_VOTE_ANSWER_SUCCESS:
      return {};
    case pollConstants.POLL_VOTE_ANSWER_FAILURE:
      return {};
    case pollConstants.POLL_VOTE_USERANSWER_REQUEST:
      return { creating: true };
    case pollConstants.POLL_VOTE_USERANSWER_SUCCESS:
      return {};
    case pollConstants.POLL_VOTE_USERANSWER_FAILURE:
      return {};
    case pollConstants.POLL_VOTE_CREATEUSERANSWER_REQUEST:
      return { creating: true };
    case pollConstants.POLL_VOTE_CREATEUSERANSWER_SUCCESS:
      return {};
    case pollConstants.POLL_VOTE_CREATEUSERANSWER_FAILURE:
      return {};
    case pollConstants.POLL_VOTE_MULTIPLE_REQUEST:
      return { creating: true };
    case pollConstants.POLL_VOTE_MULTIPLE_SUCCESS:
      return {};
    case pollConstants.POLL_VOTE_MULTIPLE_FAILURE:
      return {};
    default:
      return state
  }
}