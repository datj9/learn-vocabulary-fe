import { fork, put, call, takeLatest, all } from "redux-saga/effects";
import * as actionTypes from "./action-types";
import BaseAPI from "../../api";
import { signUpSuccess, signUpFail } from "./actions";
import jwtDecode from "jwt-decode";

const api = BaseAPI("auth");

function* signUp({ payload }) {
	const res = yield call(api.post, "sign-up", payload);

	if (res.status === 201) {
		const { refreshToken, accessToken } = res.data;
		const user = jwtDecode(refreshToken);
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

export default function* userSagas() {
	yield all([fork(onSignUp)]);
}
