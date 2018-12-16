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
    getAll, 
    logout
};

function login(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({user })
    };

    return fetch(`api/users/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            user = user.user; 
            // login successful if there's a jwt token in the response
            if (user.token) {        
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    console.log("LOG OUT IS CALLED"); 
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function getAll() {
    console.log("GET ALL USER SERVICE");
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("REQUEST OPTIONS", requestOptions);
    return fetch(`api/users/current`, requestOptions).then(handleResponse);
}
/*
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
} */

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('api/users/register', requestOptions).then(handleResponse);
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

function handleResponse(response) {
    console.log("RESPONSE", response); 
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log("DATA INSIDEER", data); 
        if (!response.ok) {
            console.log("beep");
            if (response.status === 401) {
                console.log("Boop");
                console.log("UNAUTHORIZED DATA", data); 
                // auto logout if 401 response returned from api
               logout();
        //        location.reload(true);
                console.log("logout");
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        console.log("DATA TO SEND BACK", data); 
        return data;
    });
}