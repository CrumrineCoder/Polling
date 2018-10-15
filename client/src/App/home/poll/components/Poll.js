import React, { Component } from 'react';

class Poll extends Component {
	render() {
		console.log("INNER POLLS", this.props)
		return (
			<div>
				<h1>{this.props.question}</h1>
			</div >
		)
	}

}

export default Poll;

