import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Polls from './containers/Polls';
//import './style.css';

class Home extends Component {

	render() {
		return (
			<div id="home">
				<Container>
					<Polls />
				</Container>
			</div>
		);
	}
}

export default Home;
