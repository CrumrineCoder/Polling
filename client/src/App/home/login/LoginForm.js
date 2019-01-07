import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        // Log out the user upon entering (When logged in, they'll see this page as 'logout', and when not logged in, well it doesn't matter)
        this.props.dispatch(userActions.logout());

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
        // TO DO: VALIDATION
        // Request the back end to login the user
        dispatch(userActions.login({ email, password, from }));
    }

     // For form control
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="form">
                <Container>
                    <h3>Login</h3>
                    <input
                        onChange={(ev) => this.handleChangeField('email', ev)}
                        value={email}
                        className="form-control my-3"
                        placeholder="Email"
                    />
                    <input
                        onChange={(ev) => this.handleChangeField('password', ev)}
                        value={password}
                        className="form-control my-3"
                        placeholder="password"
                        type="password" 
                    />
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                </Container>
            </div>
        )
    }
}

// Authentication actions, from authentication.reducers.js
function mapStateToProps(state) {
    const { logging } = state.home.authenticate;
    return {
        logging
    };
}

export default connect(mapStateToProps)(LoginForm);