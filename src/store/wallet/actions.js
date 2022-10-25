import {
  GET_EACH_WALLET_TRANSACTION,
  GET_EACH_WALLET_TRANSACTION_ERROR,
  GET_EACH_WALLET_TRANSACTION_SUCCESS,
  GET_MY_REFERRALS,
  GET_MY_REFERRALS_ERROR,
  GET_MY_REFERRALS_SUCCESS,
  GET_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_SUCCESS,
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
  }
}

export const getMyReferralsSuccess = (data) => {
  return {
    type: GET_MY_REFERRALS_SUCCESS,
    payload: data,
  }
}

export const getMyReferralsError = (error) => {
  return {
    type: GET_MY_REFERRALS_ERROR,
    payload: error,
  }
}