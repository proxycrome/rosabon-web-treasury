import * as types from "../../constant/auth";
import {
  get_users,
  get_user,
  update_user_company_kyc,
} from "../../api/userProfile.api";

export const getAuthUsers = (token) => async (dispatch) => {
  try {
    const { formData } = await get_users(token);
    console.log(formData)
    dispatch({ type: types.GET_AUTH_USERS, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const getAuthUser = (token, email) => async (dispatch) => {
  try {
    const { formData } = await get_user(token, email);
    dispatch({ type: types.GET_AUTH_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const updateUserCompanyKYC = (token, objData) => async (dispatch) => {
  try {
    const { formData } = await update_user_company_kyc(token, objData);
    dispatch({ type: types.GET_AUTH_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};
