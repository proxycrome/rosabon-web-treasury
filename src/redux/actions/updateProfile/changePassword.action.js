import * as types from "../../constant/auth";
import {
  change_company_password,
  change_personal_password,
} from "../../api/updateProfile/changePassword.api";

export const changeCompanyPassword = (token) => async (dispatch) => {
  try {
    await change_company_password(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const changePersonalPassword = (token) => async (dispatch) => {
  try {
    await change_personal_password(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};