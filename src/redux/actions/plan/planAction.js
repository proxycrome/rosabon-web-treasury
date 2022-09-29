import {
  CREATE_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_ERROR,
  GET_PLANS,
  GET_PLANS_SUCCESS,
  GET_PLANS_ERROR,
  GET_SINGLE_PLAN,
  GET_SINGLE_PLAN_SUCCESS,
  GET_SINGLE_PLAN_ERROR,
  GET_TENOR,
  GET_TENOR_SUCCESS,
  GET_TENOR_ERROR
} from '../../constant/planActionTypes';

import { 
  create_plan, 
  get_plans,
  get_single_plan, 
  get_tenor 
} from '../../api/plan/plan.api';

export const createPlan = (dataObj, setShow) => async (dispatch) => {
  dispatch({ type:CREATE_PLAN });
  const { formData, errorObj } = await create_plan(dataObj);

  if (formData) {
    dispatch({ type: CREATE_PLAN_SUCCESS, payload: formData });
    setShow(true);
  }

  if (errorObj) {
    dispatch({ type: CREATE_PLAN_ERROR, payload: errorObj });
  }
}

export const getPlans = () => async (dispatch) => {
  dispatch({ type:GET_PLANS });
  const { formData, errorObj } = await get_plans();

  if (formData) {
    dispatch({ type: GET_PLANS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_PLANS_ERROR, payload: errorObj });
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

export const getTenor = (dataObj) => async (dispatch) => {
  dispatch({ type:GET_TENOR });
  const { formData, errorObj } = await get_tenor(dataObj);

  if (formData) {
    dispatch({ type: GET_TENOR_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_TENOR_ERROR, payload: errorObj });
  }
}
