import {
  INITIALIZE_PAYMENT,
  INITIALIZE_PAYMENT_SUCCESS,
  INITIALIZE_PAYMENT_ERROR,
  VERIFY_PAYSTACK,
  VERIFY_PAYSTACK_SUCCESS,
  VERIFY_PAYSTACK_ERROR
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

export const verifyPaystack = (paymentGateway, transactionRef) => {
  return {
    type: VERIFY_PAYSTACK,
    payload: { paymentGateway, transactionRef },
  };
};

export const verifyPaystackSuccess = (data) => {
  return {
    type: VERIFY_PAYSTACK_SUCCESS,
    payload: data
  };
};

export const verifyPaystackError = (error) => {
  return {
    type: VERIFY_PAYSTACK_ERROR,
    payload: error,
  };
};