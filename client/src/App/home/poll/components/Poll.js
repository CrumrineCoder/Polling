import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Poll extends Component {

	constructor(props) {
		super(props);
		console.log("Bazinga", props); 
		this.state = { selected: "", _id: ""	};
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.goToResults = this.goToResults.bind(this);
	}

	handleSubmit() {
		var { selected, _id } = this.state;
		var questionID = this.props._id; 
	//	var { selected } = this.state; 
	    console.log(this.state); 
		console.log(this.props); 
	//	var {_id} = this.props; 
		return axios.post('/api/polls/vote', {
			selected, _id
		})
			.then(this.goToResults(questionID))
	}

	goToResults(id) {
        this.props.history.push("results/" + id);
    }

	handleOptionChange(evt) {
		console.log(evt.target.value);
		this.setState({ selected: evt.target.value, _id: evt.target.id });
	}


	render() {
		console.log("INNER POLLS", this.props)
		var { selected } = this.state
		return (
			<div>
				<h1>{this.props.question}</h1>
				{this.props.answers.map(function (answer) {
					console.log("Answer", answer)
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

export default withRouter(Poll);
