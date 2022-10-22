import HttpService from "./HttpService";

export const getAuthUsersService = () => {
  const http = new HttpService();
  const url = "auth/users";

  return http.getData(url);
};

export const getAuthUserService = (email) => {
  const http = new HttpService();
  const url = `auth/${email}/users`;

  return http.getData(url);
};

export const updateUserKycService = (formData) => {
  const http = new HttpService();
  const url = `auth/users`;

  return http.putData(formData, url);
};

export const verifyBvnService = (formData) => {
  const http = new HttpService();
  const url = `auth/verify-bvn`;

  return http.postDataWithToken(formData, url);
};

export const getCountriesService = () => {
  const http = new HttpService();
  const url = `country`;

  return http.getData(url);
};

export const getStatesService = (countryId) => {
  const http = new HttpService();
  const url = `state/${countryId}`;

  return http.getData(url);
};

export const getLgasService = (stateId) => {
  const http = new HttpService();
  const url = `lga/${stateId}`;

  return http.getData(url);
};

export const sendOtpService = () => {
  const http = new HttpService();
  const url = `auth/individual-user/send-otp`;
  return http.getData(url);
};

export const validateOtpService = (otp) => {
  const http = new HttpService();
  const url = `auth/validate-otp/${otp}`;
  return http.postDataWithToken(null, url);
};

export const sendCompanyOtpService = () => {
  const http = new HttpService();
  const url = `auth/company/company-document/send-otp`;
  return http.getData(url);
};

export const getBanksService = () => {
  const http = new HttpService();
  const url = `bank-account/get-all-banks`;
  return http.getData(url);
};

export const getCompanyDocsService = () => {
  const http = new HttpService();
  const url = `auth/company/company-document`;
  return http.getData(url);
};

export const getBankDetailsService = () => {
  const http = new HttpService();
  const url = `auth/individual-user/bank-account`;
  return http.getData(url);
};

export const getWithdrawReasonService = () => {
  const http = new HttpService();
  const url = `auth/trwithdrawal`;
  return http.getData(url);
};

export const getUserDocsService = () => {
  const http = new HttpService();
  const url = `auth/individual-user/my-document/get-by-user`;
  return http.getData(url);
};
