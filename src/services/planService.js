import HttpService from "./HttpService";

export const getContribValService = () => {
  const http = new HttpService();
  const url = `trcontrib-value`;

  return http.getData(url);
};

export const getExRatesService = () => {
  const http = new HttpService();
  const url = `auth/trexchange-rates`;

  return http.getData(url);
};

export const createPlanService = (formData) => {
  const http = new HttpService();
  const url = `auth/trcreate-plan`;

  return http.postDataWithToken(formData, url);
};

export const getInvestmentRatesService = () => {
  const http = new HttpService();
  const url = `auth/trinvestment-rates`;

  return http.getData(url);
};

export const getPlansService = () => {
  const http = new HttpService();
  const url = `auth/trcreate-plan`;

  return http.getData(url);
};

export const getSinglePlanService = (id) => {
  const http = new HttpService();
  const url = `auth/trcreate-plan/${id}`;

  return http.getData(url);
};

export const deletePlanService = (id) => {
    const http = new HttpService();
    const url = `auth/trplan-action/${id}`;

    return http.deleteData(url);
}

export const getTenorService = () => {
  const http = new HttpService();
  const url = `auth/trtenor`;

  return http.getData(url);
};

export const getWithholdingTaxService = () => {
  const http = new HttpService();
  const url = `auth/trwithholding-tax`;

  return http.getData(url);
};

export const getEligiblePlansService = () => {
  const http = new HttpService();
  const url = `auth/wallet-transfer/eligible-plans-for-transfer`;
  return http.getData(url);
};

export const planActionService = (formData) => {
  const http = new HttpService();
  const url = `auth/trplan-action`;

  return http.postDataWithToken(formData, url)
};

export const getAllPlanHistoryService = () => {
  const http = new HttpService();
  const url = `auth/tr-plan-history`;
  return http.getData(url);
};

export const singlePlanHistoryService = (id) => {
  const http = new HttpService();
  const url = `auth/tr-plan-history/${id}`;

  return http.getData(url);
};

export const viewBankDetailService = (id) => {
  const http = new HttpService();
  const url = `auth/trplan-action/view-bank-details?planId=${id}`;
  return http.getData(url);
};

export const completeTransferService = (id) => {
  const http = new HttpService();
  const url = `auth/trplan-action/complete-transfer?id=${id}`;
  return http.postDataWithToken(null, url);
};

export const penalChargeService = () => {
  const http = new HttpService();
  const url = `auth/trpenal-charge`;
  return http.getData(url);
};

export const payWithCardService = (id) => {
  const http = new HttpService();
  const url = `auth/trplan-action/pay-with-card?planId=${id}`;
  return http.getData(url);
};