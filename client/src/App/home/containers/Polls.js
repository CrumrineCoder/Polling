import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PollMini from '../components/PollMini';
import Tags from '../components/Tag';
import Search from '../components/Search';
import Form from '../components/Form';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
import Current from '../components/Current';
import {
	doPolls
} from '../../actions/doPolls';
import { bindActionCreators } from 'redux'

class Polls extends Component {

	constructor(props) {
		super(props);
		this.state = {filter: "", query: "" };
		this.changeFilter = this.changeFilter.bind(this);
	}

	componentDidMount() {
		this.props.doPolls("");
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
		var isObject = polls.constructor === Object;
		if (isObject) {
			polls = [polls];
		}
		let pageContent = ''

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

		if (this.props.loading) {
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
				<RegisterForm></RegisterForm>
				<LoginForm></LoginForm>
				<Current></Current>
				<Form></Form>
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
