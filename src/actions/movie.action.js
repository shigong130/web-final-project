import Axios from 'axios'

function requestNewMovie() {
    return {
        type: "REQUEST_NEW_MOVIE"
    }
}

function receiveNewMovieSuccess(postInfo) {
    return {
        type: "RESPONSE_NEW_MOVIE_SUCCESS",
        postInfo
    }
}

function receiveNewMovieError(postError) {
    return {
        type: "RESPONSE_NEW_MOVIE_ERROR",
        postError
    }
}

function requestGetMovie() {
    return {
        type: "REQUEST_GET_MOVIE"
    }
}

function receiveGetMovieSuccess(res) {
    return {
        type: "RESPONSE_GET_MOVIE_SUCCESS",
        res
    }
}

function receiveGetMovieError(postError) {
    return {
        type: "RESPONSE_GET_MOVIE_ERROR",
        postError
    }
}

function requestDeleteMovie() {
    return {
        type: "REQUEST_DELETE_MOVIE"
    }
}

function receiveDeleteMovieSuccess(deleteMovieId) {
    return {
        type: "RESPONSE_DELETE_MOVIE_SUCCESS",
        deleteMovieId
    }
}

function receiveDeleteMovieError(error) {
    return {
        type: "RESPONSE_DELETE_MOVIE_ERROR",
        error
    }
}

function requestPutMovie() {
    return {
        type: "REQUEST_PUT_MOVIE"
    }
}

function receivePutMovieSuccess(movieId) {
    return {
        type: "RESPONSE_PUT_MOVIE_SUCCESS",
        movieId
    }
}

function receivePutMovieError() {
    return {
        type: "RESPONSE_PUT_MOVIE_ERROR"
    }
}

export function addNewMovieToDb(newMovie) {
    return function(dispatch) {
        dispatch(requestNewMovie());
        return Axios.post(`/api/movie/`, newMovie)
            .then(
                response => dispatch(receiveNewMovieSuccess(response.data)),
                error => dispatch(receiveNewMovieError(error))
            );
    }
}

export function fetchMovie(movieId) {
    return function(dispatch) {
        dispatch(requestGetMovie());
        return Axios.get(`/api/movie/movieid/`+ movieId)
            .then(
                response => {dispatch(receiveGetMovieSuccess(response.data));
                    return response;},
                error => dispatch(receiveGetMovieError(error))
            );
    }
}

export function deleteMovie(movieid) {
    return function(dispatch) {
        dispatch(requestDeleteMovie());
        return Axios.delete(`/api/movie/`+ movieid)
            .then(
                response => dispatch(receiveDeleteMovieSuccess(response.data)),
                error => dispatch(receiveDeleteMovieError(error))
            );
    }
}

export function putMovie(movieId, update) {
    return function(dispatch) {
        dispatch(requestPutMovie());
        return Axios.put(`/api/movie/`  + movieId, update)
            .then(
                response => dispatch(receivePutMovieSuccess(response.data)),
                error => dispatch(receivePutMovieError(error))
            );
    }
}