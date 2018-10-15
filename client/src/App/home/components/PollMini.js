import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { Link } from 'react-router-dom';

class PollMini extends Component {
	render() {
		let html = stateToHTML(convertFromRaw(JSON.parse(this.props.body)));
		// Change this to recognizing a seqence in the blog article itself for the cut off point. 
		const toShow = html.substring(0, 250) + "...";
		return (
			<div className="articleLink">
				<Link className="continueReading" to={"posts/" + this.props._id}><h1>{this.props.title}</h1></Link>
				<p><b>Tagged: </b>{this.props.tag}</p>
				<div dangerouslySetInnerHTML={{ __html: toShow }} />
				<Link className="continueReading" to={"posts/" + this.props._id}>Continue Reading <i className="fas fa-long-arrow-alt-right"></i></Link>
			</div >
		)
	}

}

export default PollMini;

