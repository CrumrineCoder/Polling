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
     //   dispatch(userActions.getCurrent());
        let userAnswers = [];
        if(this.props.userAnswers){
            userAnswers = this.props.userAnswers;
        }
        // selected is the votes selected by the user, userAnswer is the user created answer, _parentID is the id of the poll itself, isLoggedIn checks if the user is logged in, choiceType is whether the inputs to select votes are radio (single vote) or checkbox (multiple votes), optionChangeType keeps track of whether we're using multipleOptionChange or optionChange, submitType is  handleSubmit or handleMultipleSubmit, and submissionType is whether the user is voting on a poll answer, a user answer, creating a user answer, or multiple. 
        this.state = {
            id: this.props.id,
            isLoggedIn: typeof localStorage["user"] !== 'undefined',
            question: this.props.question,
            answers: this.props.answers,
            userAnswers: userAnswers,
            options: this.props.options,
            value: this.props.value,
            submitted: false,
            creator: this.props.creator
        };
        // Bind action creators to the state. 
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.handleOptionChange = this.handleOptionChange.bind(this);
        this.handleRemoveUserAnswer = this.handleRemoveUserAnswer.bind(this);
    }

    handleDelete() {
        const { id } = this.state;
        const { dispatch } = this.props;
        if(window.confirm("Are you sure you want to delete this Poll? It will be gone forever, and forever is a long time.")){
            // dispatch an action to delete the poll with its ID
            dispatch(pollActions.deletePoll(id));
        }
    }

    
    // Multiple vote submission logic 
    handleEditSubmit() {
        var { id, answers, userAnswers, options, question, value, creator } = this.state;
        const { dispatch } = this.props;
        let shouldReset = false;
       // let creator = JSON.parse(localStorage.getItem('user')).id;

        function objectsAreSame(x, y) {
            var objectsAreSame = true;
            for(var propertyName in x) {
               if(x[propertyName] !== y[propertyName]) {
                  objectsAreSame = false;
                  break;
               }
            }
            return objectsAreSame;
         }


        // If the props for anything other than user answers are different, set a variable that'll tell the back end to reset data. 
        if ( !(objectsAreSame(answers, this.props.answers)) ||  !(objectsAreSame(options, this.props.options)) || question !== this.props.question) {
            shouldReset = true;
           
        }

        answers = answers.filter(function (el) {
            return el.text !== "";
        });

        // Remove duplicate answers
        answers = answers.filter((answer, index, self) =>
            index === self.findIndex((a) => (
                a.text === answer.text
            ))
        )
        // Remove empty questions
        if (question === "") {
            alert("You must supply a question.");
        }
        // Force the user to have at least 2 answers
        else if (answers.length < 2) {
            alert("You need two or more non-empty non-duplicate answers for your poll to submit.");
        }

        if(shouldReset){
            answers.map(function (x) {
                x.Users = [];
                x.value = 0;
                return x
            });
            value  = 0;
        }

        // If user Answers are no longer allowed, delete them all.
        if(!options.UserAnswers){
            userAnswers = [];
        }

        // Send a dispatch to edit the poll. 
        dispatch(pollActions.editPoll({id, creator, answers, value, userAnswers, options, question}));
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

    handleRemoveUserAnswer = (idx) => () => {
        this.setState({
            userAnswers: this.state.userAnswers.filter((s, sidx) => idx !== sidx)
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
                                <button type="button" onClick={this.handleRemoveUserAnswer(idx)} className="small answerDeleteButton"><i className="fas fa-trash-alt"></i></button>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div id="rightPollWrapper">
                    <div id="rightPoll">
                        <h4>Options</h4>
                        <label><input type="checkbox" checked={this.state.options.MultipleAnswers} onChange={this.handleOptionChange} name="options" value="MultipleAnswers" /> Allow users to select more than one poll answer </label>
                        <label><input type="checkbox" checked={this.state.options.UserAnswers} onChange={this.handleOptionChange} name="options" value="UserAnswers" /> Allow users to create poll answers </label>
                        <label><input type="checkbox" checked={this.state.options.Rescind} onChange={this.handleOptionChange} name="options" value="Rescind" /> Allow users to rescind their vote </label>
                        <label><input type="checkbox" checked={this.state.options.SeeResults} onChange={this.handleOptionChange} name="options" value="SeeResults" /> Allow users to see the results before voting </label>
                    </div>
                    <button onClick={this.handleDelete} className="btn btn-outline-danger editButton pollSubmitButton" >Delete</button>
                    <button onClick={this.handleEditSubmit} className="btn btn-primary float-right editButton pollSubmitButton" >Save Changes</button>
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