import HttpService from "./HttpService";

export const getFaqService = () => {
    const http = new HttpService();
    const url = `auth/tr-faq`;
    return http.getData(url);
}