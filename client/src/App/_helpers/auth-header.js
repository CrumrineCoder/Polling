
// return authorization header with jwt token
export function authHeader() {
    // get the current user 
    let user = JSON.parse(localStorage.getItem('user'));
    // if the user is logged in and has a token
    if (user && user.token) {
        // return authorized
        return { 'Authorization': 'Token ' + user.token };
    } else {
        // return unauthorized
        return {};
    }
}