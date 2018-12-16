import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router";
import { connect } from 'react-redux';
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
import { userActions } from '../App/_actions/users.actions.js';

/*
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
) */


class PrivateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isAuthenticated: false
    }
  }
  componentDidMount() {
    /*   this.authenticate()
       this.unlisten = this.props.history.listen(() => {
         Auth.currentAuthenticatedUser()
           .then(user => console.log('user: ', user))
           .catch(() => {
             if (this.state.isAuthenticated) this.setState({ isAuthenticated: false })
           })
       }); */
    const { dispatch } = this.props;
    console.log("JET SET RADIO", dispatch(userActions.getAll()));
  }
  componentWillUnmount() {
    //   this.unlisten()
  }
  authenticate() {
    /*  Auth.currentAuthenticatedUser()
        .then(() => {
          this.setState({ loaded: true, isAuthenticated: true })
        })
        .catch(() => this.props.history.push('/auth')) */
  }
  render() {
    console.log("PRIVATE ROUTEPROPS", this.props);
    console.log("TEST", this.state);
    const { component: Component, ...rest } = this.props;
    const { loaded, isAuthenticated } = this.state
    let pageContent = '';
    if(this.props.users.didInvalidateCurrentUser){
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
    else if (this.props.users.isFetchingCurrentUser) {
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
            <Component {...props} />
        )} />
        )
      )
    }
    //  const { loaded, isAuthenticated } = this.state
    // if (!loaded) return null
    //{this.props.users.items.user.email} 
    return (
      <div>{pageContent}</div>
    )
    /*      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/auth",
                }}
              />
            )
        }}
      /> */
  }
}

//PrivateRoute = withRouter(PrivateRoute)
function mapStateToProps(state) {
  const { users } = state.home;
  console.log("MAP STATE USERS", users);
  return {
    users
  };
}

PrivateRoute = withRouter(connect(mapStateToProps)(PrivateRoute));
/*
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    console.log("THIS.PROPS", this.props);
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    console.log("THIS.PROPS", this.props);
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}
*/
export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/register" component={Register} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/:id/vote/" component={PollShow} />
    <PrivateRoute path="/:id/results/" component={Result} />
    <Route component={PageNotFound} />
  </Switch>
);
