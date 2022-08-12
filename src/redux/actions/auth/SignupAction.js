import * as types from "../../constant/auth";
import toast from "react-hot-toast";
import {
  register,
  login_user,
  reset_password,
  forgot_password,
} from "../../api/auth";

export const registerCompany = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await register(dataObj);
    dispatch({ type: types.REGISTER_COMPANY, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const registerUser = (dataObj) => async (dispatch) => {
  const { formData, message } = await register(dataObj);
  if (formData) {
    dispatch({ type: types.REGISTER_COMPANY, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const loginUser = (dataObj) => async (dispatch) => {
  const { formData, message } = await login_user(dataObj);
  if (formData) {
    if (formData.role.name === "COMPANY") {
      localStorage.setItem("company-token", JSON.stringify(formData.token));
    }
    if (formData.role.name === "INDIVIDUAL_USER") {
      localStorage.setItem("user-token", JSON.stringify(formData.token));
    }
    dispatch({ type: types.LOGIN_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
    toast.success("Login was successful");
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const resetPassword = (dataObj) => async (dispatch) => {
  const { formData, message } = await reset_password(dataObj);
  if (formData) {
    dispatch({ type: types.RESET_PASSWORD, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const forgotPassword = (dataObj) => async (dispatch) => {
  const { formData, message } = await forgot_password(dataObj);
  if (formData) {
    dispatch({ type: types.FORGOT_PASSWORD, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } else {
    dispatch({
      type: types.AUTHORIZE_FAIL,
      payload: message,
    });
    toast.error(message, {
      position: "top-right",
    });
  }
};

export const successMessage = (success) => (dispatch) => {
  dispatch({ type: types.AUTHORIZE_SUCCESS, payload: success });
};

export const set_signup = (data) => (dispatch) => {
  dispatch({ type: types.SET_SIGNUPBTN, payload: data });
};
