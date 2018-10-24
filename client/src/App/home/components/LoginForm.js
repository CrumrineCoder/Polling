import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

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


        return axios.post('/api/users', {
            email, password
        })
            .then(axios.get('/api/users/current')).then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
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

export default withRouter(LoginForm);