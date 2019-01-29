import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router";
import { connect } from 'react-redux';
//, Redirect
//import { withRouter } from 'react-router-dom';
//import axios from "axios";

// Import modules/routes
import Home from "./home";
//import Login from "./login";
import Profile from "./profile";
import PollShow from "./poll";
import Edit from "./profile/edit";
import Result from "./result";
import PageNotFound from "./common/components/PageNotFound";
import Login from "./home/login/LoginForm";
import Register from "./home/login/RegisterForm";
import { userActions } from '../App/_actions/users.actions.js';

// Private route that redirects the user if they're not logged in to the login page
class PrivateRoute extends React.Component {

  // Upon the first render, check if the user is logged in 
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getCurrent());
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { didInvalidateCurrentUser, isFetchingCurrentUser } = this.props.users;
    let pageContent = '';

    // If there is no current user
    if(didInvalidateCurrentUser){
      // Reroute the user to the login page, and send data about where they came from
      pageContent = (
        (
          <Route {...rest} render={props => (
            localStorage.getItem('user')
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
        )
      )
    }
    // If we're still checking who is logged in, tell the user we're validating
    else if (isFetchingCurrentUser) {
      pageContent = (
        <div className="pollsLoader">
            Validating...
      	</div>
      )
    } 
    // The user is logged in, so show them the route as normal
    else{
      pageContent = (
        (
          <Route {...rest} render={props => (
        
            <div> <Component {...props} /></div>
        )} />
        )
      )
    }

    return (
      <div>{pageContent}</div>
    )

  }
}

function mapStateToProps(state) {
  const { users } = state.home;

  return {
    users
  };
  
}

PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRoute));

export default (
  <Switch>
    <Route exact path="/" component={Home} />
  
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/:id/vote/" component={PollShow} />
    <PrivateRoute path="/:id/results/" component={Result} />
    <PrivateRoute path="/profile" component={Profile} />
    <PrivateRoute path="/:id/edit/" component={Edit} />
    <Route component={PageNotFound} />
  </Switch>
);
