import { userConstants } from '../_constants/user.constants.js';
const initialState = {
  isFetchingCurrentUser: false,
  didInvalidateCurrentUser: false,
  currentUser: {}
}
export default function users(state = initialState, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        isFetchingCurrentUser: true,
        didInvalidateCurrentUser: false
      };
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        isFetchingCurrentUser: false,
        didInvalidateCurrentUser: false,
        currentUser: action.users
      };
    case userConstants.GETALL_FAILURE:
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