import {
  CREATE_DYNAMIC_ACC,
  CREATE_DYNAMIC_ACC_ERROR,
  CREATE_DYNAMIC_ACC_SUCCESS
} from './actionTypes';

const initialState = {
  loading: false,
  dynamic_account: null,
  dynamic_acc_error: null
};

const providus = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_DYNAMIC_ACC:
      state = {
        ...state,
        loading: true,
      };
      break;

    case CREATE_DYNAMIC_ACC_SUCCESS:
      state = {
        ...state,
        loading: false,
        dynamic_account: action.payload,
        dynamic_acc_error: null
      };
      break;

    case CREATE_DYNAMIC_ACC_ERROR:
      state = {
        ...state,
        loading: false,
        dynamic_account: null,
        dynamic_acc_error: action.payload
      };
      break;

    default:
      state = {...state};
      break;
  };
  return state;
};

export default providus;