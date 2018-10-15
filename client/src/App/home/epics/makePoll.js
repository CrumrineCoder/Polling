import { ajax } from 'rxjs/observable/dom/ajax';
import { ofType } from 'redux-observable';
import { catchError, mergeMap, map } from 'rxjs/operators';

import { MAKE_POLL_START } from '../actions/actionTypes';

import { makePollFulfilled, makePollFailed } from '../actions/makePoll';

// Also now using v6 pipe operators
//
const makePoll = (action$, state$) =>
	action$.pipe(
		ofType(MAKE_POLL_START),
		mergeMap(action => {
            let apiUrl = `/api/polls/`;
            console.log("BINGO BLAST");
			return ajax
				.getJSON(apiUrl)
				.pipe(
					map(response => makePollFulfilled(response["polls"])),
					catchError(error => makePollFailed(error.xhr.response))
				);
		})
	);

export default makePoll;
