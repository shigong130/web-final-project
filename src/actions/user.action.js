import Axios from 'axios'

function loginAttempt() {
    return {
        type: "LOGIN_ATTEMPT"
    }
}

function loginSuccess(email) {
    return {
        type: "LOGIN_SUCCESS",
        email
    }
}

function loginFailure(error) {
    return {
        type: "LOGIN_FAILURE",
        error
    }
}

function registerAttempt() {
    return {
        type: "REGISTER_ATTEMPT"
    }
}

function registerSuccess(email) {
    return {
        type: "REGISTER_SUCCESS",
        email
    }
}

function registerFailure(error) {
    return {
        type: "REGISTER_FAILURE",
        error
    }
}


export function selectUser(user) {
    return {
        type: "SELECT_USER",
        ... user
    }
}

export function validate(user) {
    return  {...user,
        type: 'VALIDATE_REGISTER_USER'}
}

export function clear() {
    return {
        type: "CLEAR"
    }
}


function loadingProfile() {
    return {
        type: "REQUEST_PROFILE"
    }
}

function receiveProfile(profile) {
    return {
        type: "RECEIVE_PROFILE",
        profile
    }
}

function profileFailure(error) {
    return {
        type: "ERROR_PROFILE",
        error
    }
}

function requestLogout() {
    return {
        type: "REQUEST_LOGOUT"
    }
}

function receiveLogout() {
    return {
        type: "RECEIVE_LOGOUT",
    }
}

function logoutFailure(error) {
    return {
        type: "ERROR_LOGOUT",
        error
    }
}

function logoutSuccess() {
    return {
        type: "LOGOUT_SUCCESS",

    }
}

function requestPutFav() {
    return {
        type: "REQUEST_UPDATE_FAV"
    }
}

function receivePutFavSuccess(email) {
    return {
        type: "RESPONSE_PUT_FAV_SUCCESS",
        email
    }
}

function receivePutFavError() {
    return {
        type: "RESPONSE_PUT_FAV_ERROR"
    }
}

export function fetchProfile() {
    return function(dispatch) {
        dispatch(loadingProfile());
        return Axios.get(`/api/user/profile`)
            .then(response => {
                dispatch(receiveProfile(response.data))
                return response;},
                    error => {
                dispatch(profileFailure(error.response.data));
                return error; }
            );
    }
}
export function logout() {
    return function (dispatch) {
        dispatch(requestLogout());
        return Axios.get('/api/user/logout')
            .then(response => {
                    dispatch(receiveLogout()),
                    dispatch(logoutSuccess())},
                error => dispatch(logoutFailure(error.response.data))
            );
    }
}


export function login(user) {
    return function (dispatch) {
        dispatch(loginAttempt());
        return Axios.post('/api/user/authenticate', user)
            .then(response => {
                dispatch(loginSuccess(response.data.email)),
                dispatch(selectUser(response.data))},
                error => dispatch(loginFailure(error.response.data))
            );
    }
}

export function register(email, password) {
    return function (dispatch) {
        dispatch(registerAttempt());
        return Axios.post('/api/user/', {email, password})
            .then(response => {
                    dispatch(registerSuccess(response.data));
                    return response;
                },
                error => {
                    console.log(error.response.data);
                    dispatch(registerFailure(error));
                    return error.response.data;
            }
            );
    }
}

export function succeedLogIn(data) {
    return function (dispatch) {
        dispatch(receiveProfile(data));
    }
}

export function updateFav(update) {
    return function(dispatch) {
        dispatch(requestPutFav());
        return Axios.patch(`/api/user/addfav`, update)
            .then(
                response => dispatch(receivePutFavSuccess(response.data)),
                error => dispatch(receivePutFavError(error))
            );
    }
}
