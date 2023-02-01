import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_ERROR,
  GET_NOTIFICATION_SUCCESS,
  READ_ALL_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS_ERROR,
  READ_ALL_NOTIFICATIONS_SUCCESS,
  READ_NOTIFICATION,
  READ_NOTIFICATION_ERROR,
  READ_NOTIFICATION_SUCCESS,
} from "./actionTypes";

export const getNotification = () => {
  return {
    type: GET_NOTIFICATION,
  };
};

export const getNotificationSuccess = (data) => {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    payload: data,
  };
};

export const getNotificationError = (error) => {
  return {
    type: GET_NOTIFICATION_ERROR,
    payload: error,
  };
};

export const readNotification = (id) => {
  return {
    type: READ_NOTIFICATION,
    payload: { id },
  };
};

export const readNotificationSuccess = (data) => {
  return {
    type: READ_NOTIFICATION_SUCCESS,
    payload: data,
  };
};

export const readNotificationError = (error) => {
  return {
    type: READ_NOTIFICATION_ERROR,
    payload: error,
  };
};

export const readAllNotifications = (setIsView, dispatch) => {
    return {
        type: READ_ALL_NOTIFICATIONS,
        payload: {setIsView, dispatch},
    }
}

export const readAllNotificationsSuccess = (data) => {
    return {
        type: READ_ALL_NOTIFICATIONS_SUCCESS,
        payload: data,
    }
}

export const readAllNotificationsError = (error) => {
    return {
        type: READ_ALL_NOTIFICATIONS_ERROR,
        payload: error,
    }
}