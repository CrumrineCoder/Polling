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

	componentDidMount() {
		this.props.dispatch(pollActions.selectPoll(this.props.id));
		this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.selectPoll(this.props.id));
			this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
		}
	}

	render() {
		let { votes } = this.props;
		let pageContent = '';

		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading. This may take half a minute depending on dynos.
      		    </div>
			)
		} else {
			let id = [];
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
			if (localStorage.getItem('user')) {
				if (id.indexOf(JSON.parse(localStorage.getItem('user')).id) !== -1) {
					history.push("");
					history.push(votes._id + "/results");

				}
			} 

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
