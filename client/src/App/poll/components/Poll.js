import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';
import { userActions } from '../../_actions/users.actions.js';
import { Link } from 'react-router-dom';
import { history } from '../../store.js';


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
		this.handleBackClick = this.handleBackClick.bind(this);
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
		if (submissionType === "toSubmit") {
			dispatch(pollActions.votePollCreateUserAnswer({ userAnswer, _parentID, user, submissionType }));
		} else if (submissionType === "userAnswer") {
			dispatch(pollActions.votePollUserAnswer({ _id, selected, user, submissionType }));
		} else if (submissionType === "answer") {
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

	handleBackClick(e) {
		e.preventDefault();
		history.push("");
		console.log(this.props);
		history.push(this.props._id + "/results");
	}

	render() {
		const { isLoggedIn } = this.state;
		let button;
		let userAnswers = [];
		let Results; 
		if (isLoggedIn) {
			button = <button onClick={this.state.submitType} className="btn btn-primary float-right">Submit</button>;
		} else {
			button = <div className ="float-right" > Please  <Link to="/login" >Login</Link> or <Link to="/register">Register</Link> to vote.</div>;
		}
		if (this.props.options.UserAnswers) {
			userAnswers.push(
				<h4>User Answers </h4>

			)
			console.log(this.props.userAnswers); 
			for (var i=0; i< this.props.userAnswers.length; i++) {
				userAnswers.push(
					<div key={this.props.userAnswers[i]._id}>
						<input type={this.state.choiceType} name="answer" submitted="userAnswer" submissionType="userAnswer" onChange={this.state.optionChangeType} value={this.props.userAnswers[i].text} id={this.props.userAnswers[i]._id}  className="pollInput"/>
						<label className="pollInputLabel">{this.props.userAnswers[i].text}</label>
					</div>
				)
			}
			userAnswers.push(
				<div>
					<input type={this.state.choiceType} onChange={this.state.optionChangeType} submitted="toSubmit" name="answer" submissionType="toSubmit" value={this.state.userAnswer} id="Other" className="pollInput"></input>
					<input type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" className="pollInputLabel" id="otherSpecify" />
				</div>
			)
		} else{
			userAnswers = <p>User Answers are not allowed for this poll.</p>
		}
		console.log("TEST", this.props)
		if(this.props.options.SeeResults){
			Results = (<button className="float-left btn btn-secondary" onClick={this.handleBackClick}{...this.props}>Results <i class="fas fa-poll-h"></i></button>);
		}

		return (
			<div class="container">
				<div class="row h-100 justify-content-center align-self-center">
					<div class="col-md-8 jumbotron vertical-center">
						<h1 className="pollVotingSquare">{this.props.question}</h1>
						<div className="pollVotingSquare">
							<h4 class="">Answers</h4>
							{
								this.props.answers.map(function (answer) {
									return (
										<div key={answer._id}>
											<input type={this.state.choiceType} name="answer" submitted="answer" submissionType="answer" onChange={this.state.optionChangeType} value={answer.text} id={answer._id} className="pollInput" />
											<label className="pollInputLabel">{answer.text}</label>
										</div>
									)
								}, this)
							}
						</div>
						<div className="pollVotingSquare">
							{userAnswers}
						</div>
							{Results}
							{button}
					</div >
				</div>
			</div >
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