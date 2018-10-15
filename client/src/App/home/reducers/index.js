import { combineReducers } from 'redux';

// import your Home Module reducers here and combine them
// Placed in same directory
import Articles from './applyArticles';

const home = combineReducers({
	Articles
});

export default home;

