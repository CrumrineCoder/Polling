import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Result from '../components/Result';
import {
	doPolls
} from '../../_actions/doPolls';
import { pollActions } from '../../_actions/polls.actions.js';
import { bindActionCreators } from 'redux'

class Results extends Component {

	constructor(props) {
		super(props);
		this.state = { poll: this.props };
		console.log("State", this.state);

		//	this.props.doPolls(this.state.poll);
	}
	componentWillMount() {
		this.props.dispatch(pollActions.getOne(this.state.poll.id));
	}


	render() {
		console.log("Results props", this.props);
		let { polls } = this.props;
		let pageContent = '';
		console.log("LOADING", this.props.loading); 
		if (this.props.loading === 0) {
			pageContent = (
				<div className="pollsLoader">
					The content is loading. This may take half a minute depending on dynos.
      		    </div>
			)
		} else {
			console.log("RESULT PROPS AFTER LOADING", this.props);
			var isObject = polls.constructor === Object;
			if (isObject) {
				polls = [polls];
			}

			pageContent = (
				<ul className="polls">
					<Result {...polls[0]} />
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

function mapStateToProps(state) {
	console.log("Home", state.home);
	const { getPolls } = state.home.Polls;
	return {
		getPolls
	};
}

export default connect(mapStateToProps)(Results);