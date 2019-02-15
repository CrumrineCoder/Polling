import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Poll from '../components/Poll';
import { pollActions } from '../../_actions/polls.actions.js';
import { history } from '../../store.js';

class Polls extends Component {

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

	render() {
		let { votes } = this.props;
		let pageContent = '';
		console.log(this.props);
		// If we're still fetching the data, tell the user
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Once the data is fetched... 
		else {
			// Get all of the users 
			let id = [];
			console.log(this.props.votes);
			if (this.props.votes.answers[0].Users) {
				for (var i = 0; i < this.props.votes.answers.length; i++) {
					for (var j = 0; j < this.props.votes.answers[i].Users.length; j++) {
						id.push(this.props.votes.answers[i].Users[j]);
					}
				}
				for (var k = 0; k < this.props.votes.userAnswers.length; k++) {
					for (var l = 0; l < this.props.votes.userAnswers[k].Users.length; l++) {
						id.push(this.props.votes.userAnswers[k].Users[l]);
					}
				}
				// If the current user matches ANY of the votes, redirect them to the results
				if (localStorage.getItem('user')) {
					if (id.indexOf(JSON.parse(localStorage.getItem('user')).id) !== -1) {
						history.push("");
						history.push(votes._id + "/results");
					}
				}
			}
			// Redirect all poll data to the Poll component. 
			pageContent = (
				<ul className="polls">
					<Poll {...votes} />
				</ul>
			)
		}
		return (
			<div className="poll">
				{pageContent}
			</div>
		);

	}
}

Polls.propTypes = {
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

export default connect(mapStateToProps)(Polls);
