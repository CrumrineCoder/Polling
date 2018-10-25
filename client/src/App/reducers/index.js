import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import Polls from './applyPolls';

const home = combineReducers({
	Polls
});

export default home;

