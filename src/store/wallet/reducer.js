import {
  CLEAR_TRANSACTIONS,
  CLEAR_WALLET_BALANCE,
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

const initialState = {
  loading: false,
  walletBalance: null,
  walletBalanceError: null,
  walletTransactions: null,
  walletTransError: null,
  withdrawMsg: null,
  withdrawMsgError: null,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
    case GET_WALLET_BALANCE:
    case GET_WALLET_TRANSACTIONS:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_WALLET_BALANCE_SUCCESS:
      state = {
        ...state,
        loading: false,
        walletBalance: action.payload,
        walletBalanceError: null,
      };
      break;

    case GET_WALLET_BALANCE_ERROR:
      state = {
        ...state,
        loading: false,
        walletBalance: null,
        walletBalanceError: action.payload,
      };
      break;

    case CLEAR_WALLET_BALANCE:
      state = {
        ...state,
        walletBalance: null,
        walletBalanceError: null,
      };
      break;

    case GET_WALLET_TRANSACTIONS_SUCCESS:
      state = {
        ...state,
        loading: false,
        walletTransactions: action.payload,
        walletTransError: null,
      };
      break;

    case GET_WALLET_TRANSACTIONS_ERROR:
      state = {
        ...state,
        loading: false,
        walletTransError: action.payload,
        walletTransactions: null,
      };
      break;

    case CLEAR_TRANSACTIONS:
      state = {
        ...state,
        walletTransactions: null,
        walletTransError: null,
      };
      break;

    case REQUEST_WITHDRAWAL:
      state = {
        ...state,
        loading: true,
        withdraeMsg: null,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_SUCCESS:
      state = {
        ...state,
        loading: false,
        withdraeMsg: action.payload,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_ERROR:
      state = {
        ...state,
        loading: false,
        withdraeMsg: null,
        withdrawMsgError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default wallet;
