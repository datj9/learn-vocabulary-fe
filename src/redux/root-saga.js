import { all, fork } from "redux-saga/effects";
import userSagas from "./user/sagas";
import testSagas from "./test/sagas";

export default function* () {
    yield all([fork(userSagas), fork(testSagas)]);
}
