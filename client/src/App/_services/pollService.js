import mongoose from 'mongoose';

export const pollService = {
    createPoll, 
    votePollAnswer,
    votePollUserAnswer,
    votePollCreateUserAnswer,
    votePollMultiple,
    get,
    rescind,
    checkExistence
}

// make a post request with a created poll to the backend
function createPoll(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/createPoll`, requestOptions).then(handleResponse);
}

// make a post request with a single vote on a poll creator answer
function votePollAnswer(poll) {
     const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(poll)
     };
     return fetch(`/api/polls/voteAnswer`, requestOptions).then(handleResponse);
 }

 // make a post request with a single vote on a user answer
 function votePollUserAnswer(poll) {
     const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(poll)
     };
     return fetch(`/api/polls/voteUserAnswer`, requestOptions).then(handleResponse);
 }

 // make a post request with a single created user answer
function votePollCreateUserAnswer(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/userVote`, requestOptions).then(handleResponse);
}

// make a post request with multiple votes
function votePollMultiple(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/voteMultiple`, requestOptions).then(handleResponse);
}

// make a post request rescinding the user's votes
function rescind(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/rescind`, requestOptions).then(handleResponse);
}

// make a GET request to get poll(s) data
function get(poll) {
    const requestOptions = {
        method: 'GET'
    };

    // if the incoming Poll id is set to "All", that means get all polls
    if(poll === "All"){
        return fetch("api/polls/get/", requestOptions).then(handleResponse);
    } 
    // Or if we have just one ID, get one poll
    else {
        var id = mongoose.Types.ObjectId(poll);
         return fetch("api/polls/get/"+id, requestOptions).then(handleResponse);
    }
}

// make a GET request to get poll(s) data
function checkExistence(question) {
    console.log("POLL SERVICE", question); 
    const requestOptions = {
        method: 'GET'
    };
    console.log("POLL SERVICE", question); 
    return fetch("api/polls/checkExistence/"+question, requestOptions).then(handleResponse);
}

// error handling if there is one and returning data to the front end after getting it from the backend
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}