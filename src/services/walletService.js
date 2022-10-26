import HttpService from "./HttpService";

export const getWalletBalanceService = () => {
  const http = new HttpService();
  const url = `auth/wallet-balance`;

  return http.getData(url);
};

export const getWalletTransactionsService = () => {
  const http = new HttpService();
  const url = `auth/transactions/history`;
  return http.getData(url);
};

export const requestWithdrawalService = (formData) => {
  const http = new HttpService();
  const url = `auth/wallets/request-withdrawal`;
  return http.postDataWithToken(formData, url);
};

export const getEachWalletTransactionService = (transId) => {
  const http = new HttpService();
  const url = `auth/transactions/history/${transId}`;
  return http.getData(url);
};

export const getMyReferralsService = () => {
  const http = new HttpService();
  const url = `auth/referrals`;
  return http.getData(url);
}

export const postTransferToPlanService = (formData) => {
  const http = new HttpService();
  const url = `auth/wallets/wallet-transfer`;
  return http.postDataWithToken(formData, url);
}