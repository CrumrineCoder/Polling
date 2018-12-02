import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Poll from '../components/Poll';
import { pollActions } from '../../_actions/polls.actions.js';

class Polls extends Component {

	static propTypes = {
		selectedPoll: PropTypes.string.isRequired,
		votes: PropTypes.Array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount() {
		console.log("DID MOUNT");
		console.log(this.props);
		this.props.dispatch(pollActions.selectPoll(this.props.id));
		this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
	}

	componentDidUpdate(prevProps) {
		console.log("DID UPDATE");
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.selectPoll(this.props.id));
			this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
		}
	}


	render() {
		let { polls } = this.props;
	/*	var isObject = polls.constructor === Object;
		if (isObject) {
			polls = [polls];
		} */
		let pageContent = '';

		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading. This may take half a minute depending on dynos.
      		    </div>
			)
		} else {
			pageContent = (
				<ul className="polls">
					<Poll {...polls[0]} />
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
/*
Polls.propTypes = {
	polls: PropTypes.array
};

const mapStateToProps = state => {
	return {
		polls: state.home.Polls.polls,
		loading: state.home.Polls.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		doPolls
	}, dispatch)
}; */


Polls.propTypes = {
	selectedPoll: PropTypes.string.isRequired,
	votes: PropTypes.Array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	console.log("MAP STATE STATE", state);
	const { selectedPoll, votesByPoll } = state.home
	console.log("selectedPoll in Map State", selectedPoll);
	console.log("votesByPoll in  Map State", votesByPoll);
	const { isFetching, lastUpdated, votes } = votesByPoll[
		selectedPoll
	] || {
			isFetching: true,
			votes: []
		}
	console.log("Votes in Map State", votes);
	console.log("Fetching in  Map State", isFetching);
	return {
		selectedPoll,
		votes,
		isFetching,
		lastUpdated
	}
}

export default connect(mapStateToProps)(Polls);
