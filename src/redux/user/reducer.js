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
            };
        case actionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload,
            };
        case actionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: payload,
            };
        default:
            return state;
    }
}
