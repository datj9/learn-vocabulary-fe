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

export const getOneTestStart = (testId) => ({
    type: actionTypes.GET_ONE_TEST_START,
    payload: testId,
});
export const getOneTestSuccess = (test, result) => ({
    type: actionTypes.GET_ONE_TEST_SUCCESS,
    payload: { test, result },
});
export const getOneTestFail = () => ({
    type: actionTypes.GET_ONE_TEST_FAILURE,
});

export const cleanUp = () => ({
    type: actionTypes.CLEAN_UP,
});

export const saveWordStart = () => ({
    type: actionTypes.SAVE_WORD_START,
});
export const saveWordSuccess = () => ({
    type: actionTypes.SAVE_WORD_SUCCESS,
});
