import {combineReducers} from 'redux'

function postMovie(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_NEW_MOVIE":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_NEW_MOVIE_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_NEW_MOVIE_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state
    }
}

function fetchMovie(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_GET_MOVIE":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_GET_MOVIE_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_GET_MOVIE_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state
    }
}

function deleteMovie(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_DELETE_MOVIE":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_DELETE_MOVIE_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_DELETE_MOVIE_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state

    }
}


function putMovie(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_PUT_MOVIE":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_PUT_MOVIE_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_PUT_MOVIE_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state

    }
}

export default combineReducers({
    postMovie,
    fetchMovie,
    putMovie,
    deleteMovie
});