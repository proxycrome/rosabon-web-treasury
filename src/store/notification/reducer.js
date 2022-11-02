import {
  GET_NOTIFICATION,
  GET_NOTIFICATION_ERROR,
  GET_NOTIFICATION_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  notifications: null,
  notificationError: null,
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION:
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

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default notification;
