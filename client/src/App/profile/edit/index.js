import React, { Component } from 'react';
import { Container } from 'reactstrap';
import EditContainer from './containers/EditContainer';
//import './style.css';

// Needed for router.js
class editIndex extends Component {
	render() {
		return (
			<div id="pollIndex">
				<Container>
					<EditContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default editIndex;
