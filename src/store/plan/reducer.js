import {
    CREATE_PLAN,
    CREATE_PLAN_SUCCESS,
    CREATE_PLAN_ERROR,
    GET_SINGLE_PLAN,
    GET_SINGLE_PLAN_SUCCESS,
    GET_SINGLE_PLAN_ERROR,
    GET_TENOR,
    GET_TENOR_SUCCESS,
    GET_TENOR_ERROR,
    GET_EX_RATES,
    GET_EX_RATES_SUCCESS,
    GET_EX_RATES_ERROR,
    GET_CONTRIB_VAL,
    GET_CONTRIB_VAL_SUCCESS,
    GET_CONTRIB_VAL_ERROR,
    GET_PLANS,
    GET_PLANS_SUCCESS,
    GET_PLANS_ERROR
  } from './actionTypes';
  
  const initialState = {
    loading: false,
    newPlan: null,
    newPlanError: null,
    plans: null,
    plansError: null,
    singlePlan: null,
    singlePlanError: null,
    tenors: null,
    tenorsError: null,
    exRates: null,
    exRatesError: null,
    contribVal: null,
    contribValErr: null
  }
  
  const plan = ( state=initialState, action ) => {
    switch(action.type) {
      case CREATE_PLAN:
      case GET_SINGLE_PLAN:
      case GET_TENOR:
      case GET_EX_RATES:
      case GET_CONTRIB_VAL:
      case GET_PLANS:
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
  
      case GET_PLANS_SUCCESS:
        state = {
          ...state,
          plans: action.payload,
          plansError: null
        }
        break;
  
      case GET_PLANS_ERROR:
        state = {
          ...state,
          plans: null,
          plansError: action.payload
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
  
      case GET_TENOR_SUCCESS:
        state = {
          ...state,
          loading: false,
          tenors: action.payload,
          tenorsError: null
        }
        break;
  
      case GET_TENOR_ERROR:
        state = {
          ...state,
          loading: false,
          tenors: null,
          tenorsError: action.payload
        }
        break;
  
      case GET_EX_RATES_SUCCESS:
        state = {
          ...state,
          loading: false,
          exRates: action.payload,
          exRatesError: null
        }
        break;
  
      case GET_EX_RATES_ERROR:
        state = {
          ...state,
          loading: false,
          exRates: null,
          exRatesError: action.payload
        }
        break;
  
      case GET_CONTRIB_VAL_SUCCESS:
        state = {
          ...state,
          loading: false,
          contribVal: action.payload,
          contribValErr: null
        }
        break;
  
      case GET_CONTRIB_VAL_ERROR:
        state = {
          ...state,
          loading: false,
          contribVal: null,
          contribValErr: action.payload
        }
        break;
  
      default:
        state = { ...state }
        break;
    };
  
    return state;
  };
  
  export default plan;
  