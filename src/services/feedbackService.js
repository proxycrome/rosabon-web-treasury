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

export const getSingleTicketService = (id) => {
    const http = new HttpService();
    const url = `auth/feedback/${id}`;

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

export const postReplyService = (formData) => {
    const http = new HttpService();
    const url = `auth/feedback/reply-ticket`;

    return http.postDataWithToken(formData, url);
}

export const getRepliesService = (id) => {
    const http = new HttpService();
    const url = `auth/feedback/ticket-reply/${id}`;

    return http.getData(url);
}

export const getTicketCategoriesService = () => {
    const http = new HttpService();
    const url = `auth/admin/feedback/categories?platform=TREASURY&status=ACTIVE`;

    return http.getData(url);
};