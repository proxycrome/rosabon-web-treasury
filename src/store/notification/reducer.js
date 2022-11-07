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

const initialState = {
  loading: false,
  notifications: null,
  notificationError: null,
  readNotification: null,
  readNotificationError: null,
  readAllNotifications: null,
  readAllNotificationsError: null,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
    case READ_NOTIFICATION:
    case READ_ALL_NOTIFICATIONS:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_NOTIFICATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        notifications: action.payload,
        notificationError: null,
      };
      break;

    case GET_NOTIFICATION_ERROR:
      state = {
        ...state,
        loading: false,
        notifications: null,
        notificationError: action.payload,
      };
      break;

    case READ_NOTIFICATION_SUCCESS:
      state = {
        ...state,
        loading: false,
        readNotification: action.payload,
        readNotificationError: null,
      };
      break;

    case READ_NOTIFICATION_ERROR:
      state = {
        ...state,
        loading: false,
        readNotification: null,
        readNotificationError: action.payload,
      };
      break;

    case READ_ALL_NOTIFICATIONS_SUCCESS:
      state = {
        ...state,
        loading: false,
        readAllNotifications: action.payload,
        readAllNotificationsError: null,
      };
      break;

    case READ_ALL_NOTIFICATIONS_ERROR:
      state = {
        ...state,
        loading: false,
        readAllNotifications: null,
        readAllNotificationsError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default notification;
