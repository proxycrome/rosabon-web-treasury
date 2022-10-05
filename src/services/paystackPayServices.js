import HttpService from "./HttpService";

export const initializePaymentService = (formData) => {
  const http = new HttpService();

  const url = `auth/initialize-payment`;
  return http.postDataWithToken(formData, url);
}

export const verifyPaymentService = (paymentGateway, transactionRef) => {
  const http = new HttpService();

  const url = `auth/payment-verification/${paymentGateway}/${transactionRef}`;
  return http.getData(url);
}