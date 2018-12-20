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
import Result from "./result";
import PageNotFound from "./common/components/PageNotFound";
import Login from "./home/login/LoginForm";
import Register from "./home/login/RegisterForm";
import { userActions } from '../App/_actions/users.actions.js';

class PrivateRoute extends React.Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userActions.getAll());
  }

  render() {
    const { component: Component, ...rest } = this.props;
    const { didInvalidateCurrentUser, isFetchingCurrentUser } = this.props.users;
    let pageContent = '';

    if(didInvalidateCurrentUser){
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

    else if (isFetchingCurrentUser) {
      pageContent = (
        <div className="pollsLoader">
            Validating...
      	</div>
      )
    } 

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
    <Route path="/profile" component={Profile} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <Route path="/:id/vote/" component={PollShow} />
    <PrivateRoute path="/:id/results/" component={Result} />
    <Route component={PageNotFound} />
  </Switch>
);
