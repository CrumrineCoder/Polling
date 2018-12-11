import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';

class Results extends Component {

	static propTypes = {
		selectedPoll: PropTypes.string.isRequired,
		votes: PropTypes.object.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
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

	handleClick(e) {
		e.preventDefault();
		let user = JSON.parse(localStorage.getItem('user'));
		let answersLength = this.props.votes.answers.length;
		let userAnswersLength =  this.props.votes.userAnswers.length;
		console.log("PROPS", this.props)
		console.log("USER!", user);
		if (user && user.token) {
			const _parentID = this.props.id;
			user = {"id":user._id};
			this.props.dispatch(pollActions.rescind({ user, _parentID, answersLength, userAnswersLength }));
		}
	}

	render() {
		let polls = this.props;
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
					<Result {...polls} />
				</ul>
			)
		}

		return (
			<div className="poll">
				<button onClick={this.handleClick}>Rescind</button>
				{pageContent}
			</div>
		);

	}
}

Results.propTypes = {
	selectedPoll: PropTypes.string.isRequired,
	votes: PropTypes.object.isRequired,
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

export default withRouter(connect(mapStateToProps)(Results));