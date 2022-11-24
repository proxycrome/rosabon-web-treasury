import {
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
} from "./actionTypes";

export const registerUser = (formData, navigate) => {
  return {
    type: REGISTER_USER,
    payload: { formData, navigate },
  };
};

export const registerUserSuccess = (data) => {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserError = (error) => {
  return {
    type: REGISTER_USER_ERROR,
    payload: error,
  };
};

export const loginUser = (formData, navigate) => {
  return {
    type: LOGIN_USER,
    payload: { formData, navigate },
  };
};

export const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const loginUserError = (error) => {
  return {
    type: LOGIN_USER_ERROR,
    payload: error,
  };
};

export const logout = (navigate) => {
  return {
    type: LOGOUT_USER,
    payload: { navigate },
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    // payload: data,
  };
};

export const logoutError = (error) => {
  return {
    type: LOGOUT_USER_ERROR,
    payload: error,
  };
};

export const refreshUser = () => {
  return {
    type: REFRESH_USER,
  };
};

export const resetPassword = (formData, navigate) => {
  return {
    type: RESET_PASSWORD,
    payload: { formData, navigate },
  };
};

export const resetPasswordSuccess = (data) => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const resetPasswordError = (error) => {
  return {
    type: RESET_PASSWORD_ERROR,
    payload: error,
  };
};

export const forgotPassword = (email, navigate) => {
  return {
    type: FORGOT_PASSWORD,
    payload: { email, navigate },
  };
};

export const forgotPasswordSuccess = (data) => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const forgotPasswordError = (error) => {
  return {
    type: FORGOT_PASSWORD_ERROR,
    payload: error,
  };
};
