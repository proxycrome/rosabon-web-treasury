import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
	GET_AUTH_USER,
	GET_AUTH_USERS,
	GET_BANKS,
	GET_COMPANY_DOCS,
	GET_COUNTRY,
	GET_LGA,
	GET_STATE,
	SEND_COMPANY_OTP,
	SEND_OTP,
	UPDATE_USER_KYC,
	VALIDATE_OTP,
	VERIFY_BVN,
} from "./actionTypes";

import {
	getAuthUserError,
	getAuthUsersError,
	getAuthUsersSuccess,
	getAuthUserSuccess,
	getBanksError,
	getBanksSuccess,
	getCompanyDocsError,
	getCompanyDocsSuccess,
	getCountriesError,
	getCountriesSuccess,
	getLgasError,
	getLgasSuccess,
	getStatesError,
	getStatesSuccess,
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
} from "./actions";

import {
	getAuthUserService,
	getAuthUsersService,
	getBanksService,
	getCompanyDocsService,
	getCountriesService,
	getLgasService,
	getStatesService,
	sendCompanyOtpService,
	sendOtpService,
	updateUserKycService,
	validateOtpService,
	verifyBvnService,
} from "../../services/profileService";

function* getAuthUsers() {
	try {
		const response = yield call(getAuthUsersService);
		console.log(response.data);
		yield put(getAuthUsersSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getAuthUsersError(error?.response?.data));
	}
}

function* getAuthUser({ payload: { email } }) {
	try {
		const response = yield call(getAuthUserService, email);
		console.log(response.data);
		yield put(getAuthUserSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getAuthUserError(error?.response?.data));
	}
}

function* updateUserKyc({ payload: { formData, pathCred } }) {
	try {
		const response = yield call(updateUserKycService, formData);
		console.log(response.data);
		yield put(updateUserKycSuccess(response.data));
		if (response && pathCred.route === "/plan-product") {
			setTimeout(() => {
				toast.success("KYC Updated Successfully");
			}, 5000);
			pathCred.navigate(pathCred.route);
		}

		if (response && pathCred.route === "/profile") {
			setTimeout(() => {
				toast.success("KYC Updated Successfully");
			}, 5000);
			pathCred.navigate(pathCred.route);
		}
	} catch (error) {
		console.log(error?.response?.data);
		yield put(updateUserKycError(error?.response?.data));
		toast.error(error?.response?.data?.message);
	}
}

function* verifyBvn({ payload: { formData, id } }) {
	try {
		const response = yield call(verifyBvnService, formData);
		console.log(response.data);
		yield put(verifyBvnSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(verifyBvnError(error?.response?.data, id));
	}
}

function* getCountries() {
	try {
		const response = yield call(getCountriesService);
		console.log(response.data);
		yield put(getCountriesSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getCountriesError(error?.response?.data));
	}
}

function* getStates({payload: {countryId}}) {
	try {
		const response = yield call(getStatesService, countryId);
		console.log(response.data);
		yield put(getStatesSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getStatesError(error?.response?.data));
	}
}

function* getLgas({payload: {stateId}}) {
	try {
		const response = yield call(getLgasService, stateId);
		console.log(response.data);
		yield put(getLgasSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getLgasError(error?.response?.data));
	}
}

function* sendOtp() {
	try {
		const response = yield call(sendOtpService);
		console.log(response.data);
		yield put(sendOtpSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(sendOtpError(error?.response?.data));
	}
}

function* validateOtp({payload: {otp}}) {
	try {
		const response = yield call(validateOtpService, otp);
		console.log(response.data);
		yield put(validateOtpSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(validateOtpError(error?.response?.data));
	}
}

function* sendCompanyOtp() {
	try {
		const response = yield call(sendCompanyOtpService);
		console.log(response.data);
		yield put(sendCompanyOtpSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(sendCompanyOtpError(error?.response?.data));
	}
}

function* getBanks() {
	try {
		const response = yield call(getBanksService);
		console.log(response.data);
		yield put(getBanksSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getBanksError(error?.response?.data));
	}
}

function* getCompanyDocs() {
	try {
		const response = yield call(getCompanyDocsService);
		console.log(response.data);
		yield put(getCompanyDocsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getCompanyDocsError(error?.response?.data));
	}
}

export function* watchGetAuthUsers() {
	yield takeEvery(GET_AUTH_USERS, getAuthUsers);
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
	yield takeEvery(GET_COMPANY_DOCS, getCompanyDocs);
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
	]);
}

export default ProfileSaga;