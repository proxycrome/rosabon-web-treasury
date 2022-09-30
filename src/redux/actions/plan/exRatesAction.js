import {
  GET_EX_RATES,
  GET_EX_RATES_SUCCESS,
  GET_EX_RATES_ERROR
} from '../../constant/planActionTypes';
import { get_exRates } from '../../api/plan/exRates.api';


export const getExRates = () => async (dispatch) => {
  dispatch({ type:GET_EX_RATES });
  const { formData, errorObj } = await get_exRates();

  if (formData) {
    dispatch({ type: GET_EX_RATES_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_EX_RATES_ERROR, payload: errorObj });
  }
}