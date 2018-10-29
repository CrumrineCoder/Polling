import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import Polls from './applyPolls';
import createPoll from "../_reducers/createPoll.reducer.js";

const home = combineReducers({
	Polls, createPoll
});

export default home;

