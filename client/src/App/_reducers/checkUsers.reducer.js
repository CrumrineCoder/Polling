import { userConstants } from '../_constants/user.constants.js';

// isFetching is a loading variable and is iniitally set to false
// didInvalidate is a variable for error handling and is initially set to false
// votes is an array for storing returned polls, and is initially set to empty
const initialState = {
    isChecking: false,
    didInvalidate: false,
    exists: null
}

// Upon receiving all the  votes for the poll(s), save them to the Redux state by calling the votes() function below (this reducer is mainly used to access the votes for the votes() function for readability)
export default function checkUsers(state = initialState, action) {
    switch (action.type) {
        case userConstants.CHECK_USER_REQUEST:
            return {
                ...state,
                isChecking: true,
                didInvalidate: false
            }
        case userConstants.CHECK_USER_SUCCESS:
        console.log("Are we getting the variable?", action.exists);
            return {
                ...state,
                isChecking: false,
                didInvalidate: false,
                exists: action.exists
            }
        case userConstants.CHECK_USER_FAILURE:
            return {
                ...state,
                didInvalidate: true
            }
        default:
            return state
    }
}