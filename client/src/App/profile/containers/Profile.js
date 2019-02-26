import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditLink from '../components/EditLink';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
import fire from "../../common/components/Fire.js";
var auth = fire.auth();

// Landing page 
class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	static propTypes = {
		//	selectedPoll: PropTypes.string.isRequired,
		//	polls: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	// Upon first render,  tell the back end to get all polls
	componentDidMount() {
		this.props.dispatch(pollActions.selectPoll("All"));
		this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
	}

	// Upon updating, tell the back end to get all polls (if there's been any change)
	componentDidUpdate(prevProps) {
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.selectPoll("All"));
			this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
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

	filterByValue(array, string) {
		return array.filter(o =>
			Object.keys(o).some(k => o[k].toString().toLowerCase().includes(string.toLowerCase())));
	}

	render() {
		let { polls } = this.props;
		let { user } = this.state;
		let pageContent = '';

		// If we're fetching polls, tell the user why
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Show all polls as poll links 
		else {
			if (this.state.user) {
				var pollsByUser = polls.filter(function (poll) {
					return poll.creator == user;
				});
				pageContent = (
					<ul className="polls">
						{pollsByUser.map((poll, i) => <EditLink update={this.update} key={i} {...poll} />)}
					</ul>
				)
			} else {
				pageContent = (
					<h3>Either you are not logged in or the user credentials are being retrieved.</h3>
				)
			}
		}
		/*
		<Search onSearch={this.handleSearchBar} />
		<Tags onChangeFilter={this.changeFilter} />
		*/
		// Display the Form, header for polls listing, and all poll links
		return (
			<div className="pollsContainer">
				<h1>Your Polls</h1>
				{pageContent}
			</div>
		);

	}
}

Profile.propTypes = {
	//selectedPoll: PropTypes.string.isRequired,
	//polls: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedPoll, votesByPoll } = state.home
	// If we're still fetching polls, then let isFetching be true and polls be empty, else get information from the backend and put it in Redux state
	const { isFetching, lastUpdated, votes: polls } = votesByPoll[
		selectedPoll
	] || {
			isFetching: true,
			polls: []
		}
	return {
		selectedPoll,
		polls,
		isFetching,
		lastUpdated
	}

}

export default withRouter(connect(mapStateToProps)(Profile));
