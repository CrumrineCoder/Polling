import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createHashHistory';
import { routerMiddleware } from 'react-router-redux';

import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';



// import root epics/reducer
import rootReducer from './rootReducer.js';

const loggerMiddleware = createLogger();

// export `history` to use in index.js, we using `createBrowserHistory`
export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const appRouterMiddleware = routerMiddleware(history);

const store = createStore(
	rootReducer,
	applyMiddleware(appRouterMiddleware, thunkMiddleware, loggerMiddleware)
);

export default store;

