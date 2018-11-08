import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import Polls from './applyPolls';
import createPoll from "../_reducers/createPoll.reducer.js";
import votePoll from "../_reducers/votePoll.reducer.js";
import register from "../_reducers/register.reducer.js";

const home = combineReducers({
	Polls, createPoll, votePoll, register
});

export default home;

