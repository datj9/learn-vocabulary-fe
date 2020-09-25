import { fork, put, call, takeLatest, all } from "redux-saga/effects";
import * as actionTypes from "./action-types";
import BaseAPI from "../../api";

const api = BaseAPI("auth");

function* signUp({ payload }) {
    const res = yield call(api.post, "sign-up", payload);
    console.log(res);
}
function* onSignUp() {
    yield takeLatest(actionTypes.SIGN_UP_START, signUp);
}

export default function* userSagas() {
    yield all([fork(onSignUp)]);
}
