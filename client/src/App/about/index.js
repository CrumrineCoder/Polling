import React from 'react'
import { Container } from 'reactstrap';
//import './style.css';

class About extends React.Component {

	render() {

		return (
			<div id="about">
				<Container>
					<h2>Hi, I'm Nicolas Crumrine and I make websites.</h2>
					<p> <b> A little about me: </b>I use JavaScript (ES6), React.js, Angular.js, Node.js, Express.js, HTML5, CSS3, and SASS. When I'm not building these websites, I'm reading history, philosophy, anthropology, hard Sci-Fi, Terry Prachett, and Russian Literature. I also doodle, play the piano and guitar in an attempt to revive Space Filk (look it up!), and I run a tabletop game for my friends. I love finding common patterns of thought in these hobbies; I find that worldbuilding and programming have similar principles and workflow. I love identifying, breaking down, understanding, matching, and tinkering with these patterns to create a good story; whether it's an emergent and collaborative tabletop story, or it's a carefully planned out user story for my websites.</p>
					<p>I love Web Development because I have the opportunity to help any industry I find interest in with little to no production cost. However, I utterly despise Web Design that is meant to manipulate users into skinner boxes like Facebook. I hope to build a site like Duolingo where web design is used for helping to keep students engaged. As Hal9000 said, "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do." and everyone should have the access and inclination to use the web to pursue their interests no matter where they start in life. The Web allows us to merge industries like never before, which is why I'm not afraid to love so many hobbies.</p>
					<p>So, welcome to my Blog! I'll be uploading case studies, dev diaries, insights from what I'm learning, and occasionally results from my other interests. Check out the projects on my <a target="_blank"  rel="noopener noreferrer"  className="continueReading" href="http://crumrinecoder.com/">portfolio</a> and <a  className="continueReading" href="mailto:crumrinecoding@gmail.com"  rel="noopener noreferrer" target="_blank" >contact me</a> if you like what you see. I'm currently open to collaborating on a project.</p>
				</Container>
			</div>
		);
	}

}

export default About;