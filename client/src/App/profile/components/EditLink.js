import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Links on main page that redirect the user to a poll if clicked on
class EditMini extends Component {
	render() {
		return (
			<div className="pollLink">
				<Link className="continueReading" to={this.props._id + "/edit/"}><h2>{this.props.question}</h2></Link>
			</div >
		)
	}
}

export default EditMini;

