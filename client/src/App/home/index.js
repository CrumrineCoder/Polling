import React, { Component } from 'react';
import { Container } from 'reactstrap';
import HomePage from './containers/HomePage';
//import './style.css';

class Home extends Component {

	render() {
		return (
			<div id="home">
				<Container>
					<HomePage />
				</Container>
			</div>
		);
	}
}

export default Home;
