import * as types from "../../constant/auth";
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
  try {
    const { formData } = await register(dataObj);
    dispatch({ type: types.REGISTER_COMPANY, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const loginUser = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await login_user(dataObj);
    if(formData.role.name == 'COMPANY') {
      localStorage.setItem('company-token', JSON.stringify(formData.token));
    }
    dispatch({ type: types.LOGIN_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const resetPassword = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await reset_password(dataObj);
    dispatch({ type: types.RESET_PASSWORD, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const forgotPassword = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await forgot_password(dataObj);
    dispatch({ type: types.FORGOT_PASSWORD, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const successMessage = (success) => (dispatch) => {
  dispatch({ type: types.AUTHORIZE_SUCCESS, payload: success });
};

export const set_signup = (data) => (dispatch) => {
  dispatch({ type: types.SET_SIGNUPBTN, payload: data });
};
