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

export const updateUserNameService = (formData) => {
  const http = new HttpService();
  const url = `auth/users/update-first-last-name`;

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

export const sendOtpService = (otpType, dataObj) => {
  const http = new HttpService();
  if (otpType === "document") {
    const url = `auth/individual-user/my-document/send-otp`;
    return http.getData(url);
  } else if (otpType === "bank") {
    const url = `auth/individual-user/bank-account/send-otp`;
    return http.getData(url);
  } else if (otpType === "password") {
    const url = `auth/users/send-otp`;
    return http.postDataWithToken(dataObj, url);
  } else {
    const url = `auth/individual-user/send-otp`;
    return http.getData(url);
  }
};

export const validateOtpService = (otp) => {
  const http = new HttpService();
  const url = `auth/validate-otp/${otp}`;
  return http.postDataWithToken(null, url);
};

export const sendCompanyOtpService = (otpType, dataObj) => {
  const http = new HttpService();
  let url;
  if (otpType === "director") {
    url = `auth/company/director-details/send-otp`;
    return http.postDataWithToken(null, url);
  } else if (otpType === "document") {
    url = `auth/company/company-document/send-otp`;
    return http.getData(url);
  } else if (otpType === "password") {
    url = `auth/users/send-otp`;
    return http.postDataWithToken(dataObj, url);
  }
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

export const getAllGenderService = () => {
  const http = new HttpService();
  const url = `auth/admin/gender?status=ACTIVE`;
  return http.getData(url);
};

export const getAllSourcesService = () => {
  const http = new HttpService();
  const url = `auth/admin/sources?status=ACTIVE`;
  return http.getDataWithoutToken(url);
};

export const getAllIdTypesService = () => {
  const http = new HttpService();
  const url = `auth/admin/identification-type?status=ACTIVE`;
  return http.getData(url);
};
