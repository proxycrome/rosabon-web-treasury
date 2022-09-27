import toast from 'react-hot-toast';

import {
  update_company_details,
  verify_phone,
  update_contact_details,
  validate_phone_otp,
  update_personal_info,
} from '../../api/updateProfile/updateProfile.api';

import {
  PUT_CONTACT_DETAILS,
  PUT_CONTACT_DETAILS_ERROR,
  PUT_CONTACT_DETAILS_SUCCESS,
  PUT_PERSONAL_INFO,
  PUT_PERSONAL_INFO_ERROR,
  PUT_PERSONAL_INFO_SUCCESS,
  UPDATE_COMPANY_INFO,
  UPDATE_COMPANY_INFO_ERROR,
  UPDATE_COMPANY_INFO_SUCCESS,
  VALIDATE_PHONE_OTP,
  VALIDATE_PHONE_OTP_ERROR,
  VALIDATE_PHONE_OTP_SUCCESS,
  VERIFY_PHONE,
  VERIFY_PHONE_ERROR,
  VERIFY_PHONE_SUCCESS,
} from '../../constant/updateProfileActionTypes';

export const updateCompanyDetails = (objData) => async (dispatch) => {
  dispatch({ type: UPDATE_COMPANY_INFO });
  const { formData, errorObj } = await update_company_details(objData);
  if (formData) {
    dispatch({ type: UPDATE_COMPANY_INFO_SUCCESS, payload: formData });
    toast.success("Company Details Updated Successfully");
  }

  if (errorObj) {
    dispatch({ type: UPDATE_COMPANY_INFO_ERROR, payload: errorObj });
    toast.error(errorObj.message);
  }
};

export const updateContactDetails = (dataObj) => async (dispatch) => {
  dispatch({ type: PUT_CONTACT_DETAILS });
  const { formData, errorObj } = await update_contact_details(dataObj);

  if (formData) {
    dispatch({ type: PUT_CONTACT_DETAILS_SUCCESS, payload: true });
    
  }

  if (errorObj) {
    dispatch({ type: PUT_CONTACT_DETAILS_ERROR, payload: errorObj });
  }
};

export const verifyPhone = (recipient) => async (dispatch) => {
  dispatch({ type: VERIFY_PHONE });
  const { formData, errorObj } = await verify_phone(recipient);

  if (formData) {
    dispatch({ type: VERIFY_PHONE_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: VERIFY_PHONE_ERROR, payload: errorObj });
  }
};

export const updatePersonalInfo = (dataObj) => async (dispatch) => {
  dispatch({ type: PUT_PERSONAL_INFO });
  const { formData, errorObj } = await update_personal_info(dataObj);

  if (formData) {
    dispatch({ type: PUT_PERSONAL_INFO_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: PUT_PERSONAL_INFO_ERROR, payload: errorObj });
  }
};

export const validatePhoneOtp = (otp) => async (dispatch) => {
  dispatch({ type: VALIDATE_PHONE_OTP });
  const { formData, errorObj } = await validate_phone_otp(otp);

  if (formData) {
    dispatch({ type: VALIDATE_PHONE_OTP_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: VALIDATE_PHONE_OTP_ERROR, payload: errorObj });
  }
};
