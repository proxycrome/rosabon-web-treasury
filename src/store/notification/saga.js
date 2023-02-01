import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_NOTIFICATION,
  READ_ALL_NOTIFICATIONS,
  READ_NOTIFICATION,
} from "./actionTypes";

import {
  getNotification,
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
import { toast } from "react-hot-toast";

function* getNotifications() {
  try {
    const response = yield call(getNotificationService);
    yield put(getNotificationSuccess(response.data));
  } catch (error) {
    yield put(getNotificationError(error?.response?.data));
  }
}

function* readNotification({ payload: { id } }) {
  try {
    const response = yield call(readNotificationService, id);
    yield put(readNotificationSuccess(response.data));
  } catch (error) {
    yield put(readNotificationError(error?.response?.data));
  }
}

function* readAllNotifications({payload: {setIsView, dispatch}}) {
  try {
    const response = yield call(readAllNotificationsService);
    yield put(readAllNotificationsSuccess(response.data));
    if (response){
      toast.success("All notifications have been marked as read", {position : "top-right"});
      dispatch(getNotification());
      setTimeout(() => {
        setIsView(true);
      }, 2000)  
    }
  } catch (error) {
    yield put(readAllNotificationsError(error?.response?.data));
  }
}

export function* watchGetNotification() {
  yield takeEvery(GET_NOTIFICATION, getNotifications);
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
