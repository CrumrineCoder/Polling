import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/users.actions.js';

class Current extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    //localStorage["token"]

    handleSubmit() {
 /*       return axios.get('/api/users/current').then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            }); */
            const { dispatch } = this.props;
            dispatch(userActions.getAll());
    }
   
    render() {
        return (
            <div className="form">
                <button onClick={this.handleSubmit} className="btn btn-primary float-right">Current</button>
            </div>
        )
    }
}

function mapStateToProps(state) { 
    const { userInteraction } = state.home.users;
    return {
        userInteraction
    };
}

export default connect(mapStateToProps)(Current);