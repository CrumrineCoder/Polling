
//import config from 'config';
import { authHeader } from '../_helpers/auth-header.js';
import mongoose from 'mongoose';

export const pollService = {
    createPoll,
    getAll, 
    votePoll,
    votePollUserAnswer,
    votePollMultiple,
    getOne
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
    console.log("Meat's back on the menu boys");
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(poll)
    };
    return fetch(`/api/polls/voteMultiple`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/api/polls/get/`, requestOptions).then(handleResponse);
}


function getOne(poll) {
    console.log("Service", poll); 
    const requestOptions = {
        method: 'GET'
    };
    if(poll === null){
        return fetch("api/polls/get/", requestOptions).then(handleResponse);
    }
    var id = mongoose.Types.ObjectId(poll);
    console.log("ID", id); 
    
    return fetch("api/polls/get/"+id, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
              //  logout();
           //     location.reload(true);
                console.log("reload");
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}



/*


export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}



function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

*/