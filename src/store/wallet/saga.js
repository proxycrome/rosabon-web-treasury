import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_EACH_WALLET_TRANSACTION,
  GET_MY_REFERRALS,
  GET_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
  REQUEST_WITHDRAWAL,
} from "./actionTypes";

import {
  getEachWalletTransactionError,
  getEachWalletTransactionSuccess,
  getMyReferralsError,
  getMyReferralsSuccess,
  getWalletBalanceError,
  getWalletBalanceSuccess,
  getWalletTransactionsError,
  getWalletTransactionsSuccess,
  requestWithdrawalError,
  requestWithdrawalSuccess,
} from "./actions";

import {
  getEachWalletTransactionService,
  getMyReferralsService,
  getWalletBalanceService,
  getWalletTransactionsService,
  requestWithdrawalService,
} from "../../services/walletService";
import toast from "react-hot-toast";

function* getWalletBalance() {
  try {
    const response = yield call(getWalletBalanceService);
    console.log(response.data);
    yield put(getWalletBalanceSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getWalletBalanceError(error?.response?.data));
  }
}

function* getWalletTransactions() {
  try {
    const response = yield call(getWalletTransactionsService);
    console.log(response.data);
    yield put(getWalletTransactionsSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getWalletTransactionsError(error?.response?.data));
  }
}

function* requestWithdrawal({ payload: { formData } }) {
  try {
    const response = yield call(requestWithdrawalService, formData);
    console.log(response.data);
    yield put(requestWithdrawalSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(requestWithdrawalError(error?.response?.data));
    if (error?.response) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getEachWalletTransaction({payload: {transId}}) {
  try {
    const response = yield call(getEachWalletTransactionService, transId);
    console.log(response.data);
    yield put(getEachWalletTransactionSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getEachWalletTransactionError(error?.response?.data));
  }
}

function* getMyReferrals() {
  try {
    const response = yield call(getMyReferralsService);
    console.log(response.data);
    yield put(getMyReferralsSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getMyReferralsError(error?.response?.data));
  }
}

export function* watchGetWalletBalance() {
  yield takeEvery(GET_WALLET_BALANCE, getWalletBalance);
}

export function* watchGetWalletTransactions() {
  yield takeEvery(GET_WALLET_TRANSACTIONS, getWalletTransactions);
}

export function* watchRequestWithdrawal() {
  yield takeEvery(REQUEST_WITHDRAWAL, requestWithdrawal);
}

export function* watchGetEachWalletTransaction() {
  yield takeEvery(GET_EACH_WALLET_TRANSACTION, getEachWalletTransaction);
}

export function* watchGetMyReferrals() {
  yield takeEvery(GET_MY_REFERRALS, getMyReferrals);
}

function* WalletSaga() {
  yield all([
    fork(watchGetWalletBalance),
    fork(watchGetWalletTransactions),
    fork(watchRequestWithdrawal),
    fork(watchGetEachWalletTransaction),
    fork(watchGetMyReferrals),
  ]);
}

export default WalletSaga;
