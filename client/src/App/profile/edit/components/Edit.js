import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../../_actions/polls.actions.js';
import { userActions } from '../../../_actions/users.actions.js';
import { Link } from 'react-router-dom';
import { history } from '../../../store.js';


class Edit extends Component {

    constructor(props) {
        super(props);
        const { dispatch } = this.props;
        // Get the current user, authentication
        dispatch(userActions.getCurrent());
        console.log("TELL ME THE PROPS", this.props);
        // selected is the votes selected by the user, userAnswer is the user created answer, _parentID is the id of the poll itself, isLoggedIn checks if the user is logged in, choiceType is whether the inputs to select votes are radio (single vote) or checkbox (multiple votes), optionChangeType keeps track of whether we're using multipleOptionChange or optionChange, submitType is  handleSubmit or handleMultipleSubmit, and submissionType is whether the user is voting on a poll answer, a user answer, creating a user answer, or multiple. 
        this.state = {
            selected: [],
            _parentID: this.props._id,
            isLoggedIn: typeof localStorage["user"] !== 'undefined',
            question: this.props.question,
            answers: this.props.answers,
            userAnswers: this.props.userAnswers,
            options: this.props.options,
            submitted: false
        };
        // Bind action creators to the state. 
        this.handleMultipleOptionChange = this.handleMultipleOptionChange.bind(this);
        this.handleMultipleSubmit = this.handleMultipleSubmit.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    // Multiple vote submission logic 
    handleMultipleSubmit() {
        var { selected, _id, _parentID, isLoggedIn } = this.state;
        const { dispatch } = this.props;
        // If the user selected at least one option to vote
        if (selected !== undefined && selected.length !== 0) {
            // If the user is logged in 
            if (isLoggedIn) {
                let user = JSON.parse(localStorage.getItem('user'));
                user = user.id;
                dispatch(pollActions.votePollMultiple({ selected, _id, _parentID, user }))
            }
        } // User selected nothing
        else {
            alert("You must select at least one option.")
        }
    }

    // Multiple vote option change logic
    handleMultipleOptionChange(evt) {
        let selectedIndex;
        var insert = { value: evt.target.value, _id: evt.target.id, submitted: evt.target.getAttribute("submitted") }
        //	let idIndex;
        var selected = this.state.selected;
        //	var _id = this.state._id;
        // check if the check box is checked or unchecked
        if (evt.target.checked) {
            // add the numerical value of the checkbox to options array
            selected.push(insert);
            //		_id.push(evt.target.id);
        } else {
            // or remove the value from the unchecked checkbox from the array
            selectedIndex = selected.indexOf(insert);
            selected.splice(selectedIndex, 1)
        }

        // update the state with the new array of options
        this.setState({ selected: selected })
    }

    // For Question
    handleChangeField(key, event) {
        this.setState({
            [key]: event.target.value,
        });
    }

    // Add an answer
    handleAddAnswer = () => {
        this.setState({
            answers: this.state.answers.concat([{ text: '', value: 0 }])
        });
    }

    // Removve an answer
    handleRemoveAnswer = (idx) => () => {
        this.setState({
            answers: this.state.answers.filter((s, sidx) => idx !== sidx)
        });
    }

    // For Options
    handleOptionChange(e) {
        let options = { ...this.state.options };
        options[e.target.value] = !options[e.target.value];
        this.setState({ options });
    }

    // For Answers
    handleAnswerTextChange = (idx) => (evt) => {
        const newAnswers = this.state.answers.map((answer, sidx) => {
            if (idx !== sidx) return answer;
            return { ...answer, text: evt.target.value };
        });

        this.setState({ answers: newAnswers });
    }

    render() {
        return (
            <div className="form">
                <h1>Edit Poll</h1>
                <div id="rightPollWrapper">
                    <div id="rightPoll">
                        <h4>Options</h4>
                        <label><input type="checkbox" checked={this.state.options.MultipleAnswers} onChange={this.handleOptionChange} name="options" value="MultipleAnswers" /> Allow users to select more than one poll answer </label>
                        <label><input type="checkbox" checked={this.state.options.UserAnswers} onChange={this.handleOptionChange} name="options" value="UserAnswers" /> Allow users to create poll answers </label>
                        <label><input type="checkbox" checked={this.state.options.Rescind} onChange={this.handleOptionChange} name="options" value="Rescind" /> Allow users to rescind their vote </label>
                        <label><input type="checkbox" checked={this.state.options.SeeResults} onChange={this.handleOptionChange} name="options" value="SeeResults" /> Allow users to see the results before voting </label>
                    </div>
                    <button onClick={this.handleSubmit} className="btn btn-primary float-right editButton" id="pollSubmitButton">Submit</button>
                </div>

                <div id="leftPoll">
                    <h3>Question</h3>
                    <input
                        onChange={(ev) => this.handleChangeField('question', ev)}
                        value={this.state.question}
                        className="form-control my-3"
                        placeholder="Poll Question"
                    />

                    <h3>Answers</h3>
                    {this.state.answers.map((answer, idx) => (
                        <div className="answer" key={idx}>
                            <input
                                type="text"
                                placeholder={`Answer #${idx + 1}`}
                                value={answer.text}
                                onChange={this.handleAnswerTextChange(idx)}
                                className="form-control"
                            />
                            <button type="button" onClick={this.handleRemoveAnswer(idx)} className="small answerDeleteButton"><i className="fas fa-trash-alt"></i></button>
                        </div>
                    ))}

                    <button type="button" onClick={this.handleAddAnswer} className="small btn btn-secondary float-right editButton" id="addAnswer">Add Answer</button>
                    <div id='userAnswersBox'>
                        <h3>User Answers</h3>
                        {this.state.userAnswers.map((answer, idx) => (
                            <div className="answer" key={idx}>
                                <input
                                    type="text"
                                    placeholder={`Answer #${idx + 1}`}
                                    value={answer.text}
                                    onChange={this.handleAnswerTextChange(idx)}
                                    className="form-control"
                                />
                                <button type="button" onClick={this.handleRemoveAnswer(idx)} className="small answerDeleteButton"><i className="fas fa-trash-alt"></i></button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        )
    }
}

// use the users and votePoll reducers
function mapStateToProps(state) {
    const { voting } = state.home.votePoll;
    const { userInteraction } = state.home.users;
    return {
        voting, userInteraction
    };
}

export default connect(mapStateToProps)(Edit);