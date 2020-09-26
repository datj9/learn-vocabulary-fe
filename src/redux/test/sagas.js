import { all, put, fork, takeEvery, call } from "redux-saga/effects";
import BaseAPI from "../../api";
import { getTestsSuccess, getTestsFail, getOneTestSuccess } from "./actions";
import * as actionTypes from "./action-types";

const api = BaseAPI("tests");

function* getTests() {
    const res = yield call(api.get, "");
    if (res.status === 200) {
        yield put(getTestsSuccess(res.data.tests, res.data.results));
    } else {
        yield put(getTestsFail());
    }
}

function* onGetTests() {
    yield takeEvery(actionTypes.GET_TESTS_START, getTests);
}

function* getOneTest({ payload: testId }) {
    const res = yield call(api.get, `/${testId}`);

    if (res.status === 200) {
        yield put(getOneTestSuccess(res.data.test, res.data.result));
    }
}

function* onGetOneTest() {
    yield takeEvery(actionTypes.GET_ONE_TEST_START, getOneTest);
}

export default function* testSagas() {
    yield all([fork(onGetTests), fork(onGetOneTest)]);
}
