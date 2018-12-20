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
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
			//		isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { isLoggedIn } = this.props
		let userLinks;
		if (isLoggedIn) {
			userLinks = 
			<>
				<NavItem> 
					<NavLink href="#/profile">Profile</NavLink>
				</NavItem>	
				<NavItem>
					<NavLink href="#/login">Logout</NavLink>	
				</NavItem>
			</>
		} else {
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
		return (
			<header>
					<Navbar color="faded" light expand="md">
						<NavbarBrand href="/">Nicolas Crumrine</NavbarBrand>
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

Header.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
	const isLoggedIn = state.home.authenticate.loggedIn;
	return { isLoggedIn };
}

export default connect(mapStateToProps)(Header);

//export default Header;