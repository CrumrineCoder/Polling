import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { userActions } from '../../_actions/users.actions.js';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.props.dispatch(userActions.logout());

        this.state = {
            email: '', password: '', from: ''
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let { from } = this.props.location.state || { from: { pathname: '' } }
        if (from.pathname === "/login" || from.pathname === "/") {
            from = { from: { pathname: '' } }
        }
        this.setState({ from: from })
    }


    handleSubmit() {
        var { email, password, from } = this.state;
        const { dispatch } = this.props;

        dispatch(userActions.login({ email, password, from }));
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
                    />
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { logging } = state.home.authenticate;
    return {
        logging
    };
}

export default connect(mapStateToProps)(LoginForm);