import Axios from 'axios'

function requestNewReview() {
    return {
        type: "REQUEST_NEW_REVIEW"
    }
}

function receiveNewReviewSuccess(postReview) {
    return {
        type: "RESPONSE_NEW_REVIEW_SUCCESS",
        postReview
    }
}

function receiveNewReviewError(error) {
    return {
        type: "RESPONSE_NEW_REVIEW_ERROR",
        error
    }
}

function requestGetReview() {
    return {
        type: "REQUEST_GET_REVIEW"
    }
}

function receiveGetReviewSuccess(res) {
    return {
        type: "RESPONSE_GET_REVIEW_SUCCESS",
        res
    }
}

function receiveGetReviewError(error) {
    return {
        type: "RESPONSE_GET_REVIEW_ERROR",
       error
    }
}

function requestDeleteReview() {
    return {
        type: "REQUEST_DELETE_REVIEW"
    }
}

function receiveDeleteReviewSuccess(deleteMovieId) {
    return {
        type: "RESPONSE_DELETE_REVIEW_SUCCESS",
        deleteMovieId
    }
}

function receiveDeleteReviewError(error) {
    return {
        type: "RESPONSE_DELETE_REVIEW_ERROR",
        error
    }
}


export function addNewReview(newReview) {
    return function(dispatch) {
        dispatch(requestNewReview());
        return Axios.post(`/api/review/`, newReview)
            .then(
                response => dispatch(receiveNewReviewSuccess(response.data)),
                error => {dispatch(receiveNewReviewError(error)), console.log(error)}
            );
    }
}

export function fetchReviews(movieId) {
    return function(dispatch) {
        dispatch(requestGetReview());
        return Axios.get(`/api/review/movieid/`+ movieId)
            .then(
                response => {

                    dispatch(receiveGetReviewSuccess(response.data));
                    return response;},
                error => dispatch(receiveGetReviewError(error))
            );
    }
}
export function deleteReviewByMovie(movieid) {
    return function(dispatch) {
        dispatch(requestDeleteReview());
        return Axios.delete(`/api/review/delete-many/`+ movieid)
            .then(
                response => dispatch(receiveDeleteReviewSuccess(response.data)),
                error => dispatch(receiveDeleteReviewError(error))
            );
    }
}