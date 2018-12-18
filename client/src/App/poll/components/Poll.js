import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';
import { userActions } from '../../_actions/users.actions.js';
import { Link } from 'react-router-dom';

class Poll extends Component {

	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		dispatch(userActions.getAll());
		//_id: [],, checkboxes: this.props.answers, userCheckboxes: this.props.answers 
		this.state = {
			selected: [],
			userAnswer: '',
			_parentID: this.props._id,
			isLoggedIn: typeof localStorage["user"] !== 'undefined',
			choiceType: '',
			optionChangeType: undefined,
			submitType: undefined,
			submissionType: undefined
		};
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleMultipleOptionChange = this.handleMultipleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMultipleSubmit = this.handleMultipleSubmit.bind(this);
		this.setUserAnswer = this.setUserAnswer.bind(this);
	}

	componentDidMount() {
		if (this.props.options.MultipleAnswers) {
			this.setState({ choiceType: "checkbox" });
			this.setState({ optionChangeType: this.handleMultipleOptionChange });
			this.setState({ submitType: this.handleMultipleSubmit });
		} else {
			this.setState({ choiceType: "radio" });
			this.setState({ optionChangeType: this.handleOptionChange });
			this.setState({ submitType: this.handleSubmit });
		}
	}

	handleSubmit() {
		var { selected, _parentID, _id, userAnswer, submissionType } = this.state;
		const { dispatch } = this.props;
		let user = JSON.parse(localStorage.getItem('user'));
		user = user.id;
		if (submissionType == "toSubmit") {
			dispatch(pollActions.votePollCreateUserAnswer({ userAnswer, _parentID, user, submissionType }));
		} else if(submissionType == "userAnswer") {
			dispatch(pollActions.votePollUserAnswer({ _id, selected, user, submissionType }));
		} else if(submissionType == "answer"){
			dispatch(pollActions.votePollAnswer({ _id, selected, user, submissionType }));
		}
	}

	handleMultipleSubmit() {
		var { selected, _id, _parentID, isLoggedIn } = this.state;
		const { dispatch } = this.props;
		if (isLoggedIn) {
			let user = JSON.parse(localStorage.getItem('user'));
			user = user.id;
			dispatch(pollActions.votePollMultiple({ selected, _id, _parentID, user }))
		}
	}

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id, submissionType: evt.target.getAttribute("submissionType") });
	}

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

	setUserAnswer(evt) {
		this.setState({ userAnswer: evt.target.value });
	}


	render() {
		const { isLoggedIn } = this.state;
		let button;
		let userAnswers = [];
		if (isLoggedIn) {
			button = <button onClick={this.state.submitType} className="btn btn-primary float-right">Submit</button>;
		} else {
			button = <button > Please  <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to vote.</button>;
		}
		if (this.props.options.UserAnswers) {
			userAnswers.push (
				<h4>User Answers </h4>
			)
			{
				this.props.userAnswers.map(function (answer) {
					userAnswers.push (
						<div key={answer._id}>
							<input type={this.state.choiceType} name="answer" submitted="userAnswer" submissionType="userAnswer" onChange={this.state.optionChangeType} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>
						</div>
					)
				}, this);
			}
			userAnswers.push(
				<div>
					<input type={this.state.choiceType} onChange={this.state.optionChangeType}  submitted="toSubmit" name="answer"  submissionType="toSubmit" value={this.state.userAnswer} id="Other" ></input>
					<input type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" />
				</div>
			)
		}

		return (
			<div>
				<h1>{this.props.question}</h1>
				<h4>Answers</h4>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type={this.state.choiceType} name="answer" submitted="answer" submissionType="answer" onChange={this.state.optionChangeType} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>

						</div>
					)
				}, this)
				}
				{userAnswers}
				{button}
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { voting } = state.home.votePoll;
	const { userInteraction } = state.home.users;
	return {
		voting, userInteraction
	};
}

export default connect(mapStateToProps)(Poll);