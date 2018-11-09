export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        console.log(user.token);
        return { 'Authorization': 'Token ' + user.token };
    } else {
        console.log("YOU GET NOTHING, GOOD DAY SIR!");
        return {};
    }
}