import mongoose from 'mongoose';

export const pollService = {
    createPoll,
    votePollAnswer,
    votePollUserAnswer,
    votePollCreateUserAnswer,
    votePollMultiple,
    get,
    rescind,
    checkExistence,
    editPoll,
    deletePoll
}

// make a post request with a created poll to the backend
function createPoll(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/createPoll`, requestOptions).then(handleResponse);
}

function editPoll(poll) {
    //    let body = JSON.stringify({poll: poll, shouldReset: shouldReset });
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/editPoll`, requestOptions).then(handleResponse);
}

function deletePoll(id) {
    //    let body = JSON.stringify({poll: poll, shouldReset: shouldReset });
    const requestOptions = {
        method: 'POST'
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/deletePoll/` + id, requestOptions).then(handleResponse);
}

// make a post request with a single vote on a poll creator answer
function votePollAnswer(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/votePollAnswer/`, requestOptions).then(handleResponse);
}

// make a post request with a single vote on a user answer
function votePollUserAnswer(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/voteUserAnswer`, requestOptions).then(handleResponse);
}

// make a post request with a single created user answer
function votePollCreateUserAnswer(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/userVote`, requestOptions).then(handleResponse);
}

// make a post request with multiple votes
function votePollMultiple(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/voteMultiple`, requestOptions).then(handleResponse);
}

// make a post request rescinding the user's votes
function rescind(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/polls/rescind`, requestOptions).then(handleResponse);
}

// make a GET request to get poll(s) data
function get(poll) {
    const requestOptions = {
        method: 'GET'
    };

    // if the incoming Poll id is set to "All", that means get all polls
    if (poll === "All") {
        return fetch("http://localhost:5001/polling-269dc/us-central1/app/api/polls/get", requestOptions).then(handleResponse);
    }
    // Or if we have just one ID, get one poll
    else {
      //  var id = mongoose.Types.ObjectId(poll);
       return fetch("http://localhost:5001/polling-269dc/us-central1/app/api/polls/get/" + poll, requestOptions).then(handleResponse);
    }
}

// make a GET request to get poll(s) data
function checkExistence(question) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch("http://localhost:5001/polling-269dc/us-central1/app/api/polls/checkExistence/" + question, requestOptions).then(handleResponse);
}

// error handling if there is one and returning data to the front end after getting it from the backend
function handleResponse(response) {
    //  console.log(response.text());
    return response.text().then(text => {
        //  console.log((JSON.parse(text).polls).find(x => x.creator == "5c489f668665512ec004db37"))
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            console.log(error);
            return Promise.reject(error);
        }
        return data;
    });
}