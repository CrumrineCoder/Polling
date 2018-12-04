import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';
import { userActions } from '../../_actions/users.actions.js';
import { Link } from 'react-router-dom';

class Poll extends Component {

	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		console.log("YO IT'S THE PROPS", this.props); 
		dispatch(userActions.getAll());
		//_id: [],, checkboxes: this.props.answers, userCheckboxes: this.props.answers 
		this.state = {
			selected: [],
			userAnswer: '',
			_parentID: this.props._id,
			isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
		console.log(this.state.isLoggedIn);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleMultipleSubmit = this.handleMultipleSubmit.bind(this);
		this.setUserAnswer = this.setUserAnswer.bind(this);
		this.handleMultipleOptionChange = this.handleMultipleOptionChange.bind(this);
	}

	handleSubmit() {
		var { selected, _id, _parentID } = this.state;
		const { dispatch } = this.props;
		if (_id === "Other") {
			dispatch(pollActions.votePollUserAnswer({ selected, _parentID }));
		} else {
			dispatch(pollActions.votePoll({ selected, _id }));
		}
	}

	handleMultipleSubmit() {
		var { selected, _id, _parentID, isLoggedIn } = this.state;
		const { dispatch } = this.props;
		if(isLoggedIn){
			let user = localStorage["user"];
			dispatch(pollActions.votePollMultiple({ selected, _id, _parentID, user }))
		}
	}

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id });
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
		const { isLoggedIn } = this.state
		let button;
		if (isLoggedIn) {
			button = <button onClick={this.handleMultipleSubmit} className="btn btn-primary float-right">Submit</button>;
		} else {
			button = <button > Please  <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to vote.</button>;
		}
		return (
			<div>
				<h1>{this.props.question}</h1>
				<h4>Answers</h4>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type="checkbox" name="answer" submitted="answer" custom="some-value" onChange={this.handleMultipleOptionChange} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>

						</div>
					)
				}, this)
				}
				<h4>User Answers </h4>
				{this.props.userAnswers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type="checkbox" name="answer" submitted="userAnswer" onChange={this.handleMultipleOptionChange} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>

						</div>
					)
				}, this)
				}
				<input type="checkbox" onChange={this.handleMultipleOptionChange} submitted="toSubmit" name="answer" value={this.state.userAnswer} id="Other" ></input>
				<input type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" />
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