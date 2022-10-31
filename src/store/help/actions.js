import { GET_FAQ, GET_FAQ_ERROR, GET_FAQ_SUCCESS } from "./actionTypes";

export const getFaq = () => {
  return {
    type: GET_FAQ,
  };
};

export const getFaqSuccess = (data) => {
  return {
    type: GET_FAQ_SUCCESS,
    payload: data,
  };
};

export const getFaqError = (error) => {
  return {
    type: GET_FAQ_ERROR,
    payload: error,
  };
};
