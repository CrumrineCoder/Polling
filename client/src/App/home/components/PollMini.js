import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Link } from 'react-router-dom';

class PollMini extends Component {
	render() {
		let html = stateToHTML(convertFromRaw(JSON.parse(this.props.body)));
		return (
			<div className="pollLink">
				<Link className="continueReading" to={"posts/" + this.props._id}><h1>{this.props.title}</h1></Link>
				<p><b>Tagged: </b>{this.props.tag}</p>
				<Link className="continueReading" to={"posts/" + this.props._id}>Continue Reading <i className="fas fa-long-arrow-alt-right"></i></Link>
			</div >
		)
	}

}

export default PollMini;

