import { pollConstants } from '../_constants/pollConstants.js';
import { pollService } from '../_services/pollService.js';
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';

export const pollActions = {
    createPoll,
    votePollAnswer,
    votePollUserAnswer,
    votePollCreateUserAnswer,
    votePollMultiple,
    fetchVotesIfNeeded,
    selectPoll,
    rescind
}

// Dispatched from: Form.js
// Param: a question, a set of answers, selected options, and the user who created the poll
// Function: call the createPoll service and handle action constants for the reducer when a user wants to create a poll. The function then redirects the user to the voting page for their poll.
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

function votePollAnswer(poll) {
    return dispatch => {
        dispatch(request(poll));
        pollService.votePollAnswer(poll)
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
    function request(poll) { return { type: pollConstants.POLL_VOTE_ANSWER_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_ANSWER_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_ANSWER_FAILURE, error } }
}


function votePollUserAnswer(poll) {
    return dispatch => {
        dispatch(request(poll));
        pollService.votePollUserAnswer(poll)
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
    function request(poll) { return { type: pollConstants.POLL_VOTE_USERANSWER_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_USERANSWER_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_USERANSWER_FAILURE, error } }
}

function votePollCreateUserAnswer(poll) {
    return dispatch => {
        var id = poll._parentID;
        dispatch(request(poll));
        pollService.votePollCreateUserAnswer(poll)
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
    function request(poll) { return { type: pollConstants.POLL_VOTE_CREATEUSERANSWER_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_VOTE_CREATEUSERANSWER_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_VOTE_CREATEUSERANSWER_FAILURE, error } }
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

function rescind(poll) {
    return dispatch => {
        var id = poll._parentID;
        dispatch(request(poll));
        pollService.rescind(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push("");
                    history.push(id + "/vote/");
                    dispatch(alertActions.success('Vote Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { return { type: pollConstants.POLL_RESCIND_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.POLL_RESCIND_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.POLL_RESCIND_FAILURE, error } }
}

function selectPoll(poll) { return { type: pollConstants.GET_SELECT, poll } }

function receiveVotes(poll, json) {
    if (poll === "All") {
        json = json.polls;
    }
    return {
        type: pollConstants.GET_SUCCESS,
        poll,
        votes: json,
        receivedAt: Date.now()
    }
}

function fetchVotes(poll) {

    return dispatch => {
        dispatch(requestVotes(poll))
        pollService.get(poll)
            .then(json => dispatch(receiveVotes(poll, json)))
    }
    function requestVotes(poll) { return { type: pollConstants.GET_REQUEST, poll } }
}

function shouldFetchVotes(state, poll) {
    const votes = state.home.votesByPoll[poll]
    if (!votes) {
        return true
    } else if (votes.isFetching) {
        return false
    } else {
        return votes.didInvalidate
    }
}

function fetchVotesIfNeeded(poll) {
    return (dispatch, getState) => {
        if (shouldFetchVotes(getState(), poll)) {
            return dispatch(fetchVotes(poll))
        }
    }
}