import {
  GET_EACH_WALLET_TRANSACTION,
  GET_EACH_WALLET_TRANSACTION_ERROR,
  GET_EACH_WALLET_TRANSACTION_SUCCESS,
  GET_MY_REFERRALS,
  GET_MY_REFERRALS_ERROR,
  GET_MY_REFERRALS_SUCCESS,
  GET_MY_REFERRAL_ACTIVITIES,
  GET_MY_REFERRAL_ACTIVITIES_ERROR,
  GET_MY_REFERRAL_ACTIVITIES_SUCCESS,
  GET_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_SUCCESS,
  POKE_USER,
  POKE_USER_ERROR,
  POKE_USER_SUCCESS,
  POST_TRANSFER_TO_PLAN,
  POST_TRANSFER_TO_PLAN_ERROR,
  POST_TRANSFER_TO_PLAN_SUCCESS,
  REDEEM_REFERRAL_BONUS,
  REDEEM_REFERRAL_BONUS_ERROR,
  REDEEM_REFERRAL_BONUS_SUCCESS,
  REQUEST_WITHDRAWAL,
  REQUEST_WITHDRAWAL_ERROR,
  REQUEST_WITHDRAWAL_SUCCESS,
} from "./actionTypes";

export const getWalletBalance = () => {
  return {
    type: GET_WALLET_BALANCE,
  };
};

export const getWalletBalanceSuccess = (data) => {
  return {
    type: GET_WALLET_BALANCE_SUCCESS,
    payload: data,
  };
};

export const getWalletBalanceError = (error) => {
  return {
    type: GET_WALLET_BALANCE_ERROR,
    payload: error,
  };
};

export const getWalletTransactions = () => {
  return {
    type: GET_WALLET_TRANSACTIONS,
  };
};

export const getWalletTransactionsSuccess = (data) => {
  return {
    type: GET_WALLET_TRANSACTIONS_SUCCESS,
    payload: data,
  };
};

export const getWalletTransactionsError = (error) => {
  return {
    type: GET_WALLET_TRANSACTIONS_ERROR,
    payload: error,
  };
};

export const requestWithdrawal = (formData) => {
  return {
    type: REQUEST_WITHDRAWAL,
    payload: { formData },
  };
};

export const requestWithdrawalSuccess = (data) => {
  return {
    type: REQUEST_WITHDRAWAL_SUCCESS,
    payload: data,
  };
};

export const requestWithdrawalError = (error) => {
  return {
    type: REQUEST_WITHDRAWAL_ERROR,
    payload: error,
  };
};

export const getEachWalletTransaction = (transId) => {
  return {
    type: GET_EACH_WALLET_TRANSACTION,
    payload: { transId },
  };
};

export const getEachWalletTransactionSuccess = (data) => {
  return {
    type: GET_EACH_WALLET_TRANSACTION_SUCCESS,
    payload: data,
  };
};

export const getEachWalletTransactionError = (error) => {
  return {
    type: GET_EACH_WALLET_TRANSACTION_ERROR,
    payload: error,
  };
};

export const getMyReferrals = () => {
  return {
    type: GET_MY_REFERRALS,
  };
};

export const getMyReferralsSuccess = (data) => {
  return {
    type: GET_MY_REFERRALS_SUCCESS,
    payload: data,
  };
};

export const getMyReferralsError = (error) => {
  return {
    type: GET_MY_REFERRALS_ERROR,
    payload: error,
  };
};

export const postTransferToPlan = (formData) => {
  return {
    type: POST_TRANSFER_TO_PLAN,
    payload: { formData },
  };
};

export const postTransferToPlanSuccess = (data) => {
  return {
    type: POST_TRANSFER_TO_PLAN_SUCCESS,
    payload: data,
  };
};

export const postTransferToPlanError = (error) => {
  return {
    type: POST_TRANSFER_TO_PLAN_ERROR,
    payload: error,
  };
};

export const pokeUser = (id) => {
  return {
    type: POKE_USER,
    payload: { id },
  };
};

export const pokeUserSuccess = (data) => {
  return {
    type: POKE_USER_SUCCESS,
    payload: data,
  };
};

export const pokeUserError = (error) => {
  return {
    type: POKE_USER_ERROR,
    payload: error,
  };
};

export const getMyReferralActivities = () => {
  return {
    type: GET_MY_REFERRAL_ACTIVITIES,
  };
};

export const getMyReferralActivitiesSuccess = (data) => {
  return {
    type: GET_MY_REFERRAL_ACTIVITIES_SUCCESS,
    payload: data,
  };
};

export const getMyReferralActivitiesError = (error) => {
  return {
    type: GET_MY_REFERRAL_ACTIVITIES_ERROR,
    payload: error,
  };
};

export const redeemReferralBonus = () => {
  return {
    type: REDEEM_REFERRAL_BONUS,
  };
};

export const redeemReferralBonusSuccess = (data) => {
  return {
    type: REDEEM_REFERRAL_BONUS_SUCCESS,
    payload: data,
  };
};

export const redeemReferralBonusError = (error) => {
  return {
    type: REDEEM_REFERRAL_BONUS_ERROR,
    payload: error,
  };
};
