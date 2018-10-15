import React, { Component } from 'react';
import {
	makePoll
} from '../actions/makePoll';

class Form extends Component {
    
        constructor(props) {
            super(props);
               this.state = {
                   question: ''
               }; 
        }
        
        handleSubmit() {
            var { question } = this.state;
            
          }
    updateInputValue(evt) {
        this.props.onSearch(evt.target.value);
        //  this.handleSearchChange();
    }
    render() {
        //    <button onClick={this.handleSearchChange}>Search</button>
        //value={this.state.inputValue}
        return (
            <div className="form">
                <form>
                    <input onChange={evt => this.updateInputValue(evt)} placeholder="Search for Polls" ></input>
                </form>
            </div>
        )
    }
}


export default Form;