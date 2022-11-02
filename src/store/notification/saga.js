import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_NOTIFICATION } from "./actionTypes";

import { getNotificationError, getNotificationSuccess } from "./actions";

import { getNotificationService } from "../../services/notificationService";



function* getNotification() {
  try {
    const response = yield call(getNotificationService);
    console.log(response.data);
    yield put(getNotificationSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getNotificationError(error?.response?.data));
  }
}

export function* watchGetNotification() {
  yield takeEvery(GET_NOTIFICATION, getNotification);
}

function* NotificationSaga() {
  yield all([fork(watchGetNotification)]);
}

export default NotificationSaga;