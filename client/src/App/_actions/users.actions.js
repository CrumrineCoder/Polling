import { userConstants } from '../_constants/user.constants.js';
import { userService } from '../_services/userService.js';
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';

export const userActions = {
    /* login,
     logout,
     register,
     getAll,
     delete: _delete */
    register,
    login,
    getCurrent,
    logout,
    checkExistence
};

// Dispatched from: LoginForm.js
// Param: username and password object with a location of where the user was before  coming to  the login page
// Function: Send a login request to the back end and redirect the user to where they came from
function login(user) {
    let from = user.from.pathname; 
    return dispatch => {
        dispatch(request(user));
        userService.login(user)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push(from);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

// Dispatched from: LoginForm.js
// Param:
// Function: Remove the user from local storage
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function checkExistence(email, user) {
    return dispatch => {
        dispatch(requestCheck(email))
        userService.checkExistence(email)
            .then(exists => { 
                if (!exists) {
                     dispatch(register(user)) 
                }
                 else { 
                     dispatch(userExists(exists))
                }
            })
        //console.log("Repsonse!" + response))
    }
    function requestCheck(email) { return { type: userConstants.CHECK_USER_REQUEST, email } }
    function userExists(exists) { return { type: userConstants.CHECK_USER_SUCCESS, exists } }
}

// Dispatched from: RegisterForm.js
// Param: username and password
// Function: Send a register request to the back end and redirect the user to the login page
function register(user) {
    console.log("registeraction", user); 
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

// Dispatched from: routes.js, Poll.js
// Param:
// Function: Return the user who is logged in
function getCurrent() {
    return dispatch => {
        dispatch(request());
        console.log("Get Current User Action");
        userService.getCurrent()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

   

    function request() { return { type: userConstants.GETCURRENT_REQUEST } }
    function success(users) { return { type: userConstants.GETCURRENT_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETCURRENT_FAILURE, error } }
}
/*
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}
*/