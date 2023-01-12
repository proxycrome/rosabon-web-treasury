import {
  INITIALIZE_PAYMENT,
  INITIALIZE_PAYMENT_SUCCESS,
  INITIALIZE_PAYMENT_ERROR,
  REGISTER_TRANSACTION,
  REGISTER_TRANSACTION_SUCCESS,
  REGISTER_TRANSACTION_ERROR,
  VERIFY_PAYSTACK,
  VERIFY_PAYSTACK_SUCCESS,
  VERIFY_PAYSTACK_ERROR,
  CLEAR_TRANS_REF
} from "./actionTypes";

const initialState = {
  loading: false,
  paySuccess: null,
  payError: null,
  verify_paystack: null,
  verify_paystackError: null,
  reg_transaction: null,
  reg_transactionError: null,
};

const paystack = ( state=initialState, action ) => {
  switch(action.type) {
    case INITIALIZE_PAYMENT:
    case VERIFY_PAYSTACK:
    case REGISTER_TRANSACTION:
      state = {
        ...state,
        loading: true
      };
      break;

    case INITIALIZE_PAYMENT_SUCCESS:
      state = {
        ...state,
        loading: false,
        paySuccess: action.payload,
        payError: null
      };
      break;

    case INITIALIZE_PAYMENT_ERROR:
      state = {
        ...state,
        loading: false,
        paySuccess: null,
        payError: action.payload
      };
      break;

    case VERIFY_PAYSTACK_SUCCESS:
      state = {
        ...state,
        loading: false,
        verify_paystack: action.payload,
        verify_paystackError: null
      };
      break;

    case VERIFY_PAYSTACK_ERROR:
      state = {
        ...state,
        loading: false,
        verify_paystack: null,
        verify_paystackError: action.payload
      };
      break;

    case REGISTER_TRANSACTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        reg_transaction: action.payload,
        reg_transactionError: null
      };
      break;

    case REGISTER_TRANSACTION_ERROR:
      state = {
        ...state,
        loading: false,
        reg_transaction: null,
        reg_transactionError: action.payload
      };
      break;

    case CLEAR_TRANS_REF:
      state = {
        ...state,
        reg_transaction: null,
        reg_transactionError: null,
      }
      break;

    default:
      state = {...state};
      break;
  };
  return state
};

export default paystack;