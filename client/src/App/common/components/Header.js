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


class Header extends Component {

	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			isLoggedIn: typeof localStorage["user"] !== 'undefined'
		};
	}
	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		const { isLoggedIn } = this.state
		let userLinks;
		if (isLoggedIn) {
			userLinks = <NavItem> <NavLink href="#/login">Logout</NavLink>		</NavItem>
		} else {
			userLinks = <div><NavItem> <NavLink href="#/login">Login</NavLink>		</NavItem>	<NavItem>		<NavLink href="#/register">Register</NavLink>	</NavItem></div>
		}
		return (
			<header>
				<Container>
					<Navbar color="faded" light expand="md">
						<NavbarBrand href="/">Nicolas Crumrine</NavbarBrand>
						<NavbarToggler onClick={this.toggle} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="#/">Home</NavLink>
								</NavItem>
								<NavItem>
									<NavLink href="#/about">About</NavLink>
								</NavItem>
								{userLinks}
							</Nav>
						</Collapse>
					</Navbar>
				</Container>
			</header>
		)
	}
}

export default Header;