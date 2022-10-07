import HttpService from "./HttpService";

export const getCurrenciesService = () => {
	const http = new HttpService();
	const url = `auth/trcurrency`;

	return http.getData(url);
};