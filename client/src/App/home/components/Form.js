import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '', answers: [{ text: '', value: 0 }, { text: '', value: 0 }],
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToResults = this.goToResults.bind(this);
    }

    goToResults(id) {
        this.props.history.push("polls/" + id);
    }

    handleSubmit() {
        var { question, answers } = this.state;

        // Remove empty answers
        answers = answers.filter(function (el) {
            return el.text !== "";
        });

        // Remove duplicate answers
        answers = answers.filter((answer, index, self) =>
            index === self.findIndex((a) => (
                a.text === answer.text 
            ))
        )

        console.log("Answers", answers)
        if (question === "") {
            alert("You must supply a question.");
        }
        else if (answers.length < 2) {
            alert("You need two or more non-empty non-duplicate answers for your poll to submit.");
        } else {
            return axios.post('/api/polls', {
                question, answers
            })
                .then(response => {
                    this.goToResults(response.data.poll._id)
                })
                .then(() => this.setState({ question: '' }));
        }
    }
    // For Answers
    handleAnswerTextChange = (idx) => (evt) => {
        const newAnswers = this.state.answers.map((answer, sidx) => {
            if (idx !== sidx) return answer;
            return { ...answer, text: evt.target.value };
        });

        this.setState({ answers: newAnswers });
    }
    // For Question
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }
    handleAddAnswer = () => {
        this.setState({
            answers: this.state.answers.concat([{ text: '', value: 0 }])
        });
    }

    handleRemoveAnswer = (idx) => () => {
        this.setState({
            answers: this.state.answers.filter((s, sidx) => idx !== sidx)
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
                {this.state.answers.map((answer, idx) => (
                    <div className="answer">
                        <input
                            type="text"
                            placeholder={`Answer #${idx + 1}`}
                            value={answer.text}
                            onChange={this.handleAnswerTextChange(idx)}
                        />
                        <button type="button" onClick={this.handleRemoveAnswer(idx)} className="small">-</button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddAnswer} className="small">Add Answer</button>
                <button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
            </div>
        )
    }
}

export default withRouter(Form);