import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  INITIALIZE_PAYMENT,
  VERIFY_PAYSTACK,
} from "./actionTypes";

import {
  initPaymentSuccess,
  initPaymentError,
  verifyPaystackSuccess,
  verifyPaystackError
} from "./actions";

import { initializePaymentService, verifyPaymentService } from "../../services/paystackPayServices";

function* initPayment({ payload: { formData } }) {
	try {
		const response = yield call(initializePaymentService, formData);
		console.log(response.data);
		yield put(initPaymentSuccess(response.data));
    window.open(response.data);
	} catch (error) {
		console.log(error?.response?.data);
		yield put(initPaymentError(error?.response?.data));
	};
};

function* verifyPaystack({ payload: { paymentGateway, transactionRef } }) {
  try {
    const response = yield call(verifyPaymentService, paymentGateway, transactionRef);
    yield put(verifyPaystackSuccess(response.data));
  } catch (error) {
    yield put(verifyPaystackError(error?.response?.data))
  };
};

export function* watchInitPayment() {
	yield takeEvery(INITIALIZE_PAYMENT, initPayment);
};

export function* watchVerifyPaystack() {
  yield takeEvery(VERIFY_PAYSTACK, verifyPaystack);
};

function* PaystackSaga() {
	yield all([
		fork(watchInitPayment),
    fork(watchVerifyPaystack)
	]);
};

export default PaystackSaga;