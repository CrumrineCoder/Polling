import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

class RegisterForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', password: '', submitted: false
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var { email, password } = this.state;
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        dispatch(userActions.register({ email, password }));
    }
    // For Question
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
                    />
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { registration } = state.home.register;
    return {
        registration
    };
}

export default connect(mapStateToProps)(RegisterForm);