import { pollConstants } from '../_constants/pollConstants.js';

let initialState = {
  polls: [],
  isLoading: false,
  errors: []
};

export default function polls(state = initialState, action) {
  switch (action.type) {
    case pollConstants.GETALL_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case pollConstants.GETALL_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        polls: action.payload
      });

    case pollConstants.GETALL_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });
    case pollConstants.GETONE_REQUEST:
      console.log("Reducer", action); 
      return Object.assign({}, state, {
        isLoading: true
      });
    case pollConstants.GETONE_SUCCESS:
    console.log("Reducer", action); 
      return Object.assign({}, state, {
        isLoading: false,
        polls: action.payload
      });
    case pollConstants.GETONE_FAILURE:
    console.log("Reducer", action); 
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });
    default:
      return state
  }
}

