import {
    REQUEST_POLLS_START,
    REQUEST_POLLS_SUCCESS,
    REQUEST_POLLS_FAILED
  } from '../actions/actionTypes';
  
  let initialState = {
    polls: [],
    isLoading: false,
    errors: []
  };
  function applyPolls(state = initialState, action) {
  
    switch (action.type) {
      case REQUEST_POLLS_START:
        return Object.assign({}, state, {
          isLoading: true
        });
  
      case REQUEST_POLLS_FAILED:
        return Object.assign({}, state, {
          isLoading: false,
          errors: action.payload
        });
  
      case REQUEST_POLLS_SUCCESS:
        return Object.assign({}, state, {
          isLoading: false,
          polls: action.payload
        });
  
      default:
        return state;
    }
  }
  
  export default applyPolls;
  