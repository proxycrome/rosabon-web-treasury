import HttpService from "./HttpService";

export const getNotificationService = () => {
    const http = new HttpService();
    const url = `notification?platform=TREASURY`;
    return http.getData(url);
}

export const readNotificationService = (id) => {
    const http = new HttpService();
    const url = `notification/${id}`;
    return http.getData(url);
}

export const readAllNotificationsService = () => {
    const http = new HttpService();
    const url = `notification?platform=TREASURY`;
    return http.putData(null, url);
}