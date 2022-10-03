import HttpService from "./HttpService";

export const getProductsService = () => {
    const http = new HttpService();
    const url = `auth/trproduct`;

    return http.getData(url);
}

export const getSingleProductService = (id) => {
    const http = new HttpService();
    const url = `auth/trproduct/${id}`;

    return http.getData(url);
}

export const getCatWithProductsService = () => {
    const http = new HttpService();
    const url = `auth/trproduct-category/trproduct`;

    return http.getData(url);
}