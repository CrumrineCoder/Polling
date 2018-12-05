import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PollMini from '../components/PollMini';
import Tags from '../components/Tag';
import Search from '../components/Search';
import Form from '../components/Form';
import Current from '../components/Current';
import { pollActions } from '../../_actions/polls.actions.js';
import { withRouter } from 'react-router-dom';

class Polls extends Component {

	constructor(props) {
		super(props);
		this.state = { filter: "", query: "" };
		this.changeFilter = this.changeFilter.bind(this);
	}

	static propTypes = {
		selectedPoll: PropTypes.string.isRequired,
		polls: PropTypes.array.isRequired,
		isFetching: PropTypes.bool.isRequired,
		lastUpdated: PropTypes.number,
		dispatch: PropTypes.func.isRequired
	}

	componentDidMount() {
		this.props.dispatch(pollActions.selectPoll("All"));
		this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
	}

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
					return (item.title.toLowerCase().indexOf(el.toLowerCase()) > -1 || item.body.toLowerCase().indexOf(el.toLowerCase()) > -1);
				});
			});
		}

		if (this.state.query !== "") {
			polls = find(polls, this.state.query);
		}

		if (this.props.isFetching) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading. This may take half a minute depending on dynos.
      		    </div>
			)
		} else {
			pageContent = (
				<ul className="polls">
					{polls.map((poll, i) => <PollMini update={this.update} key={i} {...poll} />)}
				</ul>
			)
		}

		return (
			<div className="pollsContainer">
				<Search onSearch={this.handleSearchBar} />
				<Tags onChangeFilter={this.changeFilter} />
				<Current></Current>
				<Form></Form>
				{pageContent}
			</div>
		);

	}
}

Polls.propTypes = {
	selectedPoll: PropTypes.string.isRequired,
	polls: PropTypes.array.isRequired,
	isFetching: PropTypes.bool.isRequired,
	lastUpdated: PropTypes.number,
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { selectedPoll, votesByPoll } = state.home
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

export default withRouter(connect(mapStateToProps)(Polls));
