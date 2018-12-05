import { pollConstants } from '../_constants/pollConstants.js';
import { pollService } from '../_services/pollService.js';
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';

export const pollActions = {
    createPoll,
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

function selectPoll(poll) { return { type: pollConstants.GET_SELECT, poll } }

function receiveVotes(poll, json) {
    if(poll ==="All"){
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