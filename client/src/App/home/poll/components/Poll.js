import React, { Component } from 'react';

class Poll extends Component {
	render() {
		console.log("INNER POLLS", this.props)
		return (
			<div>
				<h1>{this.props.question}</h1>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer.text}>
							<label>{answer.text}</label>
							<input type="radio" name="answer" value={answer.text} />
						</div>
					)
				})
				}
			</div>
		)
	}

}

export default Poll;

