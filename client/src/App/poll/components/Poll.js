import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';
import { userActions } from '../../_actions/users.actions.js';

class Poll extends Component {

	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		dispatch(userActions.getAll());
		//_id: [],, checkboxes: this.props.answers, userCheckboxes: this.props.answers 
		this.state = { selected: [],  userAnswer: '', _parentID: this.props._id};
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
		var { selected, _id, _parentID } = this.state;
		const { dispatch } = this.props;
		dispatch(pollActions.votePollMultiple({ selected, _id, _parentID, }))
	}

/*	prepareCheckboxes() {
		var answers = this.state.checkboxes;
		for (var i = 0; i < answers.length; i++) {
			answers[i].checked = false;
		}
		var userAnswers = this.state.userCheckboxes;
		for (var j = 0; j < userAnswers.length; j++) {
			userAnswers[j].checked = false;
		}
		this.setState({ checkboxes: answers, userCheckboxes: userAnswers });
	} */

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id });
	}

	handleMultipleOptionChange(evt) {
		console.log("Handle Multiple Option Change");
		let selectedIndex;
		var insert = {value: evt.target.value, _id: evt.target.id, submitted: evt.target.getAttribute("submitted")}
		console.log("Insert", insert); 
	//	let idIndex;
		var selected = this.state.selected;
		console.log("selected", selected);
	//	var _id = this.state._id;
		// check if the check box is checked or unchecked
		if (evt.target.checked) {
			console.log("CHECKED");
			// add the numerical value of the checkbox to options array
			selected.push(insert);
	//		_id.push(evt.target.id);
		} else {
			console.log("NOT CHECKED")
			// or remove the value from the unchecked checkbox from the array
			selectedIndex = selected.indexOf(insert);
			selected.splice(selectedIndex, 1)
	/*		idIndex = _id.indexOf(evt.target.id)
			_id.splice(idIndex, 1) */
		}

		// update the state with the new array of options
		this.setState({ selected: selected })
	}

	setUserAnswer(evt) {
		this.setState({ userAnswer: evt.target.value });
	}


	render() {
		var { selected } = this.state
	//	this.prepareCheckboxes();
		return (
			<div>
				<h1>{this.props.question}</h1>
				<h4>Answers</h4>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type="checkbox" name="answer" submitted="answer" custom="some-value"  onChange={this.handleMultipleOptionChange} value={answer.text} id={answer._id} />
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
				<input type="checkbox" onChange={this.handleMultipleOptionChange}  submitted="toSubmit" name="answer" value={this.state.userAnswer} id="Other" ></input>
				<input type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" />
				<button onClick={this.handleMultipleSubmit} className="btn btn-primary float-right">Submit</button>
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { voting } = state.home.votePoll;
	const {userInteraction } = state.home.users; 
	return {
		voting, userInteraction
	};
}

export default connect(mapStateToProps)(Poll);