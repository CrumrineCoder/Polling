import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Poll from '../components/Poll';
import {
	doPolls
} from '../../_actions/doPolls';
import { bindActionCreators } from 'redux'

class Polls extends Component {

	constructor(props) {
		super(props);
		this.state = { poll: this.props.id };
		this.props.doPolls(this.state.poll);
	}

	render() {
		let { polls } = this.props;
		var isObject = polls.constructor === Object;
		if (isObject) {
			polls = [polls];
		}
		let pageContent = '';

		if (this.props.loading || polls.length === 0) {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Polls);
