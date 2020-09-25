import { all, fork } from "redux-saga/effects";
import userSagas from "./user/sagas";

export default function* () {
    yield all([fork(userSagas)]);
}
