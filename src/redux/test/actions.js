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
export const getOneTestSuccess = (test, result, savedWords) => ({
    type: actionTypes.GET_ONE_TEST_SUCCESS,
    payload: { test, result, savedWords },
});
export const getOneTestFail = () => ({
    type: actionTypes.GET_ONE_TEST_FAILURE,
});

export const cleanUp = () => ({
    type: actionTypes.CLEAN_UP,
});

export const saveWordStart = (wordId) => ({
    type: actionTypes.SAVE_WORD_START,
    payload: { word: wordId },
});
export const saveWordSuccess = (word) => ({
    type: actionTypes.SAVE_WORD_SUCCESS,
    payload: word,
});

export const clearSaveSuccess = () => ({
    type: actionTypes.CLEAR_SAVE_SUCCESS,
});

export const getSavedWordsStart = () => ({
    type: actionTypes.GET_SAVED_WORDS_START,
});
export const getSavedWordsSuccess = (words) => ({
    type: actionTypes.GET_SAVED_WORDS_SUCCESS,
    payload: words,
});

export const saveResult = (indexOfQuestion, answer, test) => ({
    type: actionTypes.SAVE_RESULT,
    payload: {
        indexOfQuestion,
        answer,
        test,
    },
});
