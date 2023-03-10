import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_FAQ } from "./actionTypes";

import { getFaqSuccess, getFaqError } from "./actions";

import { getFaqService } from "../../services/helpService";

function* getFaq() {
  try {
    const response = yield call(getFaqService);
    yield put(getFaqSuccess(response.data));
  } catch (error) {
    yield put(getFaqError(error?.response?.data));
  }
}

export function* watchGetFaq() {
  yield takeEvery(GET_FAQ, getFaq);
}

function* HelpSaga() {
  yield all([fork(watchGetFaq)]);
}

export default HelpSaga;
