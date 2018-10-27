import {
    REQUEST_POLLS_START,
    REQUEST_POLLS_SUCCESS,
    REQUEST_POLLS_FAILED
  } from '../constants/pollConstants'
  
  // start request
  export function doPolls(payload) {
    return {
      type: REQUEST_POLLS_START,
      payload
    };
  }
  
  // on successful
  export function doPollsFulfilled(payload) {
    return {
      type: REQUEST_POLLS_SUCCESS,
      payload
    };
  }
  
  // on fail
  export function doPollsFailed(payload) {
    return {
      type: REQUEST_POLLS_FAILED,
      payload
    };
  }
