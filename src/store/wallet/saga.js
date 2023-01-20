import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  GET_EACH_WALLET_TRANSACTION,
  GET_MY_DEPOSIT_ACTIVITIES,
  GET_MY_REFERRALS,
  GET_MY_REFERRAL_ACTIVITIES,
  GET_REFERRAL_REDEEM_THRESHOLD,
  GET_SPECIAL_EARNING_ACTIVITIES,
  GET_TOTAL_EARNING,
  GET_TOTAL_REDEEMED_EARNING,
  GET_WALLET_BALANCE,
  GET_WALLET_TRANSACTIONS,
  POKE_USER,
  POST_TRANSFER_TO_PLAN,
  REDEEEM_SPECIAL_EARNING,
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
  getMyReferrals,
  getMyReferralsError,
  getMyReferralsSuccess,
  getReferralRedeemThresholdError,
  getReferralRedeemThresholdSuccess,
  getSpecialEarningActivitiesError,
  getSpecialEarningActivitiesSuccess,
  getTotalEarningError,
  getTotalEarningSuccess,
  getTotalRedeemedEarningError,
  getTotalRedeemedEarningSuccess,
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
  redeemSpecialEarningError,
  redeemSpecialEarningSuccess,
  requestWithdrawalError,
  requestWithdrawalSuccess,
} from "./actions";

import {
  getEachWalletTransactionService,
  getMyDepositActivitiesService,
  getMyReferralActivitiesService,
  getMyReferralsService,
  getReferralRedeemThresholdService,
  getSpecialEarningActivitiesService,
  getTotalEarningService,
  getTotalRedeemedEarningService,
  getWalletBalanceService,
  getWalletTransactionsService,
  pokeUserService,
  postTransferToPlanService,
  redeemReferralBonusService,
  redeemSpecialEarningService,
  requestWithdrawalService,
} from "../../services/walletService";

import toast from "react-hot-toast";

function* getWalletBalancer() {
  try {
    const response = yield call(getWalletBalanceService);
    yield put(getWalletBalanceSuccess(response.data));
  } catch (error) {
    yield put(getWalletBalanceError(error?.response?.data));
  }
}

function* getWalletTransactions() {
  try {
    const response = yield call(getWalletTransactionsService);
    yield put(getWalletTransactionsSuccess(response.data));
  } catch (error) {
    yield put(getWalletTransactionsError(error?.response?.data));
  }
}

function* requestWithdrawal({ payload: { formData } }) {
  try {
    const response = yield call(requestWithdrawalService, formData);
    yield put(requestWithdrawalSuccess(response.data));
    if (response) {
      yield put(getWalletBalance());
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
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
    yield put(getEachWalletTransactionSuccess(response.data));
  } catch (error) {
    yield put(getEachWalletTransactionError(error?.response?.data));
  }
}

function* getUserReferrals() {
  try {
    const response = yield call(getMyReferralsService);
    yield put(getMyReferralsSuccess(response.data));
  } catch (error) {
    yield put(getMyReferralsError(error?.response?.data));
  }
}

function* postTransferToPlan({ payload: { formData } }) {
  try {
    const response = yield call(postTransferToPlanService, formData);
    yield put(postTransferToPlanSuccess(response.data));
    if (response) {
      yield put(getWalletBalance());
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
    yield put(postTransferToPlanError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* pokeUser({ payload: { id, dispatch } }) {
  try {
    const response = yield call(pokeUserService, id);
    yield put(pokeUserSuccess(response.data));
    if (response) {
      dispatch(getMyReferrals());
      setTimeout(() => {
        toast.success(response.data.message);
      }, 1000);
    }
  } catch (error) {
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
    yield put(getMyReferralActivitiesSuccess(response.data));
  } catch (error) {
    yield put(getMyReferralActivitiesError(error?.response?.data));
  }
}

function* redeemReferralBonus() {
  try {
    const response = yield call(redeemReferralBonusService);
    yield put(redeemReferralBonusSuccess(response.data));
    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
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
    yield put(getMyDepositActivitiesSuccess(response.data));
  } catch (error) {
    yield put(getMyDepositActivitiesError(error?.response?.data));
  }
}

function* getReferralRedeemThreshold() {
  try {
    const response = yield call(getReferralRedeemThresholdService);
    yield put(getReferralRedeemThresholdSuccess(response.data));
  } catch (error) {
    yield put(getReferralRedeemThresholdError(error?.response?.data));
  }
}

function* redeemSpecialEarning() {
  try {
    const response = yield call(redeemSpecialEarningService);
    yield put(redeemSpecialEarningSuccess(response.data));
    if (response) {
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  } catch (error) {
    yield put(redeemSpecialEarningError(error?.response?.data));
    if (error?.response?.data?.message) {
      setTimeout(() => {
        toast.error(error?.response?.data?.message);
      }, 1000);
    }
  }
}

function* getSpecialEarningActivities() {
  try {
    const response = yield call(getSpecialEarningActivitiesService);
    yield put(getSpecialEarningActivitiesSuccess(response.data));
  } catch (error) {
    yield put(getSpecialEarningActivitiesError(error?.response?.data));
  }
}

function* getTotalEarning() {
  try {
    const response = yield call(getTotalEarningService);
    yield put(getTotalEarningSuccess(response.data));
  } catch (error) {
    yield put(getTotalEarningError(error?.response?.data));
  }
}

function* getTotalRedeemedEarning() {
  try {
    const response = yield call(getTotalRedeemedEarningService);
    yield put(getTotalRedeemedEarningSuccess(response.data));
  } catch (error) {
    yield put(getTotalRedeemedEarningError(error?.response?.data));
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
  yield takeEvery(GET_MY_REFERRALS, getUserReferrals);
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

export function* watchGetReferralRedeemThreshold() {
  yield takeEvery(GET_REFERRAL_REDEEM_THRESHOLD, getReferralRedeemThreshold);
}

export function* watchRedeemSpecialEarning() {
  yield takeEvery(REDEEEM_SPECIAL_EARNING, redeemSpecialEarning);
}

export function* watchGetSpecialEarningActivities() {
  yield takeEvery(GET_SPECIAL_EARNING_ACTIVITIES, getSpecialEarningActivities);
}

export function* watchGetTotalEarning() {
  yield takeEvery(GET_TOTAL_EARNING, getTotalEarning);
}

export function* watchGetTotalRedeemedEarning() {
  yield takeEvery(GET_TOTAL_REDEEMED_EARNING, getTotalRedeemedEarning);
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
    fork(watchGetReferralRedeemThreshold),
    fork(watchRedeemSpecialEarning),
    fork(watchGetSpecialEarningActivities),
    fork(watchGetTotalEarning),
    fork(watchGetTotalRedeemedEarning),
  ]);
}

export default WalletSaga;
