import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_EACH_WALLET_TRANSACTION,
  GET_MY_DEPOSIT_ACTIVITIES,
  GET_MY_REFERRALS,
  GET_MY_REFERRAL_ACTIVITIES,
  GET_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
  POKE_USER,
  POST_TRANSFER_TO_PLAN,
  REDEEM_REFERRAL_BONUS,
  REQUEST_WITHDRAWAL,
} from "./actionTypes";

import {
  getEachWalletTransactionError,
  getEachWalletTransactionSuccess,
  getMyDepositActivitiesError,
  getMyDepositActivitiesSuccess,
  getMyReferralActivitiesError,
  getMyReferralActivitiesSuccess,
  getMyReferralsError,
  getMyReferralsSuccess,
  getWalletBalance,
  getWalletBalanceError,
  getWalletBalanceSuccess,
  getWalletTransactionsError,
  getWalletTransactionsSuccess,
  pokeUserError,
  pokeUserSuccess,
  postTransferToPlanError,
  postTransferToPlanSuccess,
  redeemReferralBonusError,
  redeemReferralBonusSuccess,
  requestWithdrawalError,
  requestWithdrawalSuccess,
} from "./actions";

import {
  getEachWalletTransactionService,
  getMyDepositActivitiesService,
  getMyReferralActivitiesService,
  getMyReferralsService,
  getWalletBalanceService,
  getWalletTransactionsService,
  pokeUserService,
  postTransferToPlanService,
  redeemReferralBonusService,
  requestWithdrawalService,
} from "../../services/walletService";
import toast from "react-hot-toast";

function* getWalletBalancer() {
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
      yield put(getWalletBalance());
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

function* getEachWalletTransaction({ payload: { transId } }) {
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

function* postTransferToPlan({ payload: { formData } }) {
  try {
    const response = yield call(postTransferToPlanService, formData);
    console.log(response.data);
    yield put(postTransferToPlanSuccess(response.data));
    if (response) {
      yield put(getWalletBalance());
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(postTransferToPlanError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* pokeUser({ payload: { id } }) {
  try {
    const response = yield call(pokeUserService, id);
    console.log(response.data);
    yield put(pokeUserSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(pokeUserError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getMyReferralActivities() {
  try {
    const response = yield call(getMyReferralActivitiesService);
    console.log(response.data);
    yield put(getMyReferralActivitiesSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getMyReferralActivitiesError(error?.response?.data));
  }
}

function* redeemReferralBonus() {
  try {
    const response = yield call(redeemReferralBonusService);
    console.log(response.data);
    yield put(redeemReferralBonusSuccess(response.data));
    if (response) {
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(redeemReferralBonusError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getMyDepositActivities() {
  try {
    const response = yield call(getMyDepositActivitiesService);
    console.log(response.data);
    yield put(getMyDepositActivitiesSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getMyDepositActivitiesError(error?.response?.data));
  }
}

export function* watchGetWalletBalance() {
  yield takeEvery(GET_WALLET_BALANCE, getWalletBalancer);
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

export function* watchPostTransferToPlan() {
  yield takeEvery(POST_TRANSFER_TO_PLAN, postTransferToPlan);
}

export function* watchPokeUser() {
  yield takeEvery(POKE_USER, pokeUser);
}

export function* watchGetMyReferralActivities() {
  yield takeEvery(GET_MY_REFERRAL_ACTIVITIES, getMyReferralActivities);
}

export function* watchRedeemReferralBonus() {
  yield takeEvery(REDEEM_REFERRAL_BONUS, redeemReferralBonus);
}

export function* watchGetMyDepositActivities() {
  yield takeEvery(GET_MY_DEPOSIT_ACTIVITIES, getMyDepositActivities);
}

function* WalletSaga() {
  yield all([
    fork(watchGetWalletBalance),
    fork(watchGetWalletTransactions),
    fork(watchRequestWithdrawal),
    fork(watchGetEachWalletTransaction),
    fork(watchGetMyReferrals),
    fork(watchPostTransferToPlan),
    fork(watchPokeUser),
    fork(watchGetMyReferralActivities),
    fork(watchRedeemReferralBonus),
    fork(watchGetMyDepositActivities),
  ]);
}

export default WalletSaga;
