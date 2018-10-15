import React, { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class Article extends Component {
	render() {
		let html = stateToHTML(convertFromRaw(JSON.parse(this.props.body)));
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p id="tag"><b>Tagged: </b>{this.props.tag}</p>
				<i>{new Date(this.props.createdAt).toDateString()}</i>
				<div id="articleContent" dangerouslySetInnerHTML={{ __html: html }} />
				
			</div >
		)
	}

}

export default Article;

