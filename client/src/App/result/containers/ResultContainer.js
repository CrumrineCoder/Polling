import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';
import {
	doPolls, doPollsFailed
} from '../../_actions/doPolls';
import { pollActions } from '../../_actions/polls.actions.js';
import { bindActionCreators } from 'redux'

class Results extends Component {

	static propTypes = {
		selectedPoll: PropTypes.string.isRequired,
		votes: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	  }

	componentDidMount() {
		console.log("DID MOUNT");
		console.log(this.props); 
		this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
	  }

	  componentDidUpdate(prevProps) {
		  console.log("DID UPDATE");
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
			this.props.dispatch(pollActions.fetchVotesIfNeeded(this.props.id));
		}
	  }

	render() {
		console.log("Results props", this.props);
		let polls  = this.props;
		console.log("PROPS", polls);
		console.log("STATE", this.state);
		let pageContent = '';
		if (this.props.isFetching) {
			console.log("TRUE");
			pageContent = (
				<div className="pollsLoader">
					The content is loading. This may take half a minute depending on dynos.
      		    </div>
			)
		} else {
			console.log("FALSE");
			pageContent = (
				<ul className="polls">
					<Result {...polls} />
				</ul>
			)
		} 
		/*	 { this.props.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>}
           <div style={{ opacity:this.props.isFetching ? 0.5 : 1 }}>
              <Result {...polls} />
            </div>
        }*/
		return (
			<div className="poll">
				{pageContent}
			</div>
		);

	}
}
/*
Results.propTypes = {
	results: PropTypes.array
};

const mapStateToProps = state => {
	console.log(state.home);
	return {
		polls: state.home.Polls.polls,
		loading: state.home.Polls.isLoading
	};
};

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		doPolls
	}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Results); */

Results.propTypes = {
	selectedPoll: PropTypes.string.isRequired,
	votes: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
  }

function mapStateToProps(state) {
	console.log("MAP STATE STATE", state); 
	const { selectedPoll, votesByPoll } = state.home
	const { isFetching, lastUpdated, items: votes } = votesByPoll[
		selectedPoll
	] || {
	  isFetching: true,
	  items: []
	}

	return {
	  selectedPoll,
	  votes,
	  isFetching,
	  lastUpdated
	}
}

export default connect(mapStateToProps)(Results);