import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: ''
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToResults = this.goToResults.bind(this);
    }

    goToResults(id) {
        this.props.history.push("polls/" + id); // for react-router@3 it would be this.props.router.push('/some/location');
    }

    handleSubmit() {
        var { question } = this.state;
        //      if (!articleToEdit) {
        return axios.post('/api/polls', {
            question
        })
            .then(response => {
                this.goToResults(response.data.poll._id)
            })
            .then(() => this.setState({ question: '' }));
        //    }
        /*else {
               return axios.patch(`http://localhost:5000/api/articles/${articleToEdit._id}`, {
                   title,
                   body,
                   tag,
               })
                   .then((res) => onEdit(res.data))
                   .then(() => this.setState({ title: '', body: EditorState.createEmpty(), tag: '' }));
           }*/
    }
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    render() {
        //    <button onClick={this.handleSearchChange}>Search</button>
        //value={this.state.inputValue}
        const { question } = this.state;
        return (
            <div className="form">
                <input
                    onChange={(ev) => this.handleChangeField('question', ev)}
                    value={question}
                    className="form-control my-3"
                    placeholder="Poll Question"
                />
                <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
            </div>
        )
    }
}

export default withRouter(Form);