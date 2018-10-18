import React, { Component } from 'react';
import axios from 'axios';

class Poll extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "" };
		this.handleOptionChange = this.handleOptionChange.bind(this);
	}

	handleSubmit() {
		var { selected } = this.state;


		return axios.post('/api/polls/vote', {
			selected
		})
			.then(response => {
				this.goToResults(response.data.poll._id)
			})
			.then(() => this.setState({ question: '' }));

	}

	handleOptionChange(evt){
		console.log(evt.target.value);
		this.setState({ selected: evt.target.value});
	}
	

	render() {
		console.log("INNER POLLS", this.props)
		var {selected} = this.state
		return (
			<div>
				<h1>{this.props.question}</h1>
				{this.props.answers.map(function (answer) {
					console.log("Answer", answer)
					return (
						<div key={answer.text}>
							<label>{answer.text}</label>
							<input type="radio" checked={selected === answer.text} name="answer"   onChange={answer.state.handleOptionChange} value={answer.text} />
							
						</div>
					)
				})
				}
				<button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
			</div>
		)
	}

}

export default Poll;

