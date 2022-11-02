import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_ERROR,
  GET_NOTIFICATION_SUCCESS,
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
