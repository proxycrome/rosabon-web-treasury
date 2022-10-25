import {
  CLEAR_TRANSACTIONS,
  CLEAR_WALLET_BALANCE,
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
  POST_TRANSFER_TO_PLAN,
  POST_TRANSFER_TO_PLAN_ERROR,
  POST_TRANSFER_TO_PLAN_SUCCESS,
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
  transaction: null,
  transactionError: null,
  myReferrals: null,
  myReferralsError: null,
  transferMsg: null,
  transferMsgError: null,
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
        withdrawMsg: null,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_SUCCESS:
      state = {
        ...state,
        loading: false,
        withdrawMsg: action.payload,
        withdrawMsgError: null,
      };
      break;

    case REQUEST_WITHDRAWAL_ERROR:
      state = {
        ...state,
        loading: false,
        withdrawMsg: null,
        withdrawMsgError: action.payload,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION:
      state = {
        ...state,
        loading: true,
        transaction: null,
        transactionError: null,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        transaction: action.payload,
        transactionError: null,
      };
      break;

    case GET_EACH_WALLET_TRANSACTION_ERROR:
      state = {
        ...state,
        loading: false,
        transaction: null,
        transactionError: action.payload,
      };
      break;

    case GET_MY_REFERRALS:
      state = {
        ...state,
        loading: true,
        myReferrals: null,
        myReferralsError: null,
      };
      break;

    case GET_MY_REFERRALS_SUCCESS:
      state = {
        ...state,
        loading: false,
        myReferrals: action.payload,
        myReferralsError: null,
      };
      break;

    case GET_MY_REFERRALS_ERROR:
      state = {
        ...state,
        loading: false,
        myReferrals: null,
        myReferralsError: action.payload,
      };
      break;

    case POST_TRANSFER_TO_PLAN:
      state = {
        ...state,
        loading: true,
        transferMsg: null,
        transferMsgError: null,
      };
      break;

    case POST_TRANSFER_TO_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        transferMsg: action.payload,
        transferMsgError: null,
      };
      break;

    case POST_TRANSFER_TO_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        transferMsg: null,
        transferMsgError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default wallet;
