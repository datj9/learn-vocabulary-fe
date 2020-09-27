import * as actionTypes from "./action-types";

const INITIAL_STATE = {
    isLoading: false,
    loaded: false,
    test: {},
    testsList: [],
    resultsList: {},
    result: {},
    savedWords: [],
    saveSuccess: false,
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
                savedWords: payload.savedWords,
            };
        case actionTypes.CLEAN_UP:
            return {
                ...state,
                loaded: false,
                test: {},
                testsList: [],
            };
        case actionTypes.SAVE_WORD_SUCCESS:
            return { ...state, saveSuccess: true, savedWords: state.savedWords.concat([action.payload]) };
        case actionTypes.CLEAR_SAVE_SUCCESS:
            return {
                ...state,
                saveSuccess: false,
            };
        default:
            return state;
    }
}
