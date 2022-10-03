import HttpService from "./HttpService";

export const getWalletBalanceService = () => {
    const http = new HttpService();
    const url = `auth/wallet-balance`;

    return http.getData(url)
}

export const getWalletTransactionsService = () => {
    const http = new HttpService();
    const url = `auth/wallet-transactions`;

    return http.getData(url)
}