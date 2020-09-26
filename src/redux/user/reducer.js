import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    currentUser: {},
    isAuthenticated: false,
    errors: {},
};

export default function (state = INITIAL_STATE, action) {
    const { payload, type } = action;
    switch (type) {
        case actionTypes.SIGN_UP_START:
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.SIGN_IN_START:
            return {
                ...state,
                isLoading: true,
                errors: {},
            };
        case actionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.SIGN_IN_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        case actionTypes.LOG_OUT:
            return {
                ...state,
                currentUser: {},
                isAuthenticated: false,
            };
        case actionTypes.SET_USER:
            return {
                ...state,
                currentUser: payload,
                isAuthenticated: true,
            };
        case actionTypes.CLEAR_ERRORS:
            return { ...state, errors: {} };
        default:
            return state;
    }
}
