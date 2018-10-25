import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Current extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        return axios.get('/api/users/current').then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log('error ' + error);
            });
    }
   
    render() {
        return (
            <div className="form">
                <button onClick={this.handleSubmit} className="btn btn-primary float-right">Current</button>
            </div>
        )
    }
}

export default withRouter(Current);