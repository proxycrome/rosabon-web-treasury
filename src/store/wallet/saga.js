import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import { GET_WALLET_BALANCE, GET_WALLET_TRANSACTIONS } from "./actionTypes";

import {
	getWalletBalanceError,
	getWalletBalanceSuccess,
	getWalletTransactionsError,
	getWalletTransactionsSuccess,
} from "./actions";

import {
	getWalletBalanceService,
	getWalletTransactionsService,
} from "../../services/walletService";

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

export function* watchGetWalletBalance() {
	yield takeEvery(GET_WALLET_BALANCE, getWalletBalance);
}

export function* watchGetWalletTransactions() {
	yield takeEvery(GET_WALLET_TRANSACTIONS, getWalletTransactions);
}

function* WalletSaga() {
	yield all([fork(watchGetWalletBalance), fork(watchGetWalletTransactions)]);
}

export default WalletSaga;
