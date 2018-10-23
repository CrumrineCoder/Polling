import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PollContainer from './containers/PollContainer';
//import './style.css';

class pollIndex extends Component {

	render() {
		return (
			<div id="pollIndex">
				<Container>
					<PollContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default pollIndex;
