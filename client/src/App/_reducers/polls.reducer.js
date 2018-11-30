import { pollConstants } from '../_constants/pollConstants.js';

let initialState = {
  polls: [],
  errors: [], 
  isLoading: false
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
      console.log("Reducer REQUEST ACTION", action);
      console.log("Reducer REQUEST STATE", state);
      return Object.assign({}, state, {
        isLoading: true
      });
    /*   return { ...state, loading: true }
     return Object.assign({}, state, {
        isLoading: true
      }); */
    case pollConstants.GETONE_SUCCESS:
      console.log("Reducer SUCCESS ACTION", action);
      console.log("Reducer SUCCESS STATE", state);
      return Object.assign({}, state, {
        isLoading: false
      });
    /*   return { ...state, loading: false, polls: action.payload }
       return Object.assign({}, state, {
          isLoading: false,
          polls: action.payload
        }); */
    case pollConstants.GETONE_FAILURE:
      console.log("Reducer FAILURE ACTION", action);
      console.log("Reducer FAILURE STATE", state);
      return Object.assign({}, state, {
        isLoading: false
      });
    /*     return { ...state, loading: false, errors: action.payload }
return Object.assign({}, state, {
       isLoading: false,
       errors: action.payload
     }); */
    default:
      return state
  }
}

