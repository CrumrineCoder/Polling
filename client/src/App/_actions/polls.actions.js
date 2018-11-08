/*import {
    MAKE_POLL_START,
    MAKE_POLL_SUCCESS,
    MAKE_POLL_FAILED
  } from '../constants/pollConstants'
*/

import { pollConstants } from '../_constants/pollConstants.js';
import { pollService } from '../_services/pollService.js';
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';

export const pollActions = {
    createPoll,
    getAll, 
    votePoll
}

function createPoll(poll){
    return  dispatch  => {
        dispatch(request(poll));
        pollService.createPoll(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push(poll.poll._id + "/vote");
                    dispatch(alertActions.success('Create Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { console.log("REQUEST"); return { type: pollConstants.POLL_REGISTER_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_REGISTER_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_REGISTER_FAILURE, error } }
}
function votePoll(poll){
    console.log("SNACK AND BEANS!", poll); 
    return  dispatch  => {
        dispatch(request(poll));
        pollService.votePoll(poll)
            .then(
                poll => {
                    console.log(poll); 
                    dispatch(success());
                    history.push("/results");
                    dispatch(alertActions.success('Vote Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { console.log("REQUEST"); return { type: pollConstants.POLL_VOTE_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        pollService.getAll()
            .then(
                polls => dispatch(success(polls)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: pollConstants.GETALL_REQUEST } }
    function success(polls) { return { type: pollConstants.GETALL_SUCCESS, polls } }
    function failure(error) { return { type: pollConstants.GETALL_FAILURE, error } }
}





/*


export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
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

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

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