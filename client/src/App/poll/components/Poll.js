import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';

class Poll extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "", _id: "", userAnswer: '', _parentID: this.props._id };
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.setUserAnswer = this.setUserAnswer.bind(this);
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

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id });
	}

	setUserAnswer(evt) {
		this.setState({ userAnswer: evt.target.value });
	}


	render() {
		var { selected } = this.state
		return (
			<div>
				<h1>{this.props.question}</h1>
				<h4>Answers</h4>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type="radio" checked={selected === answer.text} name="answer" onChange={this.handleOptionChange} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>

						</div>
					)
				}, this)
				}
				<h4>User Answers </h4>
				{this.props.userAnswers.map(function (answer) {
					return (
						<div key={answer._id}>
							<input type="radio" checked={selected === answer.text} name="answer" onChange={this.handleOptionChange} value={answer.text} id={answer._id} />
							<label>{answer.text}</label>

						</div>
					)
				}, this)
				}
				<input type="radio" name="answer" onChange={this.handleOptionChange} value={this.state.userAnswer} id="Other" ></input>
				<input type="text" onChange={this.setUserAnswer} value={this.state.userAnswer} placeholder="Other, please specify" />
				<button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
			</div>
		)
	}
}


function mapStateToProps(state) {
	const { voting } = state.home.votePoll;
	return {
		voting
	};
}

export default connect(mapStateToProps)(Poll);
