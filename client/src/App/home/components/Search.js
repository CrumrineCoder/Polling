import React, { Component } from 'react';

class Search extends Component {
    /*
        constructor(props) {
            super(props);
               this.state = {
                   inputValue: ''
               }; 
        }
        */
    /*
        handleSearchChange = () => {
            console.log("State", this.state.inputValue);
            this.props.onSearch(this.state.inputValue);
        }
    
        updateInputValue(evt) {
            this.setState({
                inputValue: evt.target.value
            });
            console.log("Event", evt.target.value);
          //  this.handleSearchChange();
        }
    */
    updateInputValue(evt) {
        this.props.onSearch(evt.target.value);
        //  this.handleSearchChange();
    }
    render() {
        //    <button onClick={this.handleSearchChange}>Search</button>
        //value={this.state.inputValue}
        return (
            <div className="searchBar">
                <input onChange={evt => this.updateInputValue(evt)} placeholder="Search for Polls" ></input>

            </div>
        )
    }
}



export default Search;