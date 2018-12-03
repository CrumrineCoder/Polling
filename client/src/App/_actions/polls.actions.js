import { pollConstants } from '../_constants/pollConstants.js';
import { pollService } from '../_services/pollService.js';
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';

export const pollActions = {
    createPoll,
    getAll,
    votePoll,
    votePollUserAnswer,
    votePollMultiple,
    fetchVotesIfNeeded,
    selectPoll
}

function createPoll(poll) {
    return dispatch => {
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
    function request(poll) { return { type: pollConstants.POLL_REGISTER_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_REGISTER_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_REGISTER_FAILURE, error } }
}
function votePoll(poll) {
    return dispatch => {
        dispatch(request(poll));
        pollService.votePoll(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push("");
                    history.push(poll._id + "/results/");
                    dispatch(alertActions.success('Vote Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { return { type: pollConstants.POLL_VOTE_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_FAILURE, error } }
}

function votePollUserAnswer(poll) {
    return dispatch => {
        var id = poll._parentID;
        dispatch(request(poll));
        pollService.votePollUserAnswer(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push("");
                    history.push(id + "/results/");
                    dispatch(alertActions.success('Vote Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { return { type: pollConstants.POLL_USER_VOTE_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_USER_VOTE_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_USER_VOTE_FAILURE, error } }
}

function votePollMultiple(poll) {
    return dispatch => {
        var id = poll._parentID;
        dispatch(request(poll));
        pollService.votePollMultiple(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push("");
                    history.push(id + "/results/");
                    dispatch(alertActions.success('Vote Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { return { type: pollConstants.POLL_VOTE_MULTIPLE_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_MULTIPLE_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_MULTIPLE_FAILURE, error } }
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

    function request(polls) { return { type: pollConstants.GETALL_REQUEST, polls } }
    function success(polls) { return { type: pollConstants.GETALL_SUCCESS, polls } }
    function failure(error) { return { type: pollConstants.GETALL_FAILURE, error } }
}

function selectPoll(poll) { return { type: pollConstants.GETONE_SELECT, poll } }

function receiveVotes(poll, json) {
    console.log("RECIEVED VOTES POLL", poll);
    console.log("RECEIVED VOTES JSON", json);
    return {
        type: pollConstants.GETONE_SUCCESS,
        poll,
        votes: json,
        receivedAt: Date.now()
    }
}
function fetchVotes(poll) {
    console.log("Fetch Votes Poll (poll):", poll);
    return dispatch => {
        dispatch(requestVotes(poll))
        pollService.getOne(poll)
            //      .then(response => response.json())
            .then(json => dispatch(receiveVotes(poll, json)))
    }
    function requestVotes(poll) { return { type: pollConstants.GETONE_REQUEST, poll } }
}
function shouldFetchVotes(state, poll) {
    console.log("ShouldFetchVotes");
    console.log("State", state);
    console.log("Poll", poll);
    const votes = state.home.votesByPoll[poll]
    console.log("votes", votes);
    if (!votes) {
        return true
    } else if (votes.isFetching) {
        return false
    } else {
        return votes.didInvalidate
    }
}
function fetchVotesIfNeeded(poll) {
    console.log("fetchVotesIfNeeded (poll)", poll);
    if(poll === undefined){
        poll = null; 
    }
    return (dispatch, getState) => {
        if (shouldFetchVotes(getState(), poll)) {
            return dispatch(fetchVotes(poll))
        }
    }
}
  /*
function getOne(poll) {
    console.log("Actions", poll);
    return dispatch => {
        dispatch(request(poll));

        pollService.getOne(poll)
            .then(
                console.log("PollService GetOne", poll),
                polls => dispatch(success(polls)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: pollConstants.GETONE_REQUEST, loading } }
    function success(polls) { return { type: pollConstants.GETONE_SUCCESS, polls } }
    function failure(error) { return { type: pollConstants.GETONE_FAILURE, error } }
}
*/


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