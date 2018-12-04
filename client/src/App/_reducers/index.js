import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import {votesByPoll, selectedPoll, reducer} from "./polls.reducer.js";
import createPoll from "./createPoll.reducer.js";
import votePoll from "./votePoll.reducer.js";
import register from "./register.reducer.js";
import authenticate from "./authentication.reducer.js";
import users from "./users.reducer.js";

const home = combineReducers({
	votesByPoll, selectedPoll, createPoll, votePoll, register, authenticate, users, reducer
});

export default home;

