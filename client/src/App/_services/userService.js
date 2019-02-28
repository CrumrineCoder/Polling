//import config from 'config';
import { authHeader } from '../_helpers/auth-header.js';

export const userService = {
    /* login,
     logout,
     register,
     getAll,
     getById,
     update,
     delete: _delete */
    register,
    login,
    getCurrent,
    logout,
    checkExistence
};

// login the user
function login(user) {
    // make a post request
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user })
    };

    return fetch(`http://localhost:5001/polling-269dc/us-central1/app/api/users/login`, requestOptions).then(handleResponse)
    /*   .then(user => {
           // Upon getting data from the backend, get the user
           user = user.user
           // login successful if there's a jwt token in the response
           if (user.token) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
               localStorage.setItem('user', JSON.stringify(user));
           }
           return user;
       }); */
}

// log out the user
function logout() {
    // remove user from local storage to log user out
    //  localStorage.removeItem('user');
    const requestOptions = {
        method: 'POST'
    };
    return fetch("https://us-central1-polling-269dc.cloudfunctions.net/app/api/users/logout/", requestOptions).then(handleResponse);
}

// get the current user
function getCurrent() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch("https://us-central1-polling-269dc.cloudfunctions.net/app/api/users/current", requestOptions).then(handleResponse);
}
/*
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
} */

// make a GET request to get poll(s) data
function checkExistence(user) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch("api/users/checkExistence/" + user, requestOptions).then(handleResponse);
}

//  registera user
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    
    return fetch('http://localhost:5001/polling-269dc/us-central1/app/api/users/register/', requestOptions).then(handleResponse);
}
/*
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
} */

// handle errors and if there's a 401 (unauthorized response), log the user out, otherwise send the data to the frontend
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //        location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}