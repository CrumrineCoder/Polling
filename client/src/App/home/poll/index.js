import React, { Component } from 'react';
import { Container } from 'reactstrap';
import PollContainer from './containers/PollContainer';
//import './style.css';

class Home extends Component {

	render() {
		return (
			<div id="home">
				<Container>
					<PollContainer id={this.props.match.params.id} />
				</Container>
			</div>
		);
	}
}

export default Home;
