import {combineReducers} from 'redux'

function valid(state = {
    success: false,
    message: '',
}, action) {
    switch (action.type) {
        case 'VALIDATE_REGISTER_USER':
            if (!action.password || !action.validatePassword || !action.email) {
                return {...state, message: 'All fields are required.'};
            }
            if (action.password !== action.validatePassword) {
                return {...state, message: 'The passwords must match.'};
            }
            return { success: true, message: '', };
        default:
            return {success: false, message: ''};
    }
}

function error(state = '', action) {
   // console.log(action)
    switch (action.type) {
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
        case 'LOGOUT_FAILURE':
            return action.error;
        case 'LOGIN_ATTEMPT':
        case 'REGISTER_ATTEMPT':
            return '';
        default:
            return state;
    }
}

function inFlight(state = false, action) {
    return action.type === 'LOGIN_ATTEMPT';
}


function getProfile(
    state = {
        inFlight: false,
        profile: ''
    },
    action) {

    switch (action.type) {
        case "REQUEST_PROFILE":
            return Object.assign({}, state, {
                inFlight: true,
                profile: action.profile
            });
        case "RECEIVE_PROFILE":
            return Object.assign({}, state, {
                inFlight: false,
                profile: action.profile
            });
        case "ERROR_PROFILE":
            return Object.assign({}, state, {
                inFlight: false,
                profile: ''
            });
        default:
            return state
    }}

function logout(
    state = {
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_LOGOUT":
            return Object.assign({}, state, {
                inFlight: true,
            });
        case "RECEIVE_LOGOUT":
            return Object.assign({}, state, {
                inFlight: false,
            });

        default:
            return state

    }
}

function redirect(state = '', action) {
    if (action.type === 'LOGIN_SUCCESS' || action.type === 'REGISTER_SUCCESS' ) {
        return '/profile/';
    }else if(action.type === 'LOGOUT_SUCCESS'){
        return '/login/';
    }
    return '';
}


function updateFav(
    state = {
        requestStatus: "NONE",
        inFlight: false,
    },
    action
) {
    switch (action.type) {
        case "REQUEST_PUT_FAV":
            return Object.assign({}, state, {
                requestStatus: "SENDING",
                inFlight: true,
            });
        case "RESPONSE_PUT_FAV_ERROR":
            return Object.assign({}, state, {
                requestStatus: "ERROR",
                inFlight: false,
            });
        case "RESPONSE_PUT_FAV_SUCCESS":
            return Object.assign({}, state, {
                requestStatus: "SUCCESS",
                inFlight: false,
            });
        default:
            return state

    }
}


export default combineReducers({
    error,
    inFlight,
    redirect,
    valid,
    getProfile,
    logout
});