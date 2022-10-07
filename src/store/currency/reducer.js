import {
  GET_CURRENCIES,
  GET_CURRENCIES_SUCCESS,
  GET_CURRENCIES_ERROR
} from "./actionTypes";

const initialState = {
  loading: false,
  currencies: null,
  currenciesError: null
};

const currencies = (state = initialState, action) => {
  switch(action.type) {
    case GET_CURRENCIES:
      state = {
        ...state,
        loading: true
      }
      break;

    case GET_CURRENCIES_SUCCESS:
      state = {
        ...state,
        currencies: action.payload,
        currenciesError: null
      };
      break;

    case GET_CURRENCIES_ERROR:
      state = {
        ...state,
        currencies: null,
        currenciesError: action.payload
      };
      break;

    default:
      state = {...state};
      break;
  };
  return state;
};

export default currencies;