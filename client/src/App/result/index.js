import React, { Component } from 'react';
import { Container } from 'reactstrap';
import ResultContainer from './containers/ResultContainer';
//import './style.css';

// for router.js
class pollIndex extends Component {

	render() {
		return (
			<div id="pollIndex">
				<Container>
					<ResultContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default pollIndex;
