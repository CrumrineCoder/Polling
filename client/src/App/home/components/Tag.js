import React, { Component } from 'react';

class Tags extends Component {

    constructor(props) {
        super(props);
        this.state = { selected: "" };
    }

    setFilter(filter) {
        this.setState({ selected: filter })
        this.props.onChangeFilter(filter);
    }

    isActive(value) {
        return "btn " + ((value === this.state.selected) ? 'active' : 'default');
    }

    render() {
        return (
            <div className="tags">
                <button className={this.isActive('')} onClick={this.setFilter.bind(this, '')}>All</button>
                <button className={this.isActive('Dev Diary')} onClick={this.setFilter.bind(this, 'Dev Diary')}>Open Polls</button>
                <button className={this.isActive('Case Study')} onClick={this.setFilter.bind(this, 'Case Study')}>Closed Polls</button>
            </div>
        )
    }
}



export default Tags;