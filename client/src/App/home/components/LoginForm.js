import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/users.actions.js';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var { email, password } = this.state;
        const { dispatch } = this.props;
        dispatch(userActions.login({email, password}));
    }
    // For Question
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    render() {
        //    <button onClick={this.handleSearchChange}>Search</button>
        //value={this.state.inputValue}
        const { email, password } = this.state;
        return (
            <div className="form">
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
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.home); 
    const { logging } = state.home.authenticate;
    return {
        logging
    };
}

export default connect(mapStateToProps)(LoginForm);