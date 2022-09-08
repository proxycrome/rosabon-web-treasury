import {
  GET_WALLET_BALANCE,
  GET_WALLET_BALANCE_ERROR,
  GET_WALLET_BALANCE_SUCCESS,
  GET_WALLET_TRANSACTIONS,
  GET_WALLET_TRANSACTIONS_ERROR,
  GET_WALLET_TRANSACTIONS_SUCCESS,
} from '../constant/walletActionTypes';

const initialState = {
  loading: false,
  walletBalance: null,
  walletBalanceError: null,
  walletTransactions: null,
  walletTransError: null,
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

    case GET_WALLET_TRANSACTIONS_SUCCESS: 
      state = {
        ...state,
        loading: false,
        walletTransactions: action.payload,
        walletTransError: null,
      }
      break;

    case GET_WALLET_TRANSACTIONS_ERROR: 
      state = {
        ...state,
        loading: false,
        walletTransError: action.payload,
        walletTransactions: null,
      }
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default wallet;
