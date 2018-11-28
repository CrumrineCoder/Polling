import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import Polls from "../_reducers/polls.reducer.js";
import createPoll from "../_reducers/createPoll.reducer.js";
import votePoll from "../_reducers/votePoll.reducer.js";
import register from "../_reducers/register.reducer.js";
import authenticate from "../_reducers/authentication.reducer.js";
import users from "../_reducers/users.reducer.js";

const home = combineReducers({
	Polls, createPoll, votePoll, register, authenticate, users
});

export default home;

