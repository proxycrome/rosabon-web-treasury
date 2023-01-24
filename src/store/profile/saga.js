import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  GET_ALL_GENDER,
  GET_ALL_ID_TYPES,
  GET_ALL_SOURCES,
  GET_AUTH_USER,
  GET_AUTH_USERS,
  GET_BANKS,
  GET_BANK_DETAILS,
  GET_COMPANY_DOCS,
  GET_COUNTRY,
  GET_LGA,
  GET_STATE,
  GET_USER_DOCS,
  GET_WITHDRAW_REASON,
  SEND_COMPANY_OTP,
  SEND_OTP,
  UPDATE_USER_KYC,
  UPDATE_USER_NAME,
  VALIDATE_OTP,
  VERIFY_BVN,
} from "./actionTypes";

import {
  getAllGenderError,
  getAllGenderSuccess,
  getAuthUserError,
  getAuthUsers,
  getAuthUsersError,
  getAuthUsersSuccess,
  getAuthUserSuccess,
  getBankDetailsError,
  getBankDetailsSuccess,
  getBanksError,
  getBanksSuccess,
  getCompanyDocsError,
  getCountriesError,
  getCountriesSuccess,
  getLgasError,
  getLgasSuccess,
  getStatesError,
  getStatesSuccess,
  getUserDocsError,
  getUserDocsSuccess,
  getAllSourcesSuccess,
  getAllSourcesError,
  getWithdrawReasonError,
  getWithdrawReasonSuccess,
  sendCompanyOtpError,
  sendCompanyOtpSuccess,
  sendOtpError,
  sendOtpSuccess,
  updateUserKycError,
  updateUserKycSuccess,
  validateOtpError,
  validateOtpSuccess,
  verifyBvnError,
  verifyBvnSuccess,
  getAllIdTypesSuccess,
  getAllIdTypesError,
  getCompanyDocsSuccess,
  updateUserNameSuccess,
  updateUserNameError,
  validateDirOtpSuccess,
} from "./actions";

import {
  getAllGenderService,
  getAuthUserService,
  getAuthUsersService,
  getBankDetailsService,
  getBanksService,
  getCompanyDocsService,
  getCountriesService,
  getLgasService,
  getStatesService,
  getUserDocsService,
  getWithdrawReasonService,
  sendCompanyOtpService,
  sendOtpService,
  updateUserKycService,
  validateOtpService,
  verifyBvnService,
  getAllSourcesService,
  getAllIdTypesService,
  updateUserNameService,
} from "../../services/profileService";

function* getAuthentUsers() {
  try {
    const response = yield call(getAuthUsersService);
    yield put(getAuthUsersSuccess(response.data));
  } catch (error) {
    yield put(getAuthUsersError(error?.response?.data));
  }
}

function* getAuthUser({ payload: { email } }) {
  try {
    const response = yield call(getAuthUserService, email);
    yield put(getAuthUserSuccess(response.data));
  } catch (error) {
    yield put(getAuthUserError(error?.response?.data));
  }
}

function* updateUserKyc({ payload: { formData, pathCred, dispatch } }) {
  try {
    const response = yield call(updateUserKycService, formData);
    yield put(updateUserKycSuccess(response.data));
    if (response && pathCred?.route === "/plan-product") {
      setTimeout(() => {
        toast.success("KYC Updated Successfully");
      }, 2000);
      yield put(getAuthUsers());
      pathCred?.navigate(pathCred?.route);
    }

    if (response && pathCred?.route === "/profile") {
      setTimeout(() => {
        toast.success("KYC Updated Successfully");
      }, 2000);
      yield put(getAuthUsers());
      pathCred?.navigate(pathCred?.route);
    }
    if (response && !pathCred) {
      dispatch(getAuthUsers());
    }
  } catch (error) {
    yield put(updateUserKycError(error?.response?.data));
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    }
  }
}

function* updateUserName({ payload: { formData, dispatch } }) {
  try {
    const response = yield call(updateUserNameService, formData);
    yield put(updateUserNameSuccess(response.data));
    if (response) {
      dispatch(getAuthUsers());
    }
  } catch (error) {
    yield put(updateUserNameError(error?.response?.data));
  }
}

function* verifyBvn({ payload: { formData, id, setComplete } }) {
  try {
    const response = yield call(verifyBvnService, formData);
    yield put(verifyBvnSuccess(response.data));
    if (response.data && setComplete) {
      setComplete(true);
    }
  } catch (error) {
    yield put(verifyBvnError(error?.response?.data, id));
  }
}

function* getCountries() {
  try {
    const response = yield call(getCountriesService);
    yield put(getCountriesSuccess(response.data));
  } catch (error) {
    yield put(getCountriesError(error?.response?.data));
  }
}

function* getStates({ payload: { countryId } }) {
  try {
    const response = yield call(getStatesService, countryId);
    yield put(getStatesSuccess(response.data));
  } catch (error) {
    yield put(getStatesError(error?.response?.data));
  }
}

function* getLgas({ payload: { stateId } }) {
  try {
    const response = yield call(getLgasService, stateId);
    yield put(getLgasSuccess(response.data));
  } catch (error) {
    yield put(getLgasError(error?.response?.data));
  }
}

function* sendOtp({ payload: { otpType, dataObj } }) {
  try {
    const response = yield call(sendOtpService, otpType, dataObj);
    yield put(sendOtpSuccess(response.data));
  
    if (response?.data?.message) {
      toast.success(response?.data?.message, { position: "top-right" });
    }
  } catch (error) {
    yield put(sendOtpError(error?.response?.data));
  }
}

function* validateOtp({ payload: { otp, validType } }) {
  try {
    const response = yield call(validateOtpService, otp);
    if(validType === "addDirector"){
      yield put(validateDirOtpSuccess(response.data))
    }else{
      yield put(validateOtpSuccess(response.data));
    } 
    if (response?.data?.message) {
      toast.success(response?.data?.message, { position: "top-right" });
    }
  } catch (error) {
    yield put(validateOtpError(error?.response?.data));
  }
}

function* sendCompanyOtp({ payload: { otpType, dataObj } }) {
  try {
    const response = yield call(sendCompanyOtpService, otpType, dataObj);
    yield put(sendCompanyOtpSuccess(response.data));
    if (response?.data?.message) {
      toast.success(response?.data?.message, { position: "top-right" });
    }
  } catch (error) {
    yield put(sendCompanyOtpError(error?.response?.data));
  }
}

function* getBanks() {
  try {
    const response = yield call(getBanksService);
    yield put(getBanksSuccess(response.data));
  } catch (error) {
    yield put(getBanksError(error?.response?.data));
  }
}

function* getCompanyDocument() {
  try {
    const response = yield call(getCompanyDocsService);
    yield put(getCompanyDocsSuccess(response?.data));
  } catch (error) {
    yield put(getCompanyDocsError(error?.response?.data));
  }
}

function* getBankDetails() {
  try {
    const response = yield call(getBankDetailsService);
    yield put(getBankDetailsSuccess(response.data));
  } catch (error) {
    yield put(getBankDetailsError(error?.response?.data));
  }
}

function* getWithdrawReason() {
  try {
    const response = yield call(getWithdrawReasonService);
    yield put(getWithdrawReasonSuccess(response.data));
  } catch (error) {
    yield put(getWithdrawReasonError(error?.response?.data));
  }
}

function* getUserDocs() {
  try {
    const response = yield call(getUserDocsService);
    yield put(getUserDocsSuccess(response.data));
  } catch (error) {
    yield put(getUserDocsError(error?.response?.data));
  }
}

function* getAllGender() {
  try {
    const response = yield call(getAllGenderService);
    yield put(getAllGenderSuccess(response.data));
  } catch (error) {
    yield put(getAllGenderError(error?.response?.data));
  }
}

function* getAllSources() {
  try {
    const response = yield call(getAllSourcesService);
    yield put(getAllSourcesSuccess(response.data));
  } catch (error) {
    yield put(getAllSourcesError(error?.response?.data));
  }
}

function* getAllIdTypes() {
  try {
    const response = yield call(getAllIdTypesService);
    yield put(getAllIdTypesSuccess(response.data));
  } catch (error) {
    yield put(getAllIdTypesError(error?.response?.data));
  }
}

export function* watchGetAuthUsers() {
  yield takeEvery(GET_AUTH_USERS, getAuthentUsers);
}

export function* watchGetAuthUser() {
  yield takeEvery(GET_AUTH_USER, getAuthUser);
}

export function* watchUpdateUserKyc() {
  yield takeEvery(UPDATE_USER_KYC, updateUserKyc);
}

export function* watchVerifyBvn() {
  yield takeEvery(VERIFY_BVN, verifyBvn);
}

export function* watchGetCountries() {
  yield takeEvery(GET_COUNTRY, getCountries);
}

export function* watchGetStates() {
  yield takeEvery(GET_STATE, getStates);
}

export function* watchGetLgas() {
  yield takeEvery(GET_LGA, getLgas);
}

export function* watchSendOtp() {
  yield takeEvery(SEND_OTP, sendOtp);
}

export function* watchValidateOtp() {
  yield takeEvery(VALIDATE_OTP, validateOtp);
}

export function* watchSendCompanyOtp() {
  yield takeEvery(SEND_COMPANY_OTP, sendCompanyOtp);
}

export function* watchGetBanks() {
  yield takeEvery(GET_BANKS, getBanks);
}

export function* watchGetCompanyDocs() {
  yield takeEvery(GET_COMPANY_DOCS, getCompanyDocument);
}

export function* watchGetBankDetails() {
  yield takeEvery(GET_BANK_DETAILS, getBankDetails);
}

export function* watchGetWithdrawReason() {
  yield takeEvery(GET_WITHDRAW_REASON, getWithdrawReason);
}

export function* watchGetUserDocs() {
  yield takeEvery(GET_USER_DOCS, getUserDocs);
}

export function* watchGetAllGender() {
  yield takeEvery(GET_ALL_GENDER, getAllGender);
}

export function* watchGetAllSources() {
  yield takeEvery(GET_ALL_SOURCES, getAllSources);
}

export function* watchGetAllIdTypes() {
  yield takeEvery(GET_ALL_ID_TYPES, getAllIdTypes);
}

export function* watchUpdateUserName() {
  yield takeEvery(UPDATE_USER_NAME, updateUserName);
}

function* ProfileSaga() {
  yield all([
    fork(watchGetAuthUsers),
    fork(watchGetAuthUser),
    fork(watchUpdateUserKyc),
    fork(watchVerifyBvn),
    fork(watchGetCountries),
    fork(watchGetStates),
    fork(watchGetLgas),
    fork(watchSendOtp),
    fork(watchValidateOtp),
    fork(watchSendCompanyOtp),
    fork(watchGetBanks),
    fork(watchGetCompanyDocs),
    fork(watchGetBankDetails),
    fork(watchGetWithdrawReason),
    fork(watchGetUserDocs),
    fork(watchGetAllGender),
    fork(watchGetAllSources),
    fork(watchGetAllIdTypes),
    fork(watchUpdateUserName),
  ]);
}

export default ProfileSaga;
