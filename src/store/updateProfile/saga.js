import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";
import {
  CHANGE_PASSWORD,
  DELETE_DIRECTOR,
  GET_DIRECTOR_DETAILS,
  PUT_CONTACT_DETAILS,
  PUT_PERSONAL_DOCUMENTS,
  PUT_PERSONAL_INFO,
  UPDATE_BANK_DETAILS,
  UPDATE_COMPANY_DOCS,
  UPDATE_COMPANY_INFO,
  UPDATE_DIRECTOR_DETAILS,
  VALIDATE_PHONE_OTP,
  VERIFY_ACCOUNT_NO,
  VERIFY_PHONE,
} from "./actionTypes";

import {
  changeUserPasswordError,
  changeUserPasswordSuccess,
  deleteDirectorError,
  deleteDirectorSuccess,
  getDirectorDetailsError,
  getDirectorDetailsSuccess,
  updateBankDetailsError,
  updateBankDetailsSuccess,
  updateCompanyDetailsError,
  updateCompanyDetailsSuccess,
  updateContactDetailsError,
  updateContactDetailsSuccess,
  updateDirectorDetailsError,
  updateDirectorDetailsSuccess,
  updatePersonalInfoError,
  updatePersonalInfoSuccess,
  uploadCompanyDocumentError,
  uploadCompanyDocumentSuccess,
  uploadPersonalDocumentError,
  uploadPersonalDocumentSuccess,
  validatePhoneOtpError,
  validatePhoneOtpSuccess,
  verifyAccountNoError,
  verifyAccountNoSuccess,
  verifyPhoneError,
  verifyPhoneSuccess,
} from "./actions";

import {
  changeUserPasswordService,
  deleteDirectorService,
  getDirectorDetailsService,
  updateBankDetailsService,
  updateCompanyDetailsService,
  updateCompanyDocsService,
  updateContactDetailsService,
  updateDirectorDetailsService,
  updatePersonalDocsService,
  updatePersonalInfoService,
  validatePhoneOtpService,
  verifyAccountNoService,
  verifyPhoneService,
} from "../../services/updateProfileService";
import { getCompanyDocs } from "../actions";

function* verifyAccountNo({ payload: { formData } }) {
  try {
    const response = yield call(verifyAccountNoService, formData);
    console.log(response.data);
    yield put(verifyAccountNoSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(verifyAccountNoError(error?.response?.data));
  }
}

function* changeUserPassword({ payload: { formData } }) {
  try {
    const response = yield call(changeUserPasswordService, formData);
    console.log(response.data);
    yield put(changeUserPasswordSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(changeUserPasswordError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* updateCompanyDetails({ payload: { formData } }) {
  try {
    const response = yield call(updateCompanyDetailsService, formData);
    console.log(response.data);
    yield put(updateCompanyDetailsSuccess(response.data));
    if (response) {
      toast.success("Company Details Updated Successfully");
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updateCompanyDetailsError(error?.response?.data));
    if (error?.response) {
      toast.error(error?.response?.data?.message);
    }
  }
}

function* updateContactDetails({ payload: { formData } }) {
  try {
    const response = yield call(updateContactDetailsService, formData);
    console.log(response.data);
    yield put(updateContactDetailsSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updateContactDetailsError(error?.response?.data));
  }
}

function* updateDirectorDetails({ payload: { formData } }) {
  try {
    const response = yield call(updateDirectorDetailsService, formData);
    console.log(response.data);
    yield put(updateDirectorDetailsSuccess(response.data));
    if (response) {
      toast.success("Director Details Updated Successfully");
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updateDirectorDetailsError(error?.response?.data));
    if (error?.response) {
      toast.error(error?.response?.data);
    }
  }
}

function* verifyPhone({ payload: { recipient } }) {
  try {
    const response = yield call(verifyPhoneService, recipient);
    console.log(response.data);
    yield put(verifyPhoneSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(verifyPhoneError(error?.response?.data));
  }
}

function* validatePhoneOtp({ payload: { otp } }) {
  try {
    const response = yield call(validatePhoneOtpService, otp);
    console.log(response.data);
    yield put(validatePhoneOtpSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(validatePhoneOtpError(error?.response?.data));
  }
}

function* updatePersonalInfo({ payload: { formData } }) {
  try {
    const response = yield call(updatePersonalInfoService, formData);
    console.log(response.data);
    yield put(updatePersonalInfoSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updatePersonalInfoError(error?.response?.data));
  }
}

function* updateCompanyDocument({ payload: { formData, reset } }) {
  try {
    const response = yield call(updateCompanyDocsService, formData);
    console.log(response.data);
    yield put(uploadCompanyDocumentSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your documents have been updated successfully");
      }, 1000);
      const { setShowEdit} = reset;
      setShowEdit(true);
      yield put(getCompanyDocs());
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(uploadCompanyDocumentError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* updatePersonalDocument({ payload: { formData } }) {
  try {
    const response = yield call(updatePersonalDocsService, formData);
    console.log(response.data);
    yield put(uploadPersonalDocumentSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your documents have been updated successfully");
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(uploadPersonalDocumentError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getDirectorDetails() {
  try {
    const response = yield call(getDirectorDetailsService);
    console.log(response.data);
    yield put(getDirectorDetailsSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getDirectorDetailsError(error?.response?.data));
  }
}

function* deleteDirector({ payload: { id, setShowModal } }) {
  try {
    const response = yield call(deleteDirectorService, id);
    console.log(response.data);
    yield put(deleteDirectorSuccess(response.data));
    if (response) {
      toast.success(response.data.message);
      setShowModal(false);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(deleteDirectorError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* updateBankDetails({ payload: { formData } }) {
  try {
    const response = yield call(updateBankDetailsService, formData);
    console.log(response.data);
    yield put(updateBankDetailsSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your bank details have been updated");
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updateBankDetailsError(error?.response?.data));
    if (error?.response) {
      if (error?.response?.data?.message?.startsWith("More")) {
        toast.error("This Bank details has already been used by another user");
        return;
      }
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

export function* watchVerifyAccountNo() {
  yield takeEvery(VERIFY_ACCOUNT_NO, verifyAccountNo);
}

export function* watchChangeUserPassword() {
  yield takeEvery(CHANGE_PASSWORD, changeUserPassword);
}

export function* watchUpdateCompanyDetails() {
  yield takeEvery(UPDATE_COMPANY_INFO, updateCompanyDetails);
}

export function* watchUpdateContactDetails() {
  yield takeEvery(PUT_CONTACT_DETAILS, updateContactDetails);
}

export function* watchUpdateDirectorDetails() {
  yield takeEvery(UPDATE_DIRECTOR_DETAILS, updateDirectorDetails);
}

export function* watchVerifyPhone() {
  yield takeEvery(VERIFY_PHONE, verifyPhone);
}

export function* watchValidatePhoneOtp() {
  yield takeEvery(VALIDATE_PHONE_OTP, validatePhoneOtp);
}

export function* watchUpdatePersonalInfo() {
  yield takeEvery(PUT_PERSONAL_INFO, updatePersonalInfo);
}

export function* watchUpdateCompanyDocument() {
  yield takeEvery(UPDATE_COMPANY_DOCS, updateCompanyDocument);
}

export function* watchUpdatePersonalDocument() {
  yield takeEvery(PUT_PERSONAL_DOCUMENTS, updatePersonalDocument);
}

export function* watchGetDirectorDetails() {
  yield takeEvery(GET_DIRECTOR_DETAILS, getDirectorDetails);
}

export function* watchDeleteDirector() {
  yield takeEvery(DELETE_DIRECTOR, deleteDirector);
}

export function* watchUpdateBankDetails() {
  yield takeEvery(UPDATE_BANK_DETAILS, updateBankDetails);
}

function* UpdateProfileSaga() {
  yield all([
    fork(watchVerifyAccountNo),
    fork(watchChangeUserPassword),
    fork(watchUpdateCompanyDetails),
    fork(watchUpdateContactDetails),
    fork(watchUpdateDirectorDetails),
    fork(watchVerifyPhone),
    fork(watchValidatePhoneOtp),
    fork(watchUpdatePersonalInfo),
    fork(watchUpdateCompanyDocument),
    fork(watchUpdatePersonalDocument),
    fork(watchGetDirectorDetails),
    fork(watchDeleteDirector),
    fork(watchUpdateBankDetails),
  ]);
}

export default UpdateProfileSaga;
