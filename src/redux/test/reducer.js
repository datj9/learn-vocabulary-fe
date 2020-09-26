import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    test: {},
    testsList: [],
    results: {},
};

export default function (state = INITIAL_STATE, action) {
    const { payload } = action;

    switch (action.type) {
        case actionTypes.GET_TESTS_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_TESTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                testsList: payload.tests,
                results: payload.results,
            };
        case actionTypes.GET_ONE_TEST_START:
            return {
                ...state,
                isLoading: true,
            };
        default:
            return state;
    }
}
