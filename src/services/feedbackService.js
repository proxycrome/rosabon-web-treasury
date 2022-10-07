import HttpService from "./HttpService";

export const postFeedbackService = (formData) => {
    const http = new HttpService();
    const url = `auth/feedback`;

    return http.postDataWithToken(formData, url);
}

export const getTicketsService = () => {
    const http = new HttpService();
    const url = `auth/feedback/my-tickets`;

    return http.getData(url);
}

export const getOpenTicketsService = () => {
    const http = new HttpService();
    const url = `auth/feedback/open-tickets`;

    return http.getData(url);
}

export const getClosedTicketsService = () => {
    const http = new HttpService();
    const url = `auth/feedback/closed-tickets`;

    return http.getData(url);
}