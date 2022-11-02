import HttpService from "./HttpService";

export const getNotificationService = () => {
    const http = new HttpService();
    const url = `notification`;
    return http.getData(url);
}