import HttpService from "./HttpService";

export const getFaqService = () => {
    const http = new HttpService();
    const url = `auth/faq`;
    return http.getData(url);
}