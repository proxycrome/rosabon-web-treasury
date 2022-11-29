import HttpService from "./HttpService";

export const getFaqService = () => {
    const http = new HttpService();
    const url = `auth/faq-category?platform=TREASURY`;
    return http.getData(url);
}

// export const getFaqCatService = () => {
//     const http = new HttpService();
//     const url = `auth/faq?platform=TREASURY`;
//     return http.getData(url);
// }