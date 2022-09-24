import {
  CREATE_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_ERROR,
  GET_SINGLE_PLAN,
  GET_SINGLE_PLAN_SUCCESS,
  GET_SINGLE_PLAN_ERROR
} from '../../constant/planActionTypes';

import { create_plan, get_single_plan } from '../../api/plan/plan.api';

export const createPlan = (dataObj) => async (dispatch) => {
  dispatch({ type:CREATE_PLAN });
  const { formData, errorObj } = await create_plan(dataObj);

  if (formData) {
    dispatch({ type: CREATE_PLAN_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: CREATE_PLAN_ERROR, payload: errorObj });
  }
}

export const getSinglePlan = (id) => async (dispatch) => {
  dispatch({ type:GET_SINGLE_PLAN });
  const { formData, errorObj } = await get_single_plan(id);

  if (formData) {
    dispatch({ type: GET_SINGLE_PLAN_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_SINGLE_PLAN_ERROR, payload: errorObj });
  }
}
