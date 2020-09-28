import { all, put, fork, takeEvery, call, apply, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import BaseAPI from "../../api";
import { getTestsSuccess, getTestsFail, getOneTestSuccess, saveWordSuccess, getSavedWordsSuccess } from "./actions";
import * as actionTypes from "./action-types";
import { apiURL } from "../../api";
import io from "socket.io-client";

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
    const res = yield call(api.get, `${testId}`);

    if (res.status === 200) {
        yield put(getOneTestSuccess(res.data.test, res.data.result, res.data.savedWords));
    }
}

function* onGetOneTest() {
    yield takeEvery(actionTypes.GET_ONE_TEST_START, getOneTest);
}

function createWebSocketConnection() {
    const socket = io(apiURL);

    return new Promise((resolve) => {
        socket.on("connect", () => {
            resolve(socket);
        });
    });
}
function createSocketChannel(socket) {
    return eventChannel((emit) => {
        const wordHandler = (event) => {
            emit(event);
        };

        socket.on("resNewSavedWord", wordHandler);
        socket.on("resSavedWords", wordHandler);

        const unsubscribe = () => {
            socket.off("resNewSavedWord", wordHandler);
            socket.off("resSavedWords", wordHandler);
        };

        return unsubscribe;
    });
}
function* saveWord(socket, { payload: { word } }) {
    const accessToken = localStorage.getItem("accessToken");

    yield apply(socket, socket.emit, ["saveWord", { word, accessToken }]);
}
function* onSaveWord(socket) {
    yield takeEvery(actionTypes.SAVE_WORD_START, saveWord, socket);
}
function* watchResSaveWord(socket) {
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            const payload = yield take(socketChannel);

            if (payload.newSavedWord) {
                yield put(saveWordSuccess(payload.newSavedWord.word));
            }
        } catch (error) {}
    }
}
function* saveWordFlow() {
    const socket = yield call(createWebSocketConnection);

    yield fork(onSaveWord, socket);
    yield fork(watchResSaveWord, socket);
}

function* getSavedWords(socket) {
    const accessToken = localStorage.getItem("accessToken");

    yield apply(socket, socket.emit, ["getSavedWords", { accessToken }]);
}
function* onGetSavedWords(socket) {
    yield takeEvery(actionTypes.GET_SAVED_WORDS_START, getSavedWords, socket);
}
function* watchResGetSavedWords(socket) {
    const socketChannel = yield call(createSocketChannel, socket);

    while (true) {
        try {
            const payload = yield take(socketChannel);

            if (payload.savedWords) {
                yield put(getSavedWordsSuccess(payload.savedWords));
            }
        } catch (error) {}
    }
}
function* getSavedWordsFlow() {
    const socket = yield call(createWebSocketConnection);

    yield fork(onGetSavedWords, socket);
    yield fork(watchResGetSavedWords, socket);
}

export default function* testSagas() {
    yield all([fork(onGetTests), fork(onGetOneTest), fork(saveWordFlow), fork(getSavedWordsFlow)]);
}
