import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PollMini extends Component {
	render() {
		console.log(this.props);
		return (
			<div className="pollLink">
				<Link className="continueReading" to={"polls/" + this.props._id}><h1>{this.props.question}</h1></Link>
		
			</div >
		)
	}

}
/*
		<p><b>Tagged: </b>{this.props.tag}</p>
				<Link className="continueReading" to={"posts/" + this.props._id}>Continue Reading <i className="fas fa-long-arrow-alt-right"></i></Link>
				*/

export default PollMini;

