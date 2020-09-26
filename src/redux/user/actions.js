import * as actionTypes from "./action-types";

export const signUpStart = (user) => ({
    type: actionTypes.SIGN_UP_START,
    payload: user,
});
export const signUpSuccess = (user) => ({
    type: actionTypes.SIGN_UP_SUCCESS,
    payload: user,
});
export const signUpFail = (error) => ({
    type: actionTypes.SIGN_UP_FAILURE,
    payload: error,
});

export const signInStart = (user) => ({
    type: actionTypes.SIGN_IN_START,
    payload: user,
});
export const signInSuccess = (user) => ({
    type: actionTypes.SIGN_IN_SUCCESS,
    payload: user,
});
export const signInFail = (error) => ({
    type: actionTypes.SIGN_IN_FAILURE,
    payload: error,
});

export const logOut = () => ({
    type: actionTypes.LOG_OUT,
});

export const setUser = (user) => ({
    type: actionTypes.SET_USER,
    payload: user,
});

export const clearErrors = () => ({
    type: actionTypes.CLEAR_ERRORS,
});
