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
    rescind,
    checkExistence,
    editPoll,
    deletePoll
}

function checkExistence(question, poll) {
    return dispatch => {
        dispatch(requestCheck(question))
        pollService.checkExistence(question)
            .then(exists => { 
                if (!exists) {
                     dispatch(createPoll(poll)) 
                }
                 else { 
                     dispatch(pollExists(exists))
                }
            })
        //console.log("Repsonse!" + response))
    }
    function requestCheck(question) { return { type: pollConstants.CHECK_POLL_REQUEST, question } }
    function pollExists(exists) { return { type: pollConstants.CHECK_POLL_SUCCESS, exists } }
}

// Dispatched from: Form.js
// Param: a question, a set of answers, selected options, and the user who created the poll
// Function: Create a poll and redirect the user to the voting page. 
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


function editPoll(poll) {
    return dispatch => {
        dispatch(request(poll));
        pollService.editPoll(poll)
            .then(
                poll => {
                    dispatch(success());
                    history.push("");
                    history.push(poll._id + "/vote");
                    dispatch(alertActions.success('Edit Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(poll) { return { type: pollConstants.EDIT_POLL_REQUEST, poll } }
    function success(poll) { return { type: pollConstants.EDIT_POLL_SUCCESS, poll } }
    function failure(error) { return { type: pollConstants.EDIT_POLL_FAILURE, error } }
}

function deletePoll(id) {
    return dispatch => {
        dispatch(request(id));
        pollService.deletePoll(id)
            .then(
                id => {
                    dispatch(success());
                    history.push("");
                    history.push("profile");
                    dispatch(alertActions.success('Edit Poll Successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }
    function request(id) { return { type: pollConstants.DELETE_POLL_REQUEST, id } }
    function success(id) { return { type: pollConstants.DELETE_POLL_SUCCESS, id } }
    function failure(error) { return { type: pollConstants.DELETE_POLL_FAILURE, error } }
}

// Dispatched from: Poll.js
// Param: id of the answer, the polls that have been selected, and the user who voted 
// Function: Vote on a poll-creator answer poll and redirect the user to the results page. 
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

// Dispatched from: Poll.js
// Param: id of the answer, the polls that have been selected, and the user who voted 
// Function: Vote on a user answer for a poll and redirect the user to the results page. 
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

// Dispatched from: Poll.js
// Param: id of the answer, the polls that have been selected, and the user who voted 
// Function: Create a user answer for a poll and redirect to the results page.
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

// Dispatched from: Poll.js
// Param: id of the poll, the poll answer to be submitted, and the user who voted 
// Function: Vote on a user answer for a poll and redirect the user to the results page. 
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

// Dispatched from: ResultContainer.js
// Param: user who is rescinding, the id of the poll, the number of answers, the number of user answers.
// Function: Rescind a user's vote and redirect the user to the voting page. 
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

// Dispatched from: HomePage.js, PollContainer.js, ResultContainer.js
// Param: id of a poll or the string "All"
// Function: Select a poll in the Redux state for use getting polls from the back end. 
function selectPoll(poll) {
    return { type: pollConstants.GET_SELECT, poll }
}

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

// Dispatched from: poll.actions.js
// Param: id of a poll or the string "All"
// Function: Get  polls from the backend. 
function fetchVotes(poll) {
    return dispatch => {
        dispatch(requestVotes(poll))
        pollService.get(poll)
            .then(json => dispatch(receiveVotes(poll, json)))
    }
    function requestVotes(poll) { return { type: pollConstants.GET_REQUEST, poll } }
}

// Dispatched from: poll.actions.js
// Param: Redux state, id of a poll or the string "All"
// Function: If there's no votes already, return true. If we're fetching votes, return false. If there's an error, return it. 
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

// Dispatched from: HomePage.js, PollContainer.js, ResultContainer.js
// Param: id of a poll or the string "All"
// Function: Check if we should fetch votes, and if so, fetch votes. 
function fetchVotesIfNeeded(poll) {
    return (dispatch, getState) => {
        if (shouldFetchVotes(getState(), poll)) {
            return dispatch(fetchVotes(poll))
        }
    }
}