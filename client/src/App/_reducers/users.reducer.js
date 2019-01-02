import { userConstants } from '../_constants/user.constants.js';

// isFetchingCurrentUser is a loading variable and initially set to false
// didInvalidateCurrentUser is a variable for error handling and initially set to false
// currentUer is an object to store the current user and is initially empty
const initialState = {
  isFetchingCurrentUser: false,
  didInvalidateCurrentUser: false,
  currentUser: {}
}

// get the current user 
export default function users(state = initialState, action) {
  switch (action.type) {
    // Upon requesting the current user, set the loading variable to true and errors to false
    case userConstants.GETCURRENT_REQUEST:
      return {
        ...state,
        isFetchingCurrentUser: true,
        didInvalidateCurrentUser: false
      };
    // Upon getting the current user, return it and set loading and error to false
    case userConstants.GETCURRENT_SUCCESS:
      return {
        ...state,
        isFetchingCurrentUser: false,
        didInvalidateCurrentUser: false,
        currentUser: action.users
      };
    // Upon failing to get the current user, set errors to true
    case userConstants.GETCURRENT_FAILURE:
      return { 
        ...state,
        didInvalidateCurrentUser: true
      };
      
   /* case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
      */
    default:
      return state
  }
}