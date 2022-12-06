import {
  CLEAR_BVN,
  CLEAR_MESSAGES,
  GET_ALL_GENDER,
  GET_ALL_GENDER_ERROR,
  GET_ALL_GENDER_SUCCESS,
  GET_ALL_ID_TYPES,
  GET_ALL_ID_TYPES_ERROR,
  GET_ALL_ID_TYPES_SUCCESS,
  GET_ALL_SOURCES,
  GET_ALL_SOURCES_ERROR,
  GET_ALL_SOURCES_SUCCESS,
  GET_AUTH_USER,
  GET_AUTH_USERS,
  GET_AUTH_USERS_ERROR,
  GET_AUTH_USERS_SUCCESS,
  GET_AUTH_USER_ERROR,
  GET_AUTH_USER_SUCCESS,
  GET_BANKS,
  GET_BANKS_ERROR,
  GET_BANKS_SUCCESS,
  GET_BANK_DETAILS,
  GET_BANK_DETAILS_ERROR,
  GET_BANK_DETAILS_SUCCESS,
  GET_COMPANY_DOCS,
  GET_COMPANY_DOCS_ERROR,
  GET_COMPANY_DOCS_SUCCESS,
  GET_COUNTRY,
  GET_COUNTRY_ERROR,
  GET_COUNTRY_SUCCESS,
  GET_LGA,
  GET_LGA_ERROR,
  GET_LGA_SUCCESS,
  GET_STATE,
  GET_STATE_ERROR,
  GET_STATE_SUCCESS,
  GET_USER_DOCS,
  GET_USER_DOCS_ERROR,
  GET_USER_DOCS_SUCCESS,
  GET_WITHDRAW_REASON,
  GET_WITHDRAW_REASON_ERROR,
  GET_WITHDRAW_REASON_SUCCESS,
  SEND_COMPANY_OTP,
  SEND_COMPANY_OTP_ERROR,
  SEND_COMPANY_OTP_SUCCESS,
  SEND_OTP,
  SEND_OTP_ERROR,
  SEND_OTP_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_KYC,
  UPDATE_USER_KYC_ERROR,
  UPDATE_USER_KYC_SUCCESS,
  VALIDATE_OTP,
  VALIDATE_OTP_ERROR,
  VALIDATE_OTP_SUCCESS,
  VERIFY_BVN,
  VERIFY_BVN_ERROR,
  VERIFY_BVN_SUCCESS,
} from "./actionTypes";

export const getAuthUser = (email) => {
  return {
    type: GET_AUTH_USER,
    payload: { email },
  };
};

export const getAuthUserSuccess = (data) => {
  return {
    type: GET_AUTH_USER_SUCCESS,
    payload: data,
  };
};

export const getAuthUserError = (error) => {
  return {
    type: GET_AUTH_USER_ERROR,
    payload: error,
  };
};

export const getAuthUsers = () => {
  return {
    type: GET_AUTH_USERS,
  };
};

export const getAuthUsersSuccess = (data) => {
  return {
    type: GET_AUTH_USERS_SUCCESS,
    payload: data,
  };
};

export const getAuthUsersError = (error) => {
  return {
    type: GET_AUTH_USERS_ERROR,
    payload: error,
  };
};

export const updateUserKyc = (formData, pathCred, dispatch) => {
  return {
    type: UPDATE_USER_KYC,
    payload: { formData, pathCred, dispatch },
  };
};

export const updateUserKycSuccess = (data) => {
  return {
    type: UPDATE_USER_KYC_SUCCESS,
    payload: data,
  };
};

export const updateUserKycError = (error) => {
  return {
    type: UPDATE_USER_KYC_ERROR,
    payload: error,
  };
};

export const verifyBvn = (formData, id, setComplete) => {
  return {
    type: VERIFY_BVN,
    payload: { formData, id, setComplete },
  };
};

export const verifyBvnSuccess = (data) => {
  return {
    type: VERIFY_BVN_SUCCESS,
    payload: data,
  };
};

export const verifyBvnError = (error, id) => {
  return {
    type: VERIFY_BVN_ERROR,
    payload: error,
    id,
  };
};

export const getCountries = () => {
  return {
    type: GET_COUNTRY,
  };
};

export const getCountriesSuccess = (data) => {
  return {
    type: GET_COUNTRY_SUCCESS,
    payload: data,
  };
};

export const getCountriesError = (error) => {
  return {
    type: GET_COUNTRY_ERROR,
    payload: error,
  };
};

export const getStates = (countryId) => {
  return {
    type: GET_STATE,
    payload: { countryId },
  };
};

export const getStatesSuccess = (data) => {
  return {
    type: GET_STATE_SUCCESS,
    payload: data,
  };
};

export const getStatesError = (error) => {
  return {
    type: GET_STATE_ERROR,
    payload: error,
  };
};

export const getLgas = (stateId) => {
  return {
    type: GET_LGA,
    payload: { stateId },
  };
};

export const getLgasSuccess = (data) => {
  return {
    type: GET_LGA_SUCCESS,
    payload: data,
  };
};

export const getLgasError = (error) => {
  return {
    type: GET_LGA_ERROR,
    payload: error,
  };
};

export const sendOtp = () => {
  return {
    type: SEND_OTP,
  };
};

export const sendOtpSuccess = (data) => {
  return {
    type: SEND_OTP_SUCCESS,
    payload: data,
  };
};

export const sendOtpError = (error) => {
  return {
    type: SEND_OTP_ERROR,
    payload: error,
  };
};

export const validateOtp = (otp) => {
  return {
    type: VALIDATE_OTP,
    payload: { otp },
  };
};

export const validateOtpSuccess = (data) => {
  return {
    type: VALIDATE_OTP_SUCCESS,
    payload: data,
  };
};

export const validateOtpError = (error) => {
  return {
    type: VALIDATE_OTP_ERROR,
    payload: error,
  };
};

export const sendCompanyOtp = () => {
  return {
    type: SEND_COMPANY_OTP,
  };
};

export const sendCompanyOtpSuccess = (data) => {
  return {
    type: SEND_COMPANY_OTP_SUCCESS,
    payload: data,
  };
};

export const sendCompanyOtpError = (error) => {
  return {
    type: SEND_COMPANY_OTP_ERROR,
    payload: error,
  };
};

export const getBanks = () => {
  return {
    type: GET_BANKS,
  };
};

export const getBanksSuccess = (data) => {
  return {
    type: GET_BANKS_SUCCESS,
    payload: data,
  };
};

export const getBanksError = (error) => {
  return {
    type: GET_BANKS_ERROR,
    payload: error,
  };
};

export const getCompanyDocs = () => {
  return {
    type: GET_COMPANY_DOCS,
  };
};

export const getCompanyDocsSuccess = (data) => {
  console.log(data);
  return {
    type: GET_COMPANY_DOCS_SUCCESS,
    payload: data,
  };
};

export const getCompanyDocsError = (error) => {
  return {
    type: GET_COMPANY_DOCS_ERROR,
    payload: error,
  };
};

export const getBankDetails = () => {
  return {
    type: GET_BANK_DETAILS,
  };
};

export const getBankDetailsSuccess = (data) => {
  return {
    type: GET_BANK_DETAILS_SUCCESS,
    payload: data,
  };
};

export const getBankDetailsError = (error) => {
  return {
    type: GET_BANK_DETAILS_ERROR,
    payload: error,
  };
};

export const getWithdrawReason = () => {
  return {
    type: GET_WITHDRAW_REASON,
  };
};

export const getWithdrawReasonSuccess = (data) => {
  return {
    type: GET_WITHDRAW_REASON_SUCCESS,
    payload: data,
  };
};

export const getWithdrawReasonError = (error) => {
  return {
    type: GET_WITHDRAW_REASON_ERROR,
    payload: error,
  };
};

export const getUserDocs = () => {
  return {
    type: GET_USER_DOCS,
  };
};

export const getUserDocsSuccess = (data) => {
  return {
    type: GET_USER_DOCS_SUCCESS,
    payload: data,
  };
};

export const getUserDocsError = (error) => {
  return {
    type: GET_USER_DOCS_ERROR,
    payload: error,
  };
};

export const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};

export const getAllGender = () => {
  return {
    type: GET_ALL_GENDER,
  };
};

export const getAllGenderSuccess = (data) => {
  return {
    type: GET_ALL_GENDER_SUCCESS,
    payload: data,
  };
};

export const getAllGenderError = (error) => {
  return {
    type: GET_ALL_GENDER_ERROR,
    payload: error,
  };
};

export const getAllSources = () => {
  return {
    type: GET_ALL_SOURCES,
  };
};

export const getAllSourcesSuccess = (data) => {
  return {
    type: GET_ALL_SOURCES_SUCCESS,
    payload: data,
  };
};

export const getAllSourcesError = (error) => {
  return {
    type: GET_ALL_SOURCES_ERROR,
    payload: error,
  };
};

export const getAllIdTypes = () => {
  return {
    type: GET_ALL_ID_TYPES,
  };
};

export const getAllIdTypesSuccess = (data) => {
  return {
    type: GET_ALL_ID_TYPES_SUCCESS,
    payload: data,
  };
};

export const getAllIdTypesError = (error) => {
  return {
    type: GET_ALL_ID_TYPES_ERROR,
    payload: error,
  };
};
 
export const clearBvn = () => {
  return {
    type: CLEAR_BVN,
  };
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES,
  }
}