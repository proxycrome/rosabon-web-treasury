import HttpService from "./HttpService";

export const registerService = (formData) => {
	const http = new HttpService();
	const url = "users";

	return http.postData(formData, url);
};

export const loginService = (formData) => {
	const http = new HttpService();
	const url = "login";

	return http.postData(formData, url);
};

export const resetPasswordService = (formData) => {
	const http = new HttpService();
	const url = `users/reset-password`;

	return http.postData(formData, url);
};

export const forgotPasswordService = (email) => {
	const http = new HttpService();
	const url = `users/${email}/forgot-password`;

	return http.postData(null, url);
};

export const logoutService = () => {
	const http = new HttpService();
	const url = "auth/logout";

	return http.postDataWithToken(null, url);
};