import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  INITIALIZE_PAYMENT,
  REGISTER_TRANSACTION,
  VERIFY_PAYSTACK,
} from "./actionTypes";

import {
  initPaymentSuccess,
  initPaymentError,
  regTransactionSuccess,
  regTransactionError,
  verifyPaystackSuccess,
  verifyPaystackError
} from "./actions";

import { createPlan } from "../actions";  

import { planAction } from "../plan/actions"

import { 
  initializePaymentService, 
  registerTransService,
  verifyPaymentService 
} from "../../services/paystackPayServices";

import toast from 'react-hot-toast';

function* initPayment({ payload: { formData } }) {
	try {
		const response = yield call(initializePaymentService, formData);
		yield put(initPaymentSuccess(response.data));
    window.open(response.data);
	} catch (error) {
		console.log(error?.response?.data);
		yield put(initPaymentError(error?.response?.data));
	};
};

function* verifyPaystack({ payload: { 
  paymentGateway, 
  transactionRef, 
  dispatch, 
  form, 
  setShow, 
  setDebitPopup, 
  action,
} }) {
  try {
    const response = yield call(verifyPaymentService, paymentGateway, transactionRef);
    yield put(verifyPaystackSuccess(response.data));
    if(response){
      if(action === "TOP_UP"){
        dispatch(planAction(form, setShow, null, dispatch, setDebitPopup))
      }else{
        dispatch(createPlan(form, setShow));
      }
    }
  } catch (error) {
    yield put(verifyPaystackError(error?.response?.data))
    toast.error("Payment not verified", {
      position: "top-right",
    })
  };
};

function* regTransaction({ payload: { formData } }) {
	try {
		const response = yield call(registerTransService, formData);
		yield put(regTransactionSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(regTransactionError(error?.response?.data));
    if(error?.response?.data?.message){
      toast.error(error?.response?.data?.message, {position: "top-right"})
    }
	};
};

export function* watchInitPayment() {
	yield takeEvery(INITIALIZE_PAYMENT, initPayment);
};

export function* watchVerifyPaystack() {
  yield takeEvery(VERIFY_PAYSTACK, verifyPaystack);
};

export function* watchRegTransaction() {
  yield takeEvery(REGISTER_TRANSACTION, regTransaction);
};

function* PaystackSaga() {
	yield all([
		fork(watchInitPayment),
    fork(watchVerifyPaystack),
    fork(watchRegTransaction),
	]);
};

export default PaystackSaga;