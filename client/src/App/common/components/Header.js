import React, { Component } from 'react';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/users.actions.js';
//import PropTypes from 'prop-types';

// Header hosts navigation info at the top of the screen. It appears on all pages.
// Redirects to landing page, and depending on if the user is logged in redirect to either the profile or logout page, or if they're not logged in then login or register page 
class Header extends Component {

	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		dispatch(userActions.getCurrent());
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
			//		isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}

	// Toggle the collapsed navbar
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	componentWillUpdate() {

	}

	render() {
		let userLinks = "Authenticating...";
		//Conditional rendering
		/*	console.log(this.props);
			if(!this.props.users.isFetchingCurrentUser){
				console.log(this.props.users.isFetchingCurrentUser);
				console.log(this.props.users.currentUser);
				console.log(this.props.users.currentUser.user === null);
				if(this.props.users.currentUser.user === null){
					userLinks = 
					<>
						<NavItem> 
							<NavLink href="#/login">Login</NavLink>		
						</NavItem>
						<NavItem>	
							<NavLink href="#/register">Register</NavLink>	
						</NavItem>
					</>
				} else{
					userLinks = 
					<>
						<NavItem> 
							<NavLink href="#/profile">Profile</NavLink>
						</NavItem>	
						<NavItem>
							<NavLink href="#/login">Logout</NavLink>	
						</NavItem>
					</>
				}
			} */
		/*	console.log(this.props);
			if(!this.props.isFetchingCurrentUser){
				console.log(this.props.currentUser);
				if(this.props.currentUser.user === null){
					userLinks = 
					<>
						<NavItem> 
							<NavLink href="#/login">Login</NavLink>		
						</NavItem>
						<NavItem>	
							<NavLink href="#/register">Register</NavLink>	
						</NavItem>
					</>
				} else{
					userLinks = 
					<>
						<NavItem> 
							<NavLink href="#/profile">Profile</NavLink>
						</NavItem>	
						<NavItem>
							<NavLink href="#/login">Logout</NavLink>	
						</NavItem>
					</>
				}
			} */
		console.log(this.props);
		if (!this.props.isFetchingCurrentUser) {
			if (!this.props.loggedIn) {
				userLinks =
					<>
						<NavItem>
							<NavLink href="#/login">Login</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#/register">Register</NavLink>
						</NavItem>
					</>
			} else {
				userLinks =
					<>
						<NavItem>
							<NavLink href="#/profile">Profile</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="#/login">Logout</NavLink>
						</NavItem>
					</>
			}
		}
		return (
			<header>
				<Navbar color="faded" light expand="md">
					<NavbarBrand href="/">Polling</NavbarBrand>
					<NavbarToggler onClick={this.toggle} />
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="#/">Home</NavLink>
							</NavItem>
							{userLinks}
						</Nav>
					</Collapse>
				</Navbar>
			</header>
		)
	}
}

function mapStateToProps(state) {
	/*	console.log(state.home);
		const { users } = state.home;
		const { isFetchingCurrentUser, currentUser } = users || {
			isFetchingCurrentUser: true,
			currentUser: {}
			}
		return {
			isFetchingCurrentUser,
			currentUser
		}; */

	const { loggedIn } = state.home.authenticate;
	const { isFetchingCurrentUser } = state.home.users || {
		isFetchingCurrentUser: true
	}
	return {
		loggedIn,
		isFetchingCurrentUser
	}
}

export default connect(mapStateToProps)(Header);

//export default Header;