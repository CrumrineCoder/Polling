import { combineEpics } from 'redux-observable';

// import your Home Module epics here and combine them
// Place all epics in same directory
import Fetch from './fetchPolls';
import Make from "./makePoll";

const home = combineEpics(
	Fetch, Make
);

export default home