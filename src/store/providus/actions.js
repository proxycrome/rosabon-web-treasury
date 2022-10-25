import {
  CREATE_DYNAMIC_ACC,
  CREATE_DYNAMIC_ACC_ERROR,
  CREATE_DYNAMIC_ACC_SUCCESS
} from './actionTypes';

export const createDynamicAcc = (planName) => {
  return {
		type: CREATE_DYNAMIC_ACC,
		payload: { planName },
	};
};

export const createDynamicAccSuccess = (data) => {
  return {
		type: CREATE_DYNAMIC_ACC_SUCCESS,
		payload: data,
	};
};

export const createDynamicAccError = (error) => {
  return {
		type: CREATE_DYNAMIC_ACC_ERROR,
		payload: error,
	};
};