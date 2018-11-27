import { pollConstants } from '../_constants';

let initialState = {
  polls: [],
  isLoading: false,
  errors: []
};

export function polls(state = initialState, action) {
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
      return Object.assign({}, state, {
        isLoading: false,
        polls: action.payload
      });
    case pollConstants.GETONE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        errors: action.payload
      });
    default:
      return state
  }
}

