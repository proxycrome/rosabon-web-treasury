import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  DELETE_DIRECTOR,
  DELETE_DIRECTOR_ERROR,
  DELETE_DIRECTOR_SUCCESS,
  GET_DIRECTOR_DETAILS,
  GET_DIRECTOR_DETAILS_ERROR,
  GET_DIRECTOR_DETAILS_SUCCESS,
  PUT_CONTACT_DETAILS,
  PUT_CONTACT_DETAILS_ERROR,
  PUT_CONTACT_DETAILS_SUCCESS,
  PUT_PERSONAL_DOCUMENTS,
  PUT_PERSONAL_DOCUMENTS_ERROR,
  PUT_PERSONAL_DOCUMENTS_SUCCESS,
  PUT_PERSONAL_INFO,
  PUT_PERSONAL_INFO_ERROR,
  PUT_PERSONAL_INFO_SUCCESS,
  UPDATE_BANK_DETAILS,
  UPDATE_BANK_DETAILS_ERROR,
  UPDATE_BANK_DETAILS_SUCCESS,
  UPDATE_COMPANY_DOCS,
  UPDATE_COMPANY_DOCS_ERROR,
  UPDATE_COMPANY_DOCS_SUCCESS,
  UPDATE_COMPANY_INFO,
  UPDATE_COMPANY_INFO_ERROR,
  UPDATE_COMPANY_INFO_SUCCESS,
  UPDATE_DIRECTOR_DETAILS,
  UPDATE_DIRECTOR_DETAILS_ERROR,
  UPDATE_DIRECTOR_DETAILS_SUCCESS,
  VALIDATE_PHONE_OTP,
  VALIDATE_PHONE_OTP_ERROR,
  VALIDATE_PHONE_OTP_SUCCESS,
  VERIFY_ACCOUNT_NO,
  VERIFY_ACCOUNT_NO_ERROR,
  VERIFY_ACCOUNT_NO_SUCCESS,
  VERIFY_PHONE,
  VERIFY_PHONE_ERROR,
  VERIFY_PHONE_SUCCESS,
} from "./actionTypes";

export const verifyAccountNo = (formData) => {
  return {
    type: VERIFY_ACCOUNT_NO,
    payload: {formData},
  };
};

export const verifyAccountNoSuccess = (data) => {
  return {
    type: VERIFY_ACCOUNT_NO_SUCCESS,
    payload: data,
  };
};

export const verifyAccountNoError = (error) => {
  return {
    type: VERIFY_ACCOUNT_NO_ERROR,
    payload: error,
  };
};

export const changeUserPassword = (formData) => {
  return {
    type: CHANGE_PASSWORD,
    payload: { formData },
  };
};

export const changeUserPasswordSuccess = (data) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const changeUserPasswordError = (error) => {
  return {
    type: CHANGE_PASSWORD_ERROR,
    payload: error,
  };
};

export const updateCompanyDetails = (formData) => {
  return {
    type: UPDATE_COMPANY_INFO,
    payload: { formData },
  };
};

export const updateCompanyDetailsSuccess = (data) => {
  return {
    type: UPDATE_COMPANY_INFO_SUCCESS,
    payload: data,
  };
};

export const updateCompanyDetailsError = (error) => {
  return {
    type: UPDATE_COMPANY_INFO_ERROR,
    payload: error,
  };
};

export const updateContactDetails = (formData) => {
  return {
    type: PUT_CONTACT_DETAILS,
    payload: { formData },
  };
};

export const updateContactDetailsSuccess = (data) => {
  return {
    type: PUT_CONTACT_DETAILS_SUCCESS,
    payload: true,
  };
};

export const updateContactDetailsError = (error) => {
  return {
    type: PUT_CONTACT_DETAILS_ERROR,
    payload: error,
  };
};

export const updateDirectorDetails = (formData) => {
  return {
    type: UPDATE_DIRECTOR_DETAILS,
    payload: { formData },
  };
};

export const updateDirectorDetailsSuccess = (data) => {
  return {
    type: UPDATE_DIRECTOR_DETAILS_SUCCESS,
    payload: data,
  };
};

export const updateDirectorDetailsError = (error) => {
  return {
    type: UPDATE_DIRECTOR_DETAILS_ERROR,
    payload: error,
  };
};

export const verifyPhone = (recipient) => {
  return {
    type: VERIFY_PHONE,
    payload: { recipient },
  };
};

export const verifyPhoneSuccess = (data) => {
  return {
    type: VERIFY_PHONE_SUCCESS,
    payload: data,
  };
};

export const verifyPhoneError = (error) => {
  return {
    type: VERIFY_PHONE_ERROR,
    payload: error,
  };
};

export const validatePhoneOtp = (otp) => {
  return {
    type: VALIDATE_PHONE_OTP,
    payload: { otp },
  };
};

export const validatePhoneOtpSuccess = (data) => {
  return {
    type: VALIDATE_PHONE_OTP_SUCCESS,
    payload: data,
  };
};

export const validatePhoneOtpError = (error) => {
  return {
    type: VALIDATE_PHONE_OTP_ERROR,
    payload: error,
  };
};

export const updatePersonalInfo = (formData) => {
  return {
    type: PUT_PERSONAL_INFO,
    payload: { formData },
  };
};

export const updatePersonalInfoSuccess = (data) => {
  return {
    type: PUT_PERSONAL_INFO_SUCCESS,
    payload: data,
  };
};

export const updatePersonalInfoError = (error) => {
  return {
    type: PUT_PERSONAL_INFO_ERROR,
    payload: error,
  };
};

export const uploadCompanyDocument = (formData, reset) => {
  return {
    type: UPDATE_COMPANY_DOCS,
    payload: { formData, reset },
  };
};

export const uploadCompanyDocumentSuccess = (data) => {
  return {
    type: UPDATE_COMPANY_DOCS_SUCCESS,
    payload: data,
  };
};

export const uploadCompanyDocumentError = (error) => {
  return {
    type: UPDATE_COMPANY_DOCS_ERROR,
    payload: error,
  };
};

export const uploadPersonalDocument = (formData, reset) => {
  return {
    type: PUT_PERSONAL_DOCUMENTS,
    payload: { formData, reset },
  };
};

export const uploadPersonalDocumentSuccess = (data) => {
  return {
    type: PUT_PERSONAL_DOCUMENTS_SUCCESS,
    payload: data,
  };
};

export const uploadPersonalDocumentError = (error) => {
  return {
    type: PUT_PERSONAL_DOCUMENTS_ERROR,
    payload: error,
  };
};

export const getDirectorDetails = () => {
  return {
    type: GET_DIRECTOR_DETAILS,
  };
};

export const getDirectorDetailsSuccess = (data) => {
  return {
    type: GET_DIRECTOR_DETAILS_SUCCESS,
    payload: data,
  };
};

export const getDirectorDetailsError = (error) => {
  return {
    type: GET_DIRECTOR_DETAILS_ERROR,
    payload: error,
  };
};

export const deleteDirector = (id, setShowModal) => {
  return {
    type: DELETE_DIRECTOR,
    payload: { id, setShowModal },
  };
};

export const deleteDirectorSuccess = (data) => {
  return {
    type: DELETE_DIRECTOR_SUCCESS,
    payload: data,
  };
};

export const deleteDirectorError = (error) => {
  return {
    type: DELETE_DIRECTOR_ERROR,
    payload: error,
  };
};

export const updateBankDetails = (formData, reset) => {
    return {
        type: UPDATE_BANK_DETAILS,
        payload: {formData, reset},
    }
}

export const updateBankDetailsSuccess = (data) => {
    return {
        type: UPDATE_BANK_DETAILS_SUCCESS,
        payload: data,
    }
}

export const updateBankDetailsError = (error) => {
    return {
        type: UPDATE_BANK_DETAILS_ERROR,
        payload: error,
    }
}