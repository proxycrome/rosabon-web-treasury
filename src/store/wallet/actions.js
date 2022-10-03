import {
	GET_WALLET_BALANCE,
	GET_WALLET_BALANCE_ERROR,
	GET_WALLET_BALANCE_SUCCESS,
	GET_WALLET_TRANSACTIONS,
	GET_WALLET_TRANSACTIONS_ERROR,
	GET_WALLET_TRANSACTIONS_SUCCESS,
} from "./actionTypes";

export const getWalletBalance = () => {
	return {
		type: GET_WALLET_BALANCE,
	};
};

export const getWalletBalanceSuccess = (data) => {
	return {
		type: GET_WALLET_BALANCE_SUCCESS,
		payload: data,
	};
};

export const getWalletBalanceError = (error) => {
	return {
		type: GET_WALLET_BALANCE_ERROR,
		payload: error,
	};
};

export const getWalletTransactions = () => {
	return {
		type: GET_WALLET_TRANSACTIONS,
	};
};

export const getWalletTransactionsSuccess = (data) => {
	return {
		type: GET_WALLET_TRANSACTIONS_SUCCESS,
		payload: data,
	};
};

export const getWalletTransactionsError = (error) => {
	return {
		type: GET_WALLET_TRANSACTIONS_ERROR,
		payload: error,
	};
};
