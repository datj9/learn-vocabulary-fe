import { fork, put, call, takeLatest, all, takeEvery } from "redux-saga/effects";
import * as actionTypes from "./action-types";
import BaseAPI from "../../api";
import { signUpSuccess, signUpFail, setUser } from "./actions";
import jwtDecode from "jwt-decode";

const api = BaseAPI("auth");

function* signUp({ payload }) {
    const res = yield call(api.post, "sign-up", payload);

    if (res.status === 201) {
        const { refreshToken, accessToken } = res.data;
        const user = jwtDecode(accessToken);

        yield put(signUpSuccess(user));
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);
    } else {
        yield put(signUpFail(res.data));
    }
}
function* onSignUp() {
    yield takeLatest(actionTypes.SIGN_UP_START, signUp);
}

function* signIn({ payload }) {
    const res = yield call(api.post, "sign-in", payload);

    if (res.status === 200) {
        const { refreshToken, accessToken } = res.data;
        const user = jwtDecode(accessToken);

        yield put(signUpSuccess(user));
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("accessToken", accessToken);
    } else {
        yield put(signUpFail(res.data));
    }
}
function* onSignIn() {
    yield takeLatest(actionTypes.SIGN_IN_START, signIn);
}

function* reqNewAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    const res = yield call(api.post, "generate-access-token", { refreshToken });

    if (res.status === 200) {
        const { accessToken } = res.data;
        const user = jwtDecode(accessToken);

        yield put(setUser(user));
        localStorage.setItem("accessToken", accessToken);
    }
}
function* onReqNewAccessToken() {
    yield takeEvery(actionTypes.REQ_NEW_ACCESS_TOKEN, reqNewAccessToken);
}

export default function* userSagas() {
    yield all([fork(onSignUp), fork(onSignIn), fork(onReqNewAccessToken)]);
}
