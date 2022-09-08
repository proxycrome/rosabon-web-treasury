import {
  GET_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_SUCCESS,
} from '../../constant/walletActionTypes';
import { get_wallet_balance, get_wallet_transactions } from '../../api/wallet/wallet.api';

export const getWalletBalance = () => async (dispatch) => {
  dispatch({ type: GET_WALLET_BALANCE });
  const { formData, errorObj } = await get_wallet_balance();
  console.log(formData);
  if (formData) {
    dispatch({ type: GET_WALLET_BALANCE_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_WALLET_BALANCE_ERROR, payload: errorObj });
  }
};

export const getWalletTransactions = () => async (dispatch) => {
  dispatch({ type: GET_WALLET_TRANSACTIONS });
  const { formData, errorObj } = await get_wallet_transactions();
  console.log(formData);
  if (formData) {
    dispatch({ type: GET_WALLET_TRANSACTIONS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_WALLET_TRANSACTIONS_ERROR, payload: errorObj });
  }
};
