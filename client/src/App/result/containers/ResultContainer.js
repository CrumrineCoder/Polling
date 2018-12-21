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
	handleBackClick(e) {
		e.preventDefault();
		history.push("");
		history.push(this.props.id + "/vote");
	}

	handleRescindClick(e) {
		e.preventDefault();
		let user = JSON.parse(localStorage.getItem('user'));
		let answersLength = this.props.votes.answers.length;
		let userAnswersLength = this.props.votes.userAnswers.length;
		if (user && user.token) {
			const _parentID = this.props.id;
			user = user.id;
			this.props.dispatch(pollActions.rescind({ user, _parentID, answersLength, userAnswersLength }));
		}
	}

	render() {
		let polls = this.props;
		let pageContent = '';
		let Rescind; 
		let Back; 
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
			if (id.indexOf(JSON.parse(localStorage.getItem('user')).id) === -1) {
				if(!this.props.votes.options.SeeResults){
					history.push("");
					history.push(polls.id + "/vote");
				} else{
					Back = (<button className = "btn-secondary btn" onClick={this.handleBackClick}{...this.props}><i className="fas fa-arrow-left"></i> Back to voting</button>);
				}
			} else if(this.props.votes.options.Rescind){
				Rescind = (<button className = "btn btn-outline-warning" onClick={this.handleRescindClick}><i className="fas fa-undo-alt"></i> Rescind vote</button>);
			}

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