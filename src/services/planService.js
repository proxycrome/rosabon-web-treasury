import HttpService from "./HttpService";

export const getContribValService = () => {
    const http = new HttpService();
    const url = `trcontrib-value`;

    return http.getData(url)
}

export const getExRatesService = () => {
    const http = new HttpService();
    const url = `auth/trexchange-rates`;

    return http.getData(url)
}

export const createPlanService = (formData) => {
    const http = new HttpService();
    const url = `auth/trcreate-plan`;

    return http.postDataWithToken(formData, url)
}

export const getInvestmentRatesService = () => {
    const http = new HttpService();
    const url = `auth/trinvestment-rates`;

    return http.getData(url)
}

export const getPlansService = () => {
    const http = new HttpService();
    const url = `auth/trcreate-plan`;

    return http.getData(url)
}

export const getSinglePlanService = (id) => {
    const http = new HttpService();
    const url = `auth/trcreate-plan/${id}`;

    return http.getData(url)
}

export const getTenorService = () => {
    const http = new HttpService();
    const url = `auth/trtenor`;

    return http.getData(url)
}

export const getWithholdingTaxService = () => {
    const http = new HttpService();
    const url = `auth/trwithholding-tax`;

    return http.getData(url)
}
