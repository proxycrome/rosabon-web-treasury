import * as types from '../../constant/auth';
import {
  company_bank_details,
  personal_bank_details,
  verify_account_no,
} from '../../api/updateProfile/bankDetail.api';
import {
  VERIFY_ACCOUNT_NO,
  VERIFY_ACCOUNT_NO_ERROR,
  VERIFY_ACCOUNT_NO_SUCCESS,
} from '../../constant/updateProfileActionTypes';

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

export const verifyAccountNo = (dataObj) => async (dispatch) => {
  dispatch({ type: VERIFY_ACCOUNT_NO });
  const { formData, errorObj } = await verify_account_no(dataObj);

  if (formData) {
    dispatch({ type: VERIFY_ACCOUNT_NO_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: VERIFY_ACCOUNT_NO_ERROR, payload: errorObj });
  }
};
