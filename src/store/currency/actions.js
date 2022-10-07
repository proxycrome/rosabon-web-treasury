import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR
} from "./actionTypes";

export const getCurrencies = () => {
  return {
    type: GET_CURRENCIES,
  };
};

export const getCurrenciesSuccess = (data) => {
  return {
    type: GET_CURRENCIES_SUCCESS,
    payload: data,
  };
};

export const getCurrenciesError = (error) => {
  return {
    type: GET_CURRENCIES_ERROR,
    payload: error,
  };
};