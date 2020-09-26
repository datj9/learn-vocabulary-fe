import * as actionTypes from "./action-types";

export const getTestsStart = () => ({
    type: actionTypes.GET_TESTS_START,
});
export const getTestsSuccess = (tests, results) => ({
    type: actionTypes.GET_TESTS_SUCCESS,
    payload: {
        tests,
        results,
    },
});
export const getTestsFail = () => ({
    type: actionTypes.GET_TESTS_FAILURE,
});

export const getOneTestStart = () => ({
    type: actionTypes.GET_ONE_TEST_START,
});
export const getOneTestSuccess = () => ({
    type: actionTypes.GET_ONE_TEST_SUCCESS,
});
export const getOneTestFail = () => ({
    type: actionTypes.GET_ONE_TEST_FAILURE,
});
