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
  getDirectorDetails,
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
import { getCompanyDocs, logout } from "../actions";

function* verifyAccountNo({ payload: { formData } }) {
  try {
    const response = yield call(verifyAccountNoService, formData);
    yield put(verifyAccountNoSuccess(response.data));
  } catch (error) {
    yield put(verifyAccountNoError(error?.response?.data));
  }
}

function* changeUserPassword({
  payload: { formData, dispatch, resetPassword, navigate },
}) {
  try {
    const response = yield call(changeUserPasswordService, formData);
    yield put(changeUserPasswordSuccess(response.data));
    if (response) {
      if (
        response?.data?.data?.resetPassword &&
        response?.data?.data?.creationSource === "BACKEND" &&
        !resetPassword
      ) {
        toast.success(response.data.message, {position: "top-right"});
        setTimeout(() => {
          dispatch(logout(navigate, dispatch));
        }, 2000);
      } else {
        setTimeout(() => {
          toast.success(response.data.message, {position: "top-right"});
        }, 1000);
      }
    }
  } catch (error) {
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
    yield put(updateCompanyDetailsSuccess(response.data));
    if (response) {
      toast.success("Company Details Updated Successfully");
    }
  } catch (error) {
    yield put(updateCompanyDetailsError(error?.response?.data));
    if (error?.response) {
      toast.error(error?.response?.data?.message);
    }
  }
}

function* updateContactDetails({ payload: { formData } }) {
  try {
    const response = yield call(updateContactDetailsService, formData);
    yield put(updateContactDetailsSuccess(response.data));
  } catch (error) {
    yield put(updateContactDetailsError(error?.response?.data));
  }
}

function* updateDirectorDetails({ payload: { formData, reset, dispatch, handleClose, setShowEdit } }) {
  try {
    const response = yield call(updateDirectorDetailsService, formData);
    yield put(updateDirectorDetailsSuccess(response.data));
    if (response) {
      toast.success("Director Details Updated Successfully");
      dispatch(getDirectorDetails());
      reset();
      handleClose(false);
      setShowEdit(true);
     // setTimeout(() => {
      //   window.location.reload();
      // }, 2000)
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(updateDirectorDetailsError(error?.response?.data));
    if (error?.response?.data?.message) {
      toast.error(error?.response?.data?.message);
    }
  }
}

function* verifyPhone({ payload: { recipient } }) {
  try {
    const response = yield call(verifyPhoneService, recipient);
    yield put(verifyPhoneSuccess(response.data));
    if (response?.data?.message) {
      toast.success(response?.data?.message, { position: "top-right" });
    }
  } catch (error) {
    yield put(verifyPhoneError(error?.response?.data));
  }
}

function* validatePhoneOtp({ payload: { otp } }) {
  try {
    const response = yield call(validatePhoneOtpService, otp);
    yield put(validatePhoneOtpSuccess(response.data));
    if (response?.data?.message) {
      toast.success(response?.data?.message, { position: "top-right" });
    }
  } catch (error) {
    yield put(validatePhoneOtpError(error?.response?.data));
  }
}

function* updatePersonalInfo({ payload: { formData } }) {
  try {
    const response = yield call(updatePersonalInfoService, formData);
    yield put(updatePersonalInfoSuccess(response.data));
  } catch (error) {
    yield put(updatePersonalInfoError(error?.response?.data));
  }
}

function* updateCompanyDocument({ payload: { formData, reset } }) {
  try {
    const response = yield call(updateCompanyDocsService, formData);
    yield put(uploadCompanyDocumentSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your documents have been updated successfully");
      }, 1000);
      const { setShowEdit, dispatch, setFormData, setBase64File } = reset;
      setShowEdit(true);
      dispatch(getCompanyDocs());
      setFormData({
        idNumber: "",
        idTypeId: "",
      });
      setBase64File({
        frontEncodedString: "",
        certOfIncoEncodedString: "",
        utilityEncodedString: "",
        photoEncodedString: "",
        cacEncodedString: "",
        moaEncodedString: "",
      });
    }
  } catch (error) {
    yield put(uploadCompanyDocumentError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* updatePersonalDocument({ payload: { formData, reset } }) {
  try {
    const response = yield call(updatePersonalDocsService, formData);
    yield put(uploadPersonalDocumentSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your documents have been updated successfully");
      }, 1000);
      const { setShowEdit, getUserDocs } = reset;
      setShowEdit(true);
      yield put(getUserDocs());
    }
  } catch (error) {
    yield put(uploadPersonalDocumentError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getDirectorDetail() {
  try {
    const response = yield call(getDirectorDetailsService);
    yield put(getDirectorDetailsSuccess(response.data));
  } catch (error) {
    yield put(getDirectorDetailsError(error?.response?.data));
  }
}

function* deleteDirector({ payload: { id, setShowModal } }) {
  try {
    const response = yield call(deleteDirectorService, id);
    yield put(deleteDirectorSuccess(response.data));
    if (response) {
      toast.success(response.data.message);
      setShowModal(false);
    }
  } catch (error) {
    yield put(deleteDirectorError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* updateBankDetails({ payload: { formData, reset } }) {
  try {
    const response = yield call(updateBankDetailsService, formData);
    yield put(updateBankDetailsSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success("Your bank details have been updated");
      }, 1000);
      const { setShowEdit, getBankDetails, dispatch } = reset;
      setShowEdit(true);
      dispatch(getBankDetails());
    }
  } catch (error) {
    yield put(updateBankDetailsError(error?.response?.data));
    if (error?.response?.data?.message) {
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
  yield takeEvery(GET_DIRECTOR_DETAILS, getDirectorDetail);
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
