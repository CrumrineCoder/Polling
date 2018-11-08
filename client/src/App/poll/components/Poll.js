import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pollActions } from '../../_actions/polls.actions.js';

class Poll extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "", _id: "" };
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	
	}

	handleSubmit() {
		var { selected, _id } = this.state;
		const { dispatch } = this.props;
		dispatch(pollActions.votePoll({selected, _id}));
	}

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id });
	}


	render() {
		var { selected } = this.state
		return (
			<div>
				<h1>{this.props.question}</h1>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer.text}>
							<label>{answer.text}</label>
							<input type="radio" checked={selected === answer.text} name="answer" onChange={this.handleOptionChange} value={answer.text} id={answer._id} />
						</div>
					)
				}, this)
				}
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
