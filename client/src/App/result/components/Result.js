import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "", _id: ""	};
	}

	render() {
		var { selected } = this.state
		return (
			<div>
			<h1> Hi</h1>
			</div>
		)
	}

}

export default withRouter(Result);
