import * as types from '../../constant/auth';
import toast from 'react-hot-toast';
import {
  change_company_password,
  change_personal_password,
} from '../../api/updateProfile/changePassword.api';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
} from '../../constant/updateProfileActionTypes';

export const changeCompanyPassword = (token) => async (dispatch) => {
  try {
    await change_company_password(token);
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const changePersonalPassword = (objData) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD });
  const { formData, errorObj } = await change_personal_password(objData);

  if (formData) {
    dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: formData });
    setTimeout(() => {
      toast.success(formData.message);
    }, 1000);
  }

  if (errorObj) {
    dispatch({ type: CHANGE_PASSWORD_ERROR, payload: errorObj });
    setTimeout(() => {
      toast.error(errorObj.message);
    }, 1000);
  }
};
