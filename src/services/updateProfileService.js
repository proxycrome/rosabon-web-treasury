import HttpService from "./HttpService";

export const verifyAccountNoService = (formData) => {
  const http = new HttpService();
  const url = `auth/individual-user/bank-account/verify`;

  return http.postDataWithToken(formData, url);
};

export const changeUserPasswordService = (formData) => {
  const http = new HttpService();
  const url = `auth/users/change-password`;

  return http.postDataWithToken(formData, url);
};

export const updateCompanyDetailsService = (formData) => {
  const http = new HttpService();
  const url = `auth/company`;

  return http.putData(formData, url);
};

export const updateContactDetailsService = (formData) => {
  const http = new HttpService();
  const url = `auth/individual-user/contact-detail`;

  return http.putData(formData, url);
};

export const updateDirectorDetailsService = (formData) => {
  const http = new HttpService();
  const url = `auth/company/director-details`;

  return http.putData(formData, url);
};

export const verifyPhoneService = (recipient) => {
  const http = new HttpService();
  const url = `auth/individual-user/verify-phone?recipient=${recipient}`;

  return http.postDataWithToken(null, url);
};

export const validatePhoneOtpService = (otp) => {
  const http = new HttpService();
  const url = `auth/individual-user/validate-phone?otp=${otp}`;

  return http.getData(url);
};

export const updatePersonalInfoService = (formData) => {
  const http = new HttpService();
  const url = `auth/individual-user`;

  return http.putData(formData, url);
};

export const updateCompanyDocsService = (formData) => {
  const http = new HttpService();
  const url = `auth/company/company-document`;

  return http.putData(formData, url);
};

export const updatePersonalDocsService = (formData) => {
  const http = new HttpService();
  const url = `auth/individual-user/my-document`;

  return http.putData(formData, url);
};

export const getDirectorDetailsService = () => {
  const http = new HttpService();
  const url = `auth/company/director-details`;
  return http.getData(url);
};

export const deleteDirectorService = (id) => {
  const http = new HttpService();
  const url = `auth/company/director-details/${id}`;
  return http.deleteData(url);
};

export const updateBankDetailsService = (formData) => {
  const http = new HttpService();
  const url = `auth/individual-user/bank-account`;
  return http.putData(formData, url);
};
