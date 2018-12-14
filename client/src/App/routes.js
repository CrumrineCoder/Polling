import React from "react";
import { Route, Switch, Redirect } from "react-router";
//, Redirect
//import { withRouter } from 'react-router-dom';
//import axios from "axios";

// Import modules/routes
import Home from "./home";
import About from "./about";
//import Login from "./login";
import PollShow from "./poll";
import Result from "./result";
import PageNotFound from "./common/components/PageNotFound";
import Login from "./home/login/LoginForm";
import Register from "./home/login/RegisterForm";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)

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

export default (
  <Switch>  
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/:id/vote/" component={PollShow} />
    <PrivateRoute path="/:id/results/" component={Result} />
    <Route component={PageNotFound} />
  </Switch>
);
