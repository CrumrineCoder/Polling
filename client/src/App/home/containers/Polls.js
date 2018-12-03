import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PollMini from '../components/PollMini';
import Tags from '../components/Tag';
import Search from '../components/Search';
import Form from '../components/Form';
import Current from '../components/Current';
import { pollActions } from '../../_actions/polls.actions.js';

class Polls extends Component {

	constructor(props) {
		super(props);
		this.state = {filter: "", query: "" };
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
		console.log("DID MOUNT");
		console.log(this.props);
	//	this.props.dispatch(pollActions.selectPoll(this.props.id));
		this.props.dispatch(pollActions.fetchVotesIfNeeded("All"));
	}

	componentDidUpdate(prevProps) {
		console.log("DID UPDATE");
		if (this.props.selectedPoll !== prevProps.selectedPoll) {
	//		this.props.dispatch(pollActions.selectPoll(this.props.id));
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
	/*	var isObject = polls.constructor === Object;
		if (isObject) {
			polls = [polls];
		} */
		let pageContent = ''
		console.log("Polls props", this.props); 

		if (this.state.filter !== '') {
			polls = polls.filter((i) => i.tag === this.state.filter);
		}

		function find(items, text) {
			text = text.split(' ');
			return items.filter(function (item) {
				return text.every(function (el) {
					return (item.title.toLowerCase().indexOf(el.toLowerCase()) > -1 || item.body.toLowerCase().indexOf(el.toLowerCase()) >-1 );
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
			console.log("Polls poll", polls); 
			pageContent = (
				<ul className="polls">
					{polls.map((poll, i) => <PollMini update={this.update} key={i} {...poll} />)}
				</ul>
			)
		}
		//<LoginForm></LoginForm>
		//<RegisterForm></RegisterForm>
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
	console.log("MAP STATE STATE", state);
	const { selectedPoll, votesByPoll } = state.home
	console.log("selectedPoll in Map State", selectedPoll);
	console.log("votesByPoll in  Map State", votesByPoll);
	const { isFetching, lastUpdated, votes:polls } = votesByPoll[
		selectedPoll
	] || {
			isFetching: true,
			polls: []
		}
	console.log("Votes in Map State", polls);
	console.log("Fetching in  Map State", isFetching);
	return {
		selectedPoll,
		polls,
		isFetching,
		lastUpdated
	}
}

export default connect(mapStateToProps)(Polls);
