import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PollLink from '../components/PollLink';
//import Tags from '../components/Tag';
import Search from '../components/Search';
import Form from '../components/Form';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';

// Landing page 
class Home extends Component {

	constructor(props) {
		super(props);
		// Used for when searching and tagging functionality whenever that comes
		this.state = { filter: "", query: "" };
		this.changeFilter = this.changeFilter.bind(this);
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

	handleSearchBar = (queryValue) => {
		this.setState({
			query: queryValue
		});
	}

	changeFilter(filter) {
		this.setState({
			filter: filter
		});
	}

	render() {
		let { polls } = this.props;
		let pageContent = '';

		if (this.state.filter !== '') {
			polls = polls.filter((i) => i.tag === this.state.filter);
		}

		function find(items, text) {
			text = text.split(' ');
			return items.filter(function (item) {
				return text.every(function (el) {
					return (item.question.toLowerCase().indexOf(el.toLowerCase()) > -1);
				});
			});
		}

	

		// If we're fetching polls, tell the user why
		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading, but because this site uses a free Heroku server it has to warm up before it can get the data. This will take only 10 seconds to a minute, so please be patient! Once the servers are warmed up, the site will load content like normal.
      		    </div>
			)
		} // Show all polls as poll links 
		else {
			if (this.state.query !== "") {
				polls = find(polls, this.state.query);
			}
			pageContent = (
				<ul className="polls">
					{polls.map((poll, i) => <PollLink update={this.update} key={i} {...poll} />)}
				</ul>
			)
		}
		
		
		/*
		<Tags onChangeFilter={this.changeFilter} />
		*/
		// Display the Form, header for polls listing, and all poll links
		return (
			<div className="pollsContainer">	
				<Form></Form>
				<h1>All Polls Listing</h1>
				<Search onSearch={this.handleSearchBar} />
				{pageContent}
			</div>
		);

	}
}

Home.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Home));
