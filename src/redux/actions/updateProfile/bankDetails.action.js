import * as types from "../../constant/auth";
import {
  company_bank_details,
  personal_bank_details,
} from "../../api/updateProfile/bankDetail.api";

export const companyBankDetails = (token) => async (dispatch) => {
  try {
    await company_bank_details(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const personalBankDetails = (token) => async (dispatch) => {
  try {
    await personal_bank_details(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};