import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    loaded: false,
    test: {},
    testsList: [],
    resultsList: {},
    result: {},
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
                loaded: true,
                testsList: payload.tests,
                resultsList: payload.results,
            };
        case actionTypes.GET_ONE_TEST_START:
            return {
                ...state,
                isLoading: true,
            };
        case actionTypes.GET_ONE_TEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loaded: true,
                test: payload.test,
                result: payload.result,
            };
        case actionTypes.CLEAN_UP:
            return {
                ...state,
                loaded: false,
                test: {},
                testsList: [],
            };
        default:
            return state;
    }
}
