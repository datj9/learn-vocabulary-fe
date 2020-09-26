import { all, put, fork, takeEvery, call } from "redux-saga/effects";
import BaseAPI from "../../api";
import { getTestsSuccess, getTestsFail } from "./actions";
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

export default function* testSagas() {
    yield all([fork(onGetTests)]);
}
