import mongoose from 'mongoose';

export const pollService = {
    createPoll, 
    votePoll,
    votePollUserAnswer,
    votePollMultiple,
    get,
    rescind
}

function createPoll(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/createPoll`, requestOptions).then(handleResponse);
}

function votePoll(poll) {
    console.log(poll);
     const requestOptions = {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(poll)
     };
     return fetch(`/api/polls/vote`, requestOptions).then(handleResponse);
 }

function votePollUserAnswer(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/userVote`, requestOptions).then(handleResponse);
}

function votePollMultiple(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/voteMultiple`, requestOptions).then(handleResponse);
}

function rescind(poll) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/rescind`, requestOptions).then(handleResponse);
}

function get(poll) {
    const requestOptions = {
        method: 'GET'
    };

    if(poll === "All"){
        return fetch("api/polls/get/", requestOptions).then(handleResponse);
    }
    var id = mongoose.Types.ObjectId(poll);
    return fetch("api/polls/get/"+id, requestOptions).then(handleResponse);
}

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