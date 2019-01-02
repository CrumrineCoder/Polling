import { userConstants } from '../_constants/user.constants.js';

// get current user
let user = JSON.parse(localStorage.getItem('user'));
// If the user is logged in, loggedIn is set to true and save the user, if not it's false
const initialState = user ? { loggedIn: true, user } : {loggedIn: false};

export default function authentication(state = initialState, action) {
  switch (action.type) {
    // on a login request, return a loading variable 'loggingIn' and set it to true as well as save the user
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    // on a login success, set loggedIn to true and save the user
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    // on a login failure, set loggedIn to false and don't save the user
    case userConstants.LOGIN_FAILURE:
      return {loggedIn: false};
    // on logout, set loggedIn to false
    case userConstants.LOGOUT:
      return {loggedIn: false};
    default:
      return state
  }
}