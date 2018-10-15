import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: ''
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const { onSubmit } = this.props;
        var { question } = this.state;
        //      if (!articleToEdit) {
        return axios.post('/api/polls', {
            question
        })
            .then((res) => onSubmit(res.data))
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

const mapStateToProps = state => ({
    pollToEdit: state.home.pollToEdit,
});

const mapDispatchToProps = dispatch => ({
    onSubmit: data => dispatch({ type: 'MAKE_POLL_START', data })
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);