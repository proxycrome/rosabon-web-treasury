import * as types from '../../constant/auth';
import toast from 'react-hot-toast';
import {
  get_users,
  get_user,
  update_user_company_kyc,
  verify_bvn,
  get_countries,
  get_states,
  get_lgas,
  send_otp,
  get_banks,
  validate_otp,
} from '../../api/userProfile.api';
import {
  GET_BANKS,
  GET_BANKS_ERROR,
  GET_BANKS_SUCCESS,
  GET_COUNTRY,
  GET_COUNTRY_ERROR,
  GET_COUNTRY_SUCCESS,
  GET_LGA,
  GET_LGA_ERROR,
  GET_LGA_SUCCESS,
  GET_STATE,
  GET_STATE_ERROR,
  GET_STATE_SUCCESS,
  SEND_OTP,
  SEND_OTP_ERROR,
  SEND_OTP_SUCCESS,
  VALIDATE_OTP,
  VALIDATE_OTP_ERROR,
  VALIDATE_OTP_SUCCESS,
} from '../../constant/userActionTypes';

export const getAuthUsers = (token) => async (dispatch) => {
  try {
    const { formData } = await get_users(token);
    console.log(formData);
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

export const updateUserCompanyKYC =
  (token, objData, pathCred) => async (dispatch) => {
    try {
      const { formData } = await update_user_company_kyc(token, objData);

      if (formData) {
        dispatch({ type: types.GET_AUTH_USER, payload: formData });
        dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
      }

      if (formData && pathCred.route === '/plan-product') {
        setTimeout(() => {
          toast.success('KYC Updated Successfully');
        }, 5000);
        pathCred.navigate(pathCred.route);
      }

      if (formData && pathCred.route === '/profile') {
        setTimeout(() => {
          toast.success('KYC Updated Successfully');
        }, 5000);
        pathCred.navigate(pathCred.route);
      }
    } catch (error) {}
  };

export const verifyBvn = (objData) => async (dispatch) => {
  dispatch({ type: types.VERIFY_BVN });
  const { formData, errorObj } = await verify_bvn(objData);

  if (formData) {
    dispatch({ type: types.VERIFY_BVN_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: types.VERIFY_BVN_ERROR, payload: errorObj });
  }
};

export const getCountries = () => async (dispatch) => {
  dispatch({ type: GET_COUNTRY });
  const { formData, errorObj } = await get_countries();

  if (formData) {
    dispatch({ type: GET_COUNTRY_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_COUNTRY_ERROR, payload: errorObj });
  }
};

export const getStates = (countryId) => async (dispatch) => {
  dispatch({ type: GET_STATE });
  const { formData, errorObj } = await get_states(countryId);

  if (formData) {
    dispatch({ type: GET_STATE_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_STATE_ERROR, payload: errorObj });
  }
};

export const getlgas = (stateId) => async (dispatch) => {
  dispatch({ type: GET_LGA });
  const { formData, errorObj } = await get_lgas(stateId);

  if (formData) {
    dispatch({ type: GET_LGA_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_LGA_ERROR, payload: errorObj });
  }
};

export const sendOtp = () => async (dispatch) => {
  dispatch({ type: SEND_OTP });
  const { formData, errorObj } = await send_otp();

  if (formData) {
    dispatch({ type: SEND_OTP_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: SEND_OTP_ERROR, payload: errorObj });
  }
};

export const getBanks = () => async (dispatch) => {
  dispatch({ type: GET_BANKS });
  const { formData, errorObj } = await get_banks();

  if (formData) {
    dispatch({ type: GET_BANKS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_BANKS_ERROR, payload: errorObj });
  }
};

export const validateOtp = (otp) => async (dispatch) => {
  dispatch({ type: VALIDATE_OTP });
  const { formData, errorObj } = await validate_otp(otp);

  if (formData) {
    dispatch({ type: VALIDATE_OTP_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: VALIDATE_OTP_ERROR, payload: errorObj });
  }
};