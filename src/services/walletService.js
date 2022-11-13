import HttpService from "./HttpService";

export const getWalletBalanceService = () => {
  const http = new HttpService();
  const url = `auth/wallet-balance`;

  return http.getData(url);
};

export const getWalletTransactionsService = () => {
  const http = new HttpService();
  const url = `auth/transactions/history?limit=1000000000`;
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
  const url = `auth/referrals?limit=1000000000`;
  return http.getData(url);
}

export const postTransferToPlanService = (formData) => {
  const http = new HttpService();
  const url = `auth/wallets/wallet-transfer`;
  return http.postDataWithToken(formData, url);
}

export const pokeUserService = (id) => {
  const http = new HttpService();
  const url = `auth/referrals/poke/${id}`;
  return http.postDataWithToken(null, url);
}

export const getMyReferralActivitiesService = () => {
  const http = new HttpService();
  const url = `auth/referrals/activities?limit=1000000000`;
  return http.getData(url);
}

export const redeemReferralBonusService = () => {
  const http = new HttpService();
  const url = `auth/referrals/redeem-bonus`;
  return http.postDataWithToken(null, url);
}

export const getMyDepositActivitiesService = () => {
  const http = new HttpService();
  const url = `auth/my-deposits/activities?limit=1000000000`;
  return http.getData(url);
}

export const getReferralRedeemThresholdService = () => {
  const http = new HttpService();
  const url = `auth/wallets/get-referral-redeem-threshold`;
  return http.getData(url);
}

export const redeemSpecialEarningService = () => {
  const http = new HttpService();
  const url = `auth/special-earnings/redeem-bonus`;
  return http.postDataWithToken(null, url);
}

export const getSpecialEarningActivitiesService = () => {
  const http = new HttpService();
  const url = `auth/special-earnings/activities?limit=1000000000`;
  return http.getData(url);
}

export const getTotalEarningService = () => {
  const http = new HttpService();
  const url = `auth/special-earnings/total-earning`;
  return http.getData(url);
}

export const getTotalRedeemedEarningService = () => {
  const http = new HttpService();
  const url = `auth/special-earnings/total-redeemed-earning`;
  return http.getData(url);
}