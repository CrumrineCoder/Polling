import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import validator from 'validator';

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

    componentWillReceiveProps(newProps){
        if(newProps.checkUsers.exists){
            alert("Your username is taken.");
        }
    }

    // Submit a registration request
    handleSubmit() {
        var { email, password } = this.state;
        const { dispatch } = this.props;
        this.setState({ submitted: true });
        console.log(email);
        console.log(password);
        dispatch(userActions.register(email, password));
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
                    <h3>Register </h3>
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

// get the create poll actions for dispatching
function mapStateToProps(state) {
    const checkUsers = state.home.checkUsers;
    return {
        checkUsers
    };
}

export default connect(mapStateToProps)(RegisterForm);