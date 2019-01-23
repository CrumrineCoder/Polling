import React from 'react'
import { Container } from 'reactstrap';
import Profile from './containers/Profile';
//import './style.css';

class ProfilePage extends React.Component {

	render() {

		return (
			<div id="profile">
				<Container>
					<Profile></Profile>
				</Container>
			</div>
		);
	}

}

export default ProfilePage;