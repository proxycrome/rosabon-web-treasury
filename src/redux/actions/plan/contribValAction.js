import {
  GET_CONTRIB_VAL,
  GET_CONTRIB_VAL_SUCCESS,
  GET_CONTRIB_VAL_ERROR
} from '../../constant/planActionTypes';
import { get_contrib_val } from '../../api/plan/contribVal.api';


export const getContribVal = () => async (dispatch) => {
  dispatch({ type:GET_CONTRIB_VAL });
  const { formData, errorObj } = await get_contrib_val();

  if (formData) {
    dispatch({ type: GET_CONTRIB_VAL_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_CONTRIB_VAL_ERROR, payload: errorObj });
  }
}