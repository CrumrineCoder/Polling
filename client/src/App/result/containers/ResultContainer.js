import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';
import { history } from '../../store.js';

class Results extends Component {

	static propTypes = {
		// selectedPoll: PropTypes.string.isRequired,
		// votes: PropTypes.object.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
		this.handleRescindClick = this.handleRescindClick.bind(this);
		this.handleBackClick = this.handleBackClick.bind(this);
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

	// Button logic for returning to the voting page if the poll creator turned on SeeResults
	handleBackClick(e) {
		e.preventDefault();
		history.push("");
		history.push(this.props.id + "/vote");
	}

	// Button logic for rescinding a user's vote if the poll creator turned on rescind. 
	handleRescindClick(e) {
		e.preventDefault();
		let user = JSON.parse(localStorage.getItem('user'));
		let answersLength = this.props.votes.answers.length;
		let userAnswersLength = this.props.votes.userAnswers.length;
		if (user && user.token) {
			const _parentID = this.props.id;
			user = user.id;
			// If the user is logged in, send the information to the backend to rescind the user's vote
			this.props.dispatch(pollActions.rescind({ user, _parentID, answersLength, userAnswersLength }));
		}
	}

	render() {
		let polls = this.props;
		console.log(polls);
		let pageContent = '';
		let Rescind;
		let Back;
		// If we're still getting the data, tell the user why
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Once we've gotten the data
		else {
			// Verify that the user hasn't voted before by checking every poll and user answer
			let id = [];
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
				if (id.indexOf(JSON.parse(localStorage.getItem('user')).id) === -1) {
					if (!this.props.votes.options.SeeResults) {
						history.push("");
						history.push(polls.id + "/vote");
					} // Because the user hasn't already voted and wasn't redirected away for not voting, we can create the back to voting button here in the logic thread. 
					else {
						Back = (<button className="btn-secondary btn" onClick={this.handleBackClick}{...this.props}><i className="fas fa-arrow-left"></i> Back to voting</button>);
					}
					// If rescind is turned on, also create a rescind button. We do the logic here because if the user has already voted, we can check the logic of the option here. 
				} else if (this.props.votes.options.Rescind) {
					Rescind = (<button className="btn btn-outline-warning" onClick={this.handleRescindClick}><i className="fas fa-undo-alt"></i> Rescind vote</button>);
				}
			}

			// Send data to the result
			pageContent = (
				<ul className="polls">
					<Result {...polls} />
				</ul>
			)
		}

		return (
			<div className="poll">
				{Back}
				{Rescind}
				{pageContent}
			</div>
		);

	}
}

Results.propTypes = {
	// selectedPoll: PropTypes.string.isRequired,
	// votes: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedPoll, votesByPoll } = state.home
	// If we've got the data, save it. If not, we're still fetching and votes are empty. 
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