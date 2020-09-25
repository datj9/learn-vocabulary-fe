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
