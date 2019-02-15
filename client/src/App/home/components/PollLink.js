import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Links on main page that redirect the user to a poll if clicked on
class PollMini extends Component {
	render() {
		return (
			<div className="pollLink">
				<Link className="continueReading" to={this.props.id + "/vote/"}><h2>{this.props.question}</h2></Link>
			</div >
		)
	}
}

export default PollMini;

