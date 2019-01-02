// To be used for setting up alerts, such as when a user creates a poll or logs out. 

import { alertConstants } from '../_constants/alertConstants.js';

export const alertActions = {
    success,
    error,
    clear
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}