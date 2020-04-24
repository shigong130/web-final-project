import {combineReducers} from 'redux'

function postReview(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_NEW_REVIEW":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_NEW_REVIEW_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
                error: action.error
            });
        case "RESPONSE_NEW_REVIEW_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state
    }
}

function fetchReview(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_GET_REVIEW":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_GET_MOVIE_REVIEW":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
                error: action.error
            });
        case "RESPONSE_GET_MOVIE_REVIEW":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state
    }
}

function deleteReviewByMovie(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_DELETE_REVIEW":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_DELETE_REVIEW_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_DELETE_REVIEW_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state

    }
}

export default combineReducers({
    postReview,
    fetchReview,
    deleteReviewByMovie
});