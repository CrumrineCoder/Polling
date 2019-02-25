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
import fire from "./Fire.js";
var auth = fire.auth();
//import PropTypes from 'prop-types';

// Header hosts navigation info at the top of the screen. It appears on all pages.
// Redirects to landing page, and depending on if the user is logged in redirect to either the profile or logout page, or if they're not logged in then login or register page 
class Header extends Component {

	constructor(props) {
		super(props);
		const { dispatch } = this.props;
		console.log("HEADER PROPS", this.props);
		dispatch(userActions.getCurrent());
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isLoggedIn: false
			//		isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}

	// Toggle the collapsed navbar
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	/*
		componentDidUpdate(prevProps, prevState, snapshot) {
			if (prevProps.isFetchingCurrentUser !== this.props.isFetchingCurrentUser) {
				// Do whatever you want
				console.log("Test");
				this.setState(this.state);
			}
			if (prevProps.currentUser.user !== this.props.currentUser.user) {
				// Do whatever you want
				console.log("FSADFASDFASDFA");
				this.setState(this.state);
			}
		}
		*/
	/*componentDidUpdate(){
		auth.onAuthStateChanged(function (user) {
			if (user) {
			  var email = user.email;
			  console.log("LOGGED IN!");
		//	  res.json({ user: email });
			} else {
			  console.log("-not logged in-")
		//	  res.json({ user: null })
			}
		  }); 
	} */

	componentDidMount(){
		auth.onAuthStateChanged((user)=>{
			if (user) {
				var email = user.email;
				console.log("LOGGED IN!");
				//	  res.json({ user: email })
				this.setState({
					isLoggedIn: true
				});
			} else {
				console.log("-not logged in-")
				//	  res.json({ user: null })
				this.setState({
					isLoggedIn: false
				});
			
			}
		});
	}

	render() {
		//	console.log(this.props);
		let userLinks = "Authenticating...";

		if(this.state.loggedIn){
			userLinks =
			<>
				<NavItem>
					<NavLink href="#/profile">Profile</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#/login">Logout</NavLink>
				</NavItem>
			</>
		} else{
			userLinks =
			<>
				<NavItem>
					<NavLink href="#/login">Login</NavLink>
				</NavItem>
				<NavItem>
					<NavLink href="#/register">Register</NavLink>
				</NavItem>
			</>
		}
	
		/*	if(!this.props.isFetchingCurrentUser){
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
			} */
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
	//	console.log(state.home);
	/*	const { loggedIn } = state.home.authenticate;
		const { isFetchingCurrentUser } = state.home.users || {
			isFetchingCurrentUser: true
		}
		return {
			loggedIn,
			isFetchingCurrentUser
		} */
	const { users } = state.home;
	const { isFetchingCurrentUser, currentUser } = users || {
		isFetchingCurrentUser: true,
		currentUser: {}
	}
	return {
		isFetchingCurrentUser,
		currentUser
	};
}

export default connect(mapStateToProps)(Header);

//export default Header;