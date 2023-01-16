import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

// Login Redux States
import {
  FORGOT_PASSWORD,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_USER,
  REGISTER_USER,
  RESET_PASSWORD,
} from "./actionTypes";

import {
  forgotPasswordError,
  forgotPasswordSuccess,
  loginUserError,
  loginUserSuccess,
  logoutError,
  logoutSuccess,
  refreshUserSuccess,
  registerUserError,
  registerUserSuccess,
  resetPasswordError,
  resetPasswordSuccess,
} from "./actions";

import {
  forgotPasswordService,
  loginService,
  logoutService,
  registerService,
  resetPasswordService,
} from "../../services/authServices";
import { getAuthUsers, clearBvn, clearMessages } from "../actions";

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { formData, navigate, dispatch } }) {
  try {
    const response = yield call(loginService, formData);
    yield put(loginUserSuccess(response.data));
    if (response) {
      if (response?.data?.kyc === true) {
        if (
          response?.data?.creationSource === "BACKEND" &&
          !response?.data?.resetPassword
        ) {
          navigate("/change-password", {state: {isAssisted: true}});
          toast.success("Login was successful", { position: "top-right" });
          dispatch(getAuthUsers());
        } else {
          navigate("/");
          toast.success("Login was successful", { position: "top-right" });
          dispatch(getAuthUsers());
        }
      } else {
        navigate("/kyc");
        toast.success("Login was successful", { position: "top-right" });
        dispatch(getAuthUsers());
      }
    }
  } catch (error) {
    yield put(loginUserError("User not authorized or wrong details"));
    console.log(error);
    const message = error?.response
      ? error?.response?.data?.message
        ? error?.response?.data?.message
        : error?.response?.data?.response_message
        ? error?.response?.data?.response_message
        : "Invalid Credentials"
      : "Network Error";
    if (message) {
      toast.error(message, {
        position: "top-right",
      });
    }
  }
}

function* logoutUser({ payload: { navigate, dispatch } }) {
  try {
    const response = yield call(logoutService);
    yield put(logoutSuccess(response.data));
    if (response) {
      localStorage.clear();
      navigate("/login");
      toast.success(response.data.message, { position: "top-right" });
      dispatch(clearBvn());
      dispatch(clearMessages());
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(logoutError(error?.response?.data?.message));
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  }
}

function* registerUser({ payload: { formData, navigate } }) {
  try {
    const response = yield call(registerService, formData);
    yield put(registerUserSuccess(response));
    if (response) {
      navigate("/congrates", { state: "success_signup" });
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(registerUserError(error?.response?.data?.message));
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message, {
        position: "top-right",
      });
    }
  }
}

function* refreshUser() {
  try {
    const data = localStorage.getItem("token");
    if (data) {
      yield put(refreshUserSuccess(data));
    } else {
      yield put(logoutSuccess());
    }
  } catch (error) {
    console.log(error);
  }
}

function* resetPassword({ payload: { formData, navigate } }) {
  try {
    const response = yield call(resetPasswordService, formData);

    yield put(resetPasswordSuccess(response.data));
    if (response) {
      toast.success(response?.data?.message, {
        position: "top-right",
      });
      navigate("/login");
    }
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    yield put(resetPasswordError(error?.response?.data));
    toast.error(message, {
      position: "top-right",
    });
  }
}

function* forgotPassword({ payload: { email, navigate } }) {
  try {
    const trimEmail = email.trim();
    const response = yield call(forgotPasswordService, trimEmail);
    yield put(forgotPasswordSuccess(response.data));
    if (response) {
      toast.success(response.data.message);
      navigate("/congrates", { state: "forgotpassword" });
    }
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    toast.error(message, {
      position: "top-right",
    });
    yield put(forgotPasswordError(error?.response?.data));
  }
}

export function* watchUserLogin() {
  yield takeEvery(LOGIN_USER, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export function* watchRefreshUser() {
  yield takeEvery(REFRESH_USER, refreshUser);
}

export function* watchUserRegister() {
  yield takeEvery(REGISTER_USER, registerUser);
}

export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

function* AuthSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLogout),
    fork(watchUserRegister),
    fork(watchRefreshUser),
    fork(watchResetPassword),
    fork(watchForgotPassword),
  ]);
}

export default AuthSaga;
