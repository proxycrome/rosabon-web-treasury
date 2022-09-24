import {
  CREATE_PLAN,
  CREATE_PLAN_SUCCESS,
  CREATE_PLAN_ERROR,
  GET_SINGLE_PLAN,
  GET_SINGLE_PLAN_SUCCESS,
  GET_SINGLE_PLAN_ERROR
} from '../constant/planActionTypes';

const initialState = {
  loading: false,
  newPlan: null,
  newPlanError: null,
  singlePlan: null,
  singlePlanError: null
}

const plan = ( state=initialState, action ) => {
  switch(action.type) {
    case CREATE_PLAN:
    case GET_SINGLE_PLAN:
      state = {
        ...state,
        loading: true
      }
      break;

    case CREATE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        newPlan: action.payload,
        newPlanError: null
      }
      break;

    case CREATE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        newPlan: null,
        newPlanError: action.payload
      }
      break;

    case GET_SINGLE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        singlePlan: action.payload,
        singlePlanError: null
      }
      break;

    case GET_SINGLE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        singlePlan: null,
        singlePlanError: action.payload
      }
      break;

    default:
      state = { ...state }
      break;
  };

  return state;
};

export default plan;
