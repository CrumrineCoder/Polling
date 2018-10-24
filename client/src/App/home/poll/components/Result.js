import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Result extends Component {

	constructor(props) {
		super(props);
		this.state = { selected: "", _id: ""	};
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.goToResults = this.goToResults.bind(this);
	}

	handleSubmit() {
		var { selected, _id } = this.state;
		var questionID = this.props._id; 
		return axios.post('/api/polls/vote', {
			selected, _id
		})
			.then(this.goToResults(questionID))
	}

	goToResults(id) {
        this.props.history.push( "/polls/results/" + id );
    }

	handleOptionChange(evt) {
		this.setState({ selected: evt.target.value, _id: evt.target.id });
	}


	render() {
		var { selected } = this.state
		return (
			<div>
				<h1>{this.props.question}</h1>
                <h2>Result</h2>
				{this.props.answers.map(function (answer) {
					return (
						<div key={answer.text}>
							<label>{answer.text}</label>
							<input type="radio" checked={selected === answer.text} name="answer" onChange={this.handleOptionChange} value={answer.text} id={answer._id}/>
						</div>
					)
				}, this)
				}
				<button onClick={this.handleSubmit} className="btn btn-primary float-right">Submit</button>
			</div>
		)
	}

}

export default withRouter(Result);
