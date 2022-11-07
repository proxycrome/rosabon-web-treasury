import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_NOTIFICATION,
  READ_ALL_NOTIFICATIONS,
  READ_NOTIFICATION,
} from "./actionTypes";

import {
  getNotificationError,
  getNotificationSuccess,
  readAllNotificationsError,
  readAllNotificationsSuccess,
  readNotificationError,
  readNotificationSuccess,
} from "./actions";

import {
  getNotificationService,
  readAllNotificationsService,
  readNotificationService,
} from "../../services/notificationService";

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

function* readNotification({ payload: { id } }) {
  try {
    const response = yield call(readNotificationService, id);
    console.log(response.data);
    yield put(readNotificationSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(readNotificationError(error?.response?.data));
  }
}

function* readAllNotifications() {
  try {
    const response = yield call(readAllNotificationsService);
    console.log(response.data);
    yield put(readAllNotificationsSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(readAllNotificationsError(error?.response?.data));
  }
}

export function* watchGetNotification() {
  yield takeEvery(GET_NOTIFICATION, getNotification);
}

export function* watchReadNotification() {
  yield takeEvery(READ_NOTIFICATION, readNotification);
}

export function* watchReadAllNotifications() {
  yield takeEvery(READ_ALL_NOTIFICATIONS, readAllNotifications);
}

function* NotificationSaga() {
  yield all([
    fork(watchGetNotification),
    fork(watchReadNotification),
    fork(watchReadAllNotifications),
  ]);
}

export default NotificationSaga;