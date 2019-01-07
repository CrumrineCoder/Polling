import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        // User's email, password, and if the form is submitted or not. 
        this.state = {
            email: '', password: '', submitted: false
        };
        // Bind action creators to state. 
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Submit a registration request
    handleSubmit() {
        var { email, password } = this.state;
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        dispatch(userActions.register({ email, password }));
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
                    <h3>Register </h3>
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

// Register actions, from register.reducer.js
function mapStateToProps(state) {
    const { registration } = state.home.register;
    return {
        registration
    };
}

export default connect(mapStateToProps)(RegisterForm);