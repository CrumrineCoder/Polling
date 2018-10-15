import { combineEpics } from 'redux-observable';

// import your Home Module epics here and combine them
// Place all epics in same directory
import Fetch from './fetchPolls';

const home = combineEpics(
	Fetch
);

export default home