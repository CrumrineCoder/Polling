import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { withRouter } from 'react-router-dom';
import axios from "axios";

// Import modules/routes
import Home from "./home";
import About from "./about";
//import Login from "./login";
import PollShow from "./poll";
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
  isAuthenticated: true,
  authenticate(cb) {
    console.log("YOU'VE  JUST BEEN AUTHENTICATED!")
    this.isAuthenticated = true;
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }
  login = () => {
    fakeAuth.authenticate(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div>
        <p>You must log in to view the page</p>
        <button onClick={this.login}>Log in</button>
      </div>
    )
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome! <button onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out</button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated === true ? <Component {...props} /> : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    }
  />
);

export default (
  //  <AuthButton/>
  <Switch>  
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/polls/results/:id/" component={About} />
    <Route path="/polls/:id/" component={PollShow} />
    <Route component={PageNotFound} />
  </Switch>
);
