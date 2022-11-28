import {
  CLEAR_USERS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_ERROR,
  LOGOUT_USER_SUCCESS,
  REFRESH_USER,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
  SET_SIGNUPBTN,
} from "./actionTypes";

const initialState = {
  login: null,
  isAuth: null,
  isLoggedIn: false,
  isSignedUp: false,
  isLoading: false,
  isSuccess: false,
  logoutMsg: null,
  logoutError: null,
  register: null,
  email: null,
  success: false,
  registrationError: null,
  resetpassword: null,
  resetpasswordError: null,
  forgotPassword: null,
  forgotPasswordError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      state = {
        ...state,
        isLoading: true,
        register: null,
        isSignedup: false,
      };
      break;

    case REGISTER_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        register: action.payload,
        isSignedup: true,
        email: action.payload?.data?.email,
      };
      break;

    case REGISTER_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        register: null,
        isSignedup: false,
        registrationError: action.payload,
      };
      break;

    case SET_SIGNUPBTN:
      state = {
        ...state,
        signup_btn: action.payload,
      };
      break;

    case LOGIN_USER:
      state = {
        ...state,
        isLoading: true,
        isAuth: false,
        login: null,
        isLoggedIn: false,
      };
      break;

    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.payload));
      state = {
        ...state,
        isLoading: false,
        isAuth: true,
        login: action.payload,
        isLoggedIn: true,
      };
      break;

    case LOGIN_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        isAuth: false,
        login: null,
        isLoggedIn: null,
      };
      break;

    case LOGOUT_USER:
      state = {
        ...state,
        isLoading: true,
        logoutMsg: null,
        logoutError: null,
      };
      break;

    case LOGOUT_USER_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        isAuth: false,
        login: null,
        isLoggedIn: null,
        isSignedUp: null,
        register: null,
        logoutMsg: action.payload,
        logoutError: null,
      };
      break;

    case LOGOUT_USER_ERROR:
      state = {
        ...state,
        isLoading: false,
        logoutMsg: null,
        logoutError: action.payload,
      };
      break;

    case REFRESH_USER:
      state = {
        ...state,
        isLoading: true,
      };
      break;

    case RESET_PASSWORD:
      state = {
        ...state,
        isLoading: true,
        resetpassword: null,
        isSuccess: false,
      };
      break;

    case RESET_PASSWORD_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        resetpassword: action.payload,
        isSuccess: true,
        resetpasswordError: null,
      };
      break;

    case RESET_PASSWORD_ERROR:
      state = {
        ...state,
        isLoading: false,
        resetpassword: null,
        isSuccess: false,
        resetpasswordError: action.payload,
      };
      break;

    case FORGOT_PASSWORD:
      state = {
        ...state,
        isLoading: true,
        email: action.payload.email,
      };
      break;

    case FORGOT_PASSWORD_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        forgotPassword: action.payload,
        forgotPasswordError: null,
      };
      break;

    case FORGOT_PASSWORD_ERROR:
      state = {
        ...state,
        isloading: false,
        forgotPassword: null,
        forgotPasswordError: action.payload,
      };
      break;

    case CLEAR_USERS:
      return {
        ...state,
        login: null,
        isLoggedIn: false,
      };

    default:
      state = {
        ...state,
      };
      break;
  }

  return state;
};

export default authReducer;
