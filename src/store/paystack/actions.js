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
} from "./actionTypes";

export const initPayment = (formData) => {
  return {
    type: INITIALIZE_PAYMENT,
    payload: { formData },
  };
};

export const initPaymentSuccess = (data) => {
  return {
    type: INITIALIZE_PAYMENT_SUCCESS,
    payload: data,
  };
};

export const initPaymentError = (error) => {
  return {
    type: INITIALIZE_PAYMENT_ERROR,
    payload: error,
  };
};

export const regTransaction = (formData) => {
  return {
    type: REGISTER_TRANSACTION,
    payload: { formData },
  };
};

export const regTransactionSuccess = (data) => {
  return {
    type: REGISTER_TRANSACTION_SUCCESS,
    payload: data,
  };
};

export const regTransactionError = (error) => {
  return {
    type: REGISTER_TRANSACTION_ERROR,
    payload: error,
  };
};

export const verifyPaystack = (
  paymentGateway,
  transactionRef,
  dispatch,
  form,
  setShow,
  setDebitPopup,
  action
) => {
  return {
    type: VERIFY_PAYSTACK,
    payload: {
      paymentGateway,
      transactionRef,
      dispatch,
      form,
      setShow,
      setDebitPopup,
      action,
    },
  };
};

export const verifyPaystackSuccess = (data) => {
  return {
    type: VERIFY_PAYSTACK_SUCCESS,
    payload: data,
  };
};

export const verifyPaystackError = (error) => {
  return {
    type: VERIFY_PAYSTACK_ERROR,
    payload: error,
  };
};
