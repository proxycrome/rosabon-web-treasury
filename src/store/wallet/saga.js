import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
  REQUEST_WITHDRAWAL,
} from "./actionTypes";

import {
  getWalletBalanceError,
  getWalletBalanceSuccess,
  getWalletTransactionsError,
  getWalletTransactionsSuccess,
  requestWithdrawalError,
  requestWithdrawalSuccess,
} from "./actions";

import {
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

export function* watchGetWalletBalance() {
  yield takeEvery(GET_WALLET_BALANCE, getWalletBalance);
}

export function* watchGetWalletTransactions() {
  yield takeEvery(GET_WALLET_TRANSACTIONS, getWalletTransactions);
}

export function* watchRequestWithdrawal() {
  yield takeEvery(REQUEST_WITHDRAWAL, requestWithdrawal);
}

function* WalletSaga() {
  yield all([
    fork(watchGetWalletBalance),
    fork(watchGetWalletTransactions),
    fork(watchRequestWithdrawal),
  ]);
}

export default WalletSaga;
