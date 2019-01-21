import { pollConstants } from '../_constants/pollConstants.js';

// isFetching is a loading variable and is iniitally set to false
// didInvalidate is a variable for error handling and is initially set to false
// votes is an array for storing returned polls, and is initially set to empty
const initialState = {
    isChecking: false,
    didInvalidate: false,
    exists: null
}

// Upon receiving all the  votes for the poll(s), save them to the Redux state by calling the votes() function below (this reducer is mainly used to access the votes for the votes() function for readability)
export default function checkPolls(state = initialState, action) {
    switch (action.type) {
        case pollConstants.CHECK_POLL_REQUEST:
            return {
                ...state,
                isChecking: true,
                didInvalidate: false
            }
        case pollConstants.CHECK_POLL_SUCCESS:
            return {
                ...state,
                isChecking: false,
                didInvalidate: false,
                exists: action.exists
            }
        case pollConstants.CHECK_POLL_FAILURE:
            return {
                ...state,
                didInvalidate: true
            }
        default:
            return state
    }
}