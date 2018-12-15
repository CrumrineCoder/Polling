export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        console.log("YO IT'S THE ", user.token);
        return { 'Authorization': 'Token ' + user.token };
    } else {
        console.log("NO USER TOKEN"); 
        return {};
    }
}