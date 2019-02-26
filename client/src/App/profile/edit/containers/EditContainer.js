import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Edit from '../components/Edit';
import { pollActions } from '../../../_actions/polls.actions.js';
import { history } from '../../../store.js';
import fire from "../../../common/components/Fire.js";
var auth = fire.auth();

class EditContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
		// selectedPoll: PropTypes.string.isRequired,
		// votes: PropTypes.object.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	// Upon first render,  tell the back end to get the poll on this page
	componentDidMount() {
		this.props.dispatch(pollActions.selectPoll(this.props.id));
		this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
	}

	// upon the component being updated and a new poll being selected, tell the back end to get the new poll's data
	componentDidUpdate(prevProps) {
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.selectPoll(this.props.id));
			this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
		}
	}

	componentWillMount() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				var email = user.email;
				this.setState({
					isLoggedIn: true,
					user: email
				});
			} else {
				this.setState({
					isLoggedIn: false
				});

			}
		});
	}

	render() {
		let { votes } = this.props;
		let pageContent = '';

		// If we're still fetching the data, tell the user
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Once the data is fetched... 
		else {
			if (this.state.user) {
				if (this.state.user !== votes.creator) {
					alert("This poll was not made by you. Redirecting...");
					history.push("");
					history.push(votes._id + "/vote");
				}
				pageContent = (
					<ul className="polls">
						<Edit {...votes} />
					</ul>
				)
			} else{
				pageContent = (
					<h3>Either you are not logged in or the user credentials are being retrieved.</h3>
				)
			}
		/*	} else{
				alert("Please login to edit this poll. Redirecting...");
				history.push("");
				history.push("/login");
			}  */
			// Redrect all poll data to the Poll component. 
		}
		return (
			<div className="poll">
				{pageContent}
			</div>
		);

	}
}

EditContainer.propTypes = {
	// selectedPoll: PropTypes.string.isRequired,
	// votes: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedPoll, votesByPoll } = state.home
	// If we have the poll's data, then move it to the Redux state, if not then keep isFetching true and votes empty
	const { isFetching, lastUpdated, votes } = votesByPoll[
		selectedPoll
	] || {
			isFetching: true,
			votes: []
		}

	return {
		selectedPoll,
		votes,
		isFetching,
		lastUpdated
	}
}

export default connect(mapStateToProps)(EditContainer);
