import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { REQUEST_POLLS_START } from '../actions/actionTypes';

import { doPollsFulfilled, doPollsFailed } from '../actions/doPolls';

// Also now using v6 pipe operators
//
const fetchPolls = (action$, state$) =>
	action$.pipe(
		ofType(REQUEST_POLLS_START),
		mergeMap(action => {
			let apiUrl = `/api/polls/${action.payload}`;
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => doPollsFulfilled(response["Polls"])),
					catchError(error => doPollsFailed(error.xhr.response))
				);
		})
	);

export default fetchPolls;
