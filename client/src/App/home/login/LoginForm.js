import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import validator from 'validator';
import fire from "../../common/components/Fire.js";
var auth = fire.auth();

class LoginForm extends Component {

    constructor(props) {
        super(props);
        // Log out the user upon entering (When logged in, they'll see this page as 'logout', and when not logged in, well it doesn't matter)
        this.props.dispatch(userActions.getCurrent());
      //  this.props.dispatch(userActions.logout());
      auth.signOut();
        // User's email, password, and where they came from are stored
        this.state = {
            email: '', password: '', from: ''
        };
        // Action creators are bound to the state
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Upon mounting, get where the user came from and set it to the state. This is used for redirecting the user after logging in. 
    componentDidMount() {
        let { from } = this.props.location.state || { from: { pathname: '' } }
        if (from.pathname === "/login" || from.pathname === "/") {
            from = { from: { pathname: '' } }
        }
        this.setState({ from: from })
    }

    // Submit a login request
    handleSubmit() {
        var { email, password, from } = this.state;
        const { dispatch } = this.props;

        // Request the back end to login the user
        //        dispatch(userActions.login({ email, password, from }));
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode || errorMessage) {
                console.log(errorCode);
                console.log(errorMessage);
                //  res.json(errorMessage)
            }
        });
    }

    // For form control
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        const { email, password } = this.state;
        const required = (value) => {
            if (!value.toString().trim().length) {
                // We can return string or jsx as the 'error' prop for the validated Component
                return <p class="warning">This value is required.</p>
            }
        };

        const requireEmail = (value) => {
            if (!validator.isEmail(value)) {
                return <p class="warning">{value} is not a valid email.</p>
            }
        };
        return (
            <Form className="form">
                <Container>
                    <h3>Login</h3>
                    <Input
                        onChange={(ev) => this.handleChangeField('email', ev)}
                        value={email}
                        className="form-control my-3"
                        placeholder="Email"
                        validations={[required, requireEmail]}
                    />
                    <Input
                        onChange={(ev) => this.handleChangeField('password', ev)}
                        value={password}
                        className="form-control my-3"
                        placeholder="password"
                        type="password"
                        validations={[required]}
                    />
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                </Container>
            </Form>
        )
    }
}

// Authentication actions, from authentication.reducers.js
function mapStateToProps(state) {
    const { logging } = state.home.authenticate;
    const { users } = state.home;
    const { isFetchingCurrentUser, currentUser } = users || {
        isFetchingCurrentUser: true,
        currentUser: {}
    }
    return {
        logging,
        isFetchingCurrentUser,
        currentUser
    };
}

export default connect(mapStateToProps)(LoginForm);