import * as types from "../../constant/auth";
import {
  update_personal_details,
  update_company_details,
} from "../../api/updateProfile/updateProfile.api";


export const updateCompanyDetails = (token) => async (dispatch) => {
  try {
    await update_company_details(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const updatePersonalDetails = (token) => async (dispatch) => {
  try {
    await update_personal_details(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};