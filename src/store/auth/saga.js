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
	logoutSuccess,
	registerUserError,
	registerUserSuccess,
	resetPasswordError,
	resetPasswordSuccess,
} from "./actions";

import {
	forgotPasswordService,
	loginService,
	registerService,
	resetPasswordService,
} from "../../services/authServices";


//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { formData, navigate } }) {
	try {
		const response = yield call(loginService, formData);

		yield put(loginUserSuccess(response.data));
		if (response.data) {
			toast.success("Login was successful");
			if (response.data.kyc) {
				navigate("/");
			} else {
				navigate("/kyc");
			}
		}
	} catch (error) {
		yield put(loginUserError("User not authorized or wrong details"));
		console.log(error?.response?.data?.message);
		const message = error.response
			? error.response.data.message
				? error.response.data.message
				: error.response.data.response_message
				? error.response.data.response_message
				: "Invalid Credentials"
			: "Network Error";
		if (message) {
			toast.error(message, {
				position: "top-right",
			});
		}
	}
}

function* logoutUser({ payload: { navigate } }) {
	try {
		localStorage.removeItem("token");
		yield put(logoutSuccess());
		navigate("/login");
	} catch (error) {
		console.log(error);
	}
}

function* registerUser({ payload: { formData, navigate } }) {
	try {
		const response = yield call(registerService, formData);
		console.log(response);
		yield put(registerUserSuccess(response));
		if (response) {
			navigate("/congrates", { state: "success_signup" });
		}
	} catch (error) {
		console.log(error);
		console.log(error?.response);
		yield put(registerUserError(error?.response?.data?.message));
		if (error?.response) {
			toast.error(error?.response?.data?.message, {
				position: "top-right",
			});
		}
	}
}

function* refreshUser() {
	try {
		const data = JSON.parse(localStorage.getItem("token"));
		if (data) {
			yield put(loginUserSuccess(data));
		} else {
			yield put(logoutSuccess());
		}
	} catch (error) {
		console.log(error);
	}
}

function* resetPassword({ payload }) {
	try {
		const response = yield call(resetPasswordService, payload);

		yield put(resetPasswordSuccess(response.data));
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
	const trimEmail = email.trim()
    const response = yield call(forgotPasswordService, trimEmail);
    yield put(forgotPasswordSuccess(response.data));
	if(response){
		toast.success(response.data.message);
		navigate('/congrates', { state: 'forgotpassword' })
	}
  } catch (error) {
    const message = error.response
        ? error.response.data.message
          ? error.response.data.message
          : error.response.data.response_message
          ? error.response.data.response_message
          : 'Invalid Credentials'
        : 'Network Error'
      toast.error(message, {
        position: 'top-right',
      })
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
