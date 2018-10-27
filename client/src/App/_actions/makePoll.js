import {
    MAKE_POLL_START,
    MAKE_POLL_SUCCESS,
    MAKE_POLL_FAILED
  } from '../_constants/pollConstants'
  
  // start request
  export function makePoll(payload) {
    return {
      type: MAKE_POLL_START,
      payload
    };
  }
  
  // on successful
  export function makePollFulfilled(payload) {
    return {
      type: MAKE_POLL_SUCCESS,
      payload
    };
  }
  
  // on fail
  export function makePollFailed(payload) {
    return {
      type: MAKE_POLL_FAILED,
      payload
    };
  }
