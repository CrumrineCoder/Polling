import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';



// import root epics/reducer
import rootEpic from './rootEpic.js';
import rootReducer from './rootReducer.js';
import queryString from 'query-string';

const loggerMiddleware = createLogger();

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory();

const epicMiddleware = createEpicMiddleware(rootEpic, {
	dependencies: {
		queryString
	}
});

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history);

const store = createStore(
	rootReducer,
	applyMiddleware(epicMiddleware, appRouterMiddleware, thunkMiddleware, loggerMiddleware)
);

export default store;

