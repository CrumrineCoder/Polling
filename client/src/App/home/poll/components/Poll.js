import React, { Component } from 'react';

class Poll extends Component {
	render() {
		console.log("INNER POLLS", this.props)
		return (
			<div>
				<h1>{this.props.question}</h1>
				{this.props.answers.map(answer => <div key={answer.text}> {answer.text} </div>)} 
			</div >
		)
	}

}

export default Poll;

