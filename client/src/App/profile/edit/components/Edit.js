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
		// selected is the votes selected by the user, userAnswer is the user created answer, _parentID is the id of the poll itself, isLoggedIn checks if the user is logged in, choiceType is whether the inputs to select votes are radio (single vote) or checkbox (multiple votes), optionChangeType keeps track of whether we're using multipleOptionChange or optionChange, submitType is  handleSubmit or handleMultipleSubmit, and submissionType is whether the user is voting on a poll answer, a user answer, creating a user answer, or multiple. 
		this.state = {
			selected: [],
			userAnswer: '',
			_parentID: this.props._id,
			isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
		// Bind action creators to the state. 
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleMultipleOptionChange = this.handleMultipleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMultipleSubmit = this.handleMultipleSubmit.bind(this);
		this.setUserAnswer = this.setUserAnswer.bind(this);
		this.handleBackClick = this.handleBackClick.bind(this);
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

	render() {
		const { isLoggedIn } = this.state;
		let button;
		let useranswers = [];
		let Results;

		// If the user is logged in, they can vote. If not, they'll have to login or register to vote. 
		if (isLoggedIn) {
			button = <button onClick={this.state.submitType} className="btn btn-primary float-right">Submit</button>;
		} else {
			button = <div className="float-right" id="pleaseLoginOrRegister" > Please  <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to vote.</div>;
		}

		// If the poll creator set userAnswers to true
		if (this.props.options.UserAnswers) {
			// Build out the user answers
			// Header
			useranswers.push(
				<h4 key="userAnswersHeader">User Answers </h4>
			)
			// Already existing user answers
			for (var i = 0; i < this.props.userAnswers.length; i++) {
				useranswers.push(
					<div key={this.props.userAnswers[i]._id}>
						<input type={this.state.choiceType} name="answer" submitted="userAnswer" submissiontype="userAnswer" onChange={this.state.optionChangeType} value={this.props.userAnswers[i].text} id={this.props.userAnswers[i]._id} className="pollInput" />
						<label className="pollInputLabel">{this.props.userAnswers[i].text}</label>
					</div>
				)
			}
			// Make your own user answer
			useranswers.push(
				<div key="userAnswersPleaseSpecifyDiv">
					<input key="userAnswersPleaseSpecifyRadio" type={this.state.choiceType} onChange={this.state.optionChangeType} submitted="toSubmit" name="answer" submissiontype="toSubmit" value={this.state.userAnswer} id="Other" className="pollInput"></input>
					<input key="userAnswersPleaseSpecifyTextArea" type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" className="pollInputLabel" id="otherSpecify" />
				</div>
			)
		} // Tell the user about userAnswers being set to false
		 else {
			useranswers = <p key="userAnswersDisclaimer">User Answers are not allowed for this poll.</p>
		}

		// If the poll creator set seeresults to true
		if (this.props.options.SeeResults) {
			// Make a button to allow the user to see the results before voting 
			Results = (<button className="float-left btn btn-secondary" key="seeResultsButton" onClick={this.handleBackClick} value={this.props._id}>Results <i className="fas fa-poll-h"></i></button>);
		}

		return (
			<div className="container">
				<div className="row h-100 justify-content-center align-self-center">
					<div className="col-md-8">
						<h1 className="pollVotingSquare">{this.props.question}</h1>
						<div className="pollVotingSquare">
							<h4 className="">Answers</h4>
							{
								this.props.answers.map(function (answer) {
									return (
										<div key={answer._id}>
											<input type={this.state.choiceType} name="answer" submitted="answer" submissiontype="answer" onChange={this.state.optionChangeType} value={answer.text} id={answer._id} className="pollInput" />
											<label className="pollInputLabel">{answer.text}</label>
										</div>
									)
								}, this)
							}
						</div>
						<div className="pollVotingSquare">
							{useranswers}
						</div>
						{Results}
						{button}
					</div >
				</div>
			</div >
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