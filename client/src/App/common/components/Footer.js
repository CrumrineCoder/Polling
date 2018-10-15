import React, { Component } from 'react';

class Footer extends Component {

	render () {
		return (
	    <footer>
	      <div id="footer" className="text-center">
					<a className="footerLink" href="http://crumrinecoder.com/" rel="noopener noreferrer"target="_blank" ><i className="fas fa-briefcase"></i></a>
					<a className="footerLink" href="https://github.com/CrumrineCoder" rel="noopener noreferrer"  target="_blank" ><i className="fab fa-github"></i></a>
					<a className="footerLink" href="	https://www.linkedin.com/in/nicolas-crumrine-50899b120/" rel="noopener noreferrer"  target="_blank" ><i className="fab fa-linkedin-in"></i></a>
					<a className="footerLink" href="mailto:crumrinecoding@gmail.com" rel="noopener noreferrer" target="_blank" ><i className="fas fa-envelope"></i></a>
	      </div>
	    </footer>
	  )
	}
}

export default Footer;