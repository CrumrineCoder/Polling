import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Articles from './containers/Articles';
//import './style.css';

class Home extends Component {

	render() {
		return (
			<div id="home">
				<Container>
					<Articles />
				</Container>
			</div>
		);
	}
}

export default Home;
