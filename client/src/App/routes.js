import React from "react";
import { Route, Switch, Redirect } from "react-router";
import axios from "axios";

// Import modules/routes
import Home from "./home";
import About from "./about";
import Login from "./login";
import PollShow from "./home/poll";
import PageNotFound from "./common/components/PageNotFound";

/*
const AuthString = 'Bearer '.concat(USER_TOKEN); 
axios.get(URL, { headers: { Authorization: AuthString } })
 .then(response => {
     console.log(response.data);
  })
 .catch((error) => {
     console.log('error ' + error);
  });
  */
 /*

var isAuth;
function authenticate() {
  return axios.get("/api/user/auth").then(({ response }) => {
    return response;
  });
}
isAuth = authenticate();
console.log(isAuth);
*/

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
      this.isAuthenticated = true
      setTimeout(cb, 100)
  },
  signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login}/>
    <PrivateRoute path="/polls/results/:id/" component={About} />
    <Route path="/polls/:id/" component={PollShow} />
    <Route component={PageNotFound} />
  </Switch>
);
