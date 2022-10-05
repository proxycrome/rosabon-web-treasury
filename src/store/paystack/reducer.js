import {
  INITIALIZE_PAYMENT,
  INITIALIZE_PAYMENT_SUCCESS,
  INITIALIZE_PAYMENT_ERROR,
  VERIFY_PAYSTACK,
  VERIFY_PAYSTACK_SUCCESS,
  VERIFY_PAYSTACK_ERROR
} from "./actionTypes";

const initialState = {
  loading: false,
  paySuccess: null,
  payError: null,
  verifyPaystack: null,
  verifyPaystackError: null,
};

const paystack = ( state=initialState, action ) => {
  switch(action.type) {
    case INITIALIZE_PAYMENT:
    case VERIFY_PAYSTACK:
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
        verifyPaystack: action.payload,
        verifyPaystackError: null
      };
      break;

    case VERIFY_PAYSTACK_ERROR:
      state = {
        ...state,
        loading: false,
        verifyPaystack: null,
        verifyPaystackError: action.payload
      };
      break;

    default:
      state = {...state};
      break;
  };
  return state
};

export default paystack;