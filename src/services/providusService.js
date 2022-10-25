import HttpService from "./HttpService";

export const createDynamicAccService = (planName) => {
    const http = new HttpService();
    const url = `providus/create-dynamic-account?planName=${planName}`;

    return http.postDataWithToken({}, url);
}