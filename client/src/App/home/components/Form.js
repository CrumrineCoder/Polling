import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';
import { Link } from 'react-router-dom';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answers: [
                { text: '', value: 0 },
                { text: '', value: 0 }
            ],
            options: {
                MultipleAnswers: false,
                UserAnswers: false,
                Rescind: false,
                SeeResults: false
            },
            linked: false,
            submitted: false
        };
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.goToResults = this.goToResults.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleLinkedClick = this.handleLinkedClick.bind(this);
    }

    goToResults(id) {
        this.props.history.push("polls/" + id);
    }

    handleSubmit() {
        var { question, answers, options, linked } = this.state;
        const { dispatch } = this.props;
        let creator;


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

        if (question === "") {
            alert("You must supply a question.");
        }
        else if (answers.length < 2) {
            alert("You need two or more non-empty non-duplicate answers for your poll to submit.");
        } else {
            this.setState({ submitted: true });
            if (linked) {
                creator = JSON.parse(localStorage.getItem('user')).id;
            } else {
                creator = undefined;
            }
            dispatch(pollActions.createPoll({ question, answers, options, creator }));
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

    handleLinkedClick() {
        this.setState({ linked: !this.state.linked });
    }

    // For Options
    handleOptionChange(e) {
        let options = { ...this.state.options };
        options[e.target.value] = !options[e.target.value];
        this.setState({ options });
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
        const { question } = this.state;
        let linkPoll;
        if (JSON.parse(localStorage.getItem('user')) === null) {
            linkPoll = (
                <div>
                    <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to link this poll with your account and edit the poll after creation.
                </div>
            )
        } else {
            linkPoll = (
                <label><input type="checkbox" checked={this.state.linked} onChange={this.handleLinkedClick} name="user" value="LinkPoll" /> Link Poll to my user account </label>
            )
        }
        return (
            <div className="form">
                <h1>Create Poll</h1>
                <div id="rightPoll">
                    <h4>Options</h4>
                    {linkPoll}
                    <label><input type="checkbox" checked={this.state.options.MultipleAnswers} onChange={this.handleOptionChange} name="options" value="MultipleAnswers" /> Allow users to select more than one poll answer </label>
                    <label><input type="checkbox" checked={this.state.options.UserAnswers} onChange={this.handleOptionChange} name="options" value="UserAnswers" /> Allow users to create poll answers </label>
                    <label><input type="checkbox" checked={this.state.options.Rescind} onChange={this.handleOptionChange} name="options" value="Rescind" /> Allow users to rescind their vote </label>
                    <label><input type="checkbox" checked={this.state.options.SeeResults} onChange={this.handleOptionChange} name="options" value="SeeResults" /> Allow users to see the results before voting </label>
                </div>
                <div id="leftPoll">
                    <h3>Question and Answers</h3>
                    <input
                        onChange={(ev) => this.handleChangeField('question', ev)}
                        value={question}
                        className="form-control my-3"
                        placeholder="Poll Question"
                    />
                    <button type="button" onClick={this.handleAddAnswer} className="small btn btn-secondary" id="addAnswer">Add Answer</button>
                    {this.state.answers.map((answer, idx) => (
                        <div className="answer" key={idx}>
                            <input
                                type="text"
                                placeholder={`Answer #${idx + 1}`}
                                value={answer.text}
                                onChange={this.handleAnswerTextChange(idx)}
                                className="form-control"
                            />
                            <button type="button" onClick={this.handleRemoveAnswer(idx)} className="small answerDeleteButton"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    ))}
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right" id="pollSubmitButton">Submit</button>
                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    const { creating } = state.home.createPoll;
    return {
        creating
    };
}

export default connect(mapStateToProps)(Form);