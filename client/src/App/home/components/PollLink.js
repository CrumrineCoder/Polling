import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PollMini extends Component {
	render() {
		return (
			<div className="pollLink">
				<Link className="continueReading" to={this.props._id + "/vote/"}><h2>{this.props.question}</h2></Link>
			</div >
		)
	}
}

export default PollMini;

