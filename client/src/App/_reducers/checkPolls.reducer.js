import { pollConstants } from '../_constants/pollConstants.js';

// isFetching is a loading variable and is iniitally set to false
// didInvalidate is a variable for error handling and is initially set to false
// votes is an array for storing returned polls, and is initially set to empty
const initialState = {
  isChecking: false,
  didInvalidate: false,
  exists: null
}