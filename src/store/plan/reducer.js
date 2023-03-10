import { LOGOUT_USER_SUCCESS } from "../auth/actionTypes";
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
  GET_PLANS_ERROR,
  GET_WITHHOLDING_TAX,
  GET_WITHHOLDING_TAX_SUCCESS,
  GET_WITHHOLDING_TAX_ERROR,
  GET_INVESTMENT_RATES,
  GET_INVESTMENT_RATES_SUCCESS,
  GET_INVESTMENT_RATES_ERROR,
  GET_ELIGIBLE_PLANS,
  GET_ELIGIBLE_PLANS_SUCCESS,
  GET_ELIGIBLE_PLANS_ERROR,
  PAY_WITH_CARD,
  PAY_WITH_CARD_ERROR,
  PAY_WITH_CARD_SUCCESS,
  PLAN_ACTION,
  PLAN_ACTION_ERROR,
  PLAN_ACTION_SUCCESS,
  GET_PENAL_CHARGE,
  GET_PENAL_CHARGE_ERROR,
  GET_PENAL_CHARGE_SUCCESS,
  GET_PLAN_HISTORY,
  GET_PLAN_HISTORY_SUCCESS,
  GET_PLAN_HISTORY_ERROR,
  GET_SINGLE_PLAN_HISTORY,
  GET_SINGLE_PLAN_HISTORY_SUCCESS,
  GET_SINGLE_PLAN_HISTORY_ERROR,
  VIEW_BANK_DETAIL,
  VIEW_BANK_DETAIL_SUCCESS,
  VIEW_BANK_DETAIL_ERROR,
  COMPLETE_TRANSFER,
  COMPLETE_TRANSFER_SUCCESS,
  COMPLETE_TRANSFER_ERROR,
  DELETE_PLAN,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_ERROR,
  GET_CLOSED_PLANS,
  GET_CLOSED_PLANS_SUCCESS,
  GET_CLOSED_PLANS_ERROR,
  UPDATE_PLAN,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_ERROR,
  TEST_DEBIT_CARD,
  TEST_DEBIT_CARD_SUCCESS,
  TEST_DEBIT_CARD_ERROR,
  CLEAR_NEW_PLAN,
} from "./actionTypes";

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
  contribValErr: null,
  withholding_tax: null,
  withholding_tax_error: null,
  investment_rates: null,
  investment_rates_err: null,
  eligiblePlans: null,
  eligiblePlansError: null,
  plan_action: null,
  plan_action_error: null,
  plan_history: null,
  plan_history_error: null,
  single_plan_history: null,
  single_plan_history_err: null,
  bank_detail: null,
  bank_detail_err: null,
  penal_charge: null,
  penal_charge_error: null,
  pay_with_card: null,
  pay_with_card_err: null,
  transferSuccess: null,
  transferError: null,
  deletePlanMsg: null,
  deletePlanError: null,
  closed_plans: null,
  closed_plans_error: null,
  plan_update: null,
  plan_update_err: null,
  card_test_msg: null,
  card_test_error: null,
};

const plan = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PLAN:
    case GET_SINGLE_PLAN:
    case GET_TENOR:
    case GET_EX_RATES:
    case GET_CONTRIB_VAL:
    case GET_PLANS:
    case GET_WITHHOLDING_TAX:
    case GET_INVESTMENT_RATES:
    case GET_ELIGIBLE_PLANS:
    case PLAN_ACTION:
    case GET_PLAN_HISTORY:
    case GET_SINGLE_PLAN_HISTORY:
    case VIEW_BANK_DETAIL:
    case GET_PENAL_CHARGE:
    case PAY_WITH_CARD:
    case COMPLETE_TRANSFER:
    case DELETE_PLAN:
    case GET_CLOSED_PLANS:
    case UPDATE_PLAN:
    case TEST_DEBIT_CARD:
      state = {
        ...state,
        loading: true,
      };
      break;

    case CREATE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        newPlan: action.payload,
        newPlanError: null,
      };
      break;

    case CREATE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        newPlan: null,
        newPlanError: action.payload,
      };
      break;

    case CLEAR_NEW_PLAN:
      state = {
        ...state,
        newPlan: null,
        newPlanError: null,
      };
      break;

    case GET_PLANS_SUCCESS:
      state = {
        ...state,
        loading: false,
        plans: action.payload,
        plansError: null,
      };
      break;

    case GET_PLANS_ERROR:
      state = {
        ...state,
        loading: false,
        plans: null,
        plansError: action.payload,
      };
      break;

    case GET_SINGLE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        singlePlan: action.payload,
        singlePlanError: null,
      };
      break;

    case GET_SINGLE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        singlePlan: null,
        singlePlanError: action.payload,
      };
      break;

    case GET_TENOR_SUCCESS:
      state = {
        ...state,
        loading: false,
        tenors: action.payload,
        tenorsError: null,
      };
      break;

    case GET_TENOR_ERROR:
      state = {
        ...state,
        loading: false,
        tenors: null,
        tenorsError: action.payload,
      };
      break;

    case GET_EX_RATES_SUCCESS:
      state = {
        ...state,
        loading: false,
        exRates: action.payload,
        exRatesError: null,
      };
      break;

    case GET_EX_RATES_ERROR:
      state = {
        ...state,
        loading: false,
        exRates: null,
        exRatesError: action.payload,
      };
      break;

    case GET_CONTRIB_VAL_SUCCESS:
      state = {
        ...state,
        loading: false,
        contribVal: action.payload,
        contribValErr: null,
      };
      break;

    case GET_CONTRIB_VAL_ERROR:
      state = {
        ...state,
        loading: false,
        contribVal: null,
        contribValErr: action.payload,
      };
      break;

    case GET_WITHHOLDING_TAX_SUCCESS:
      state = {
        ...state,
        loading: false,
        withholding_tax: action.payload,
        withholding_tax_error: null,
      };
      break;

    case GET_WITHHOLDING_TAX_ERROR:
      state = {
        ...state,
        loading: false,
        withholding_tax: null,
        withholding_tax_error: action.payload,
      };
      break;

    case GET_INVESTMENT_RATES_SUCCESS:
      state = {
        ...state,
        loading: false,
        investment_rates: action.payload,
        investment_rates_err: null,
      };
      break;

    case GET_INVESTMENT_RATES_ERROR:
      state = {
        ...state,
        loading: false,
        investment_rates: null,
        investment_rates_err: action.payload,
      };
      break;

    case GET_ELIGIBLE_PLANS_SUCCESS:
      state = {
        ...state,
        loading: false,
        eligiblePlans: action.payload,
        eligiblePlansError: null,
      };
      break;

    case GET_ELIGIBLE_PLANS_ERROR:
      state = {
        ...state,
        loading: false,
        eligiblePlans: null,
        eligiblePlansError: action.payload,
      };
      break;

    case PLAN_ACTION_SUCCESS:
      state = {
        ...state,
        loading: false,
        plan_action: action.payload,
        plan_action_error: null,
      };
      break;

    case PLAN_ACTION_ERROR:
      state = {
        ...state,
        loading: false,
        plan_action: null,
        plan_action_error: action.payload,
      };
      break;

    case GET_PLAN_HISTORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        plan_history: action.payload,
        plan_history_error: null,
      };
      break;

    case GET_PLAN_HISTORY_ERROR:
      state = {
        ...state,
        loading: false,
        plan_history: null,
        plan_history_error: action.payload,
      };
      break;

    case GET_SINGLE_PLAN_HISTORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        single_plan_history: action.payload,
        single_plan_history_err: null,
      };
      break;

    case GET_SINGLE_PLAN_HISTORY_ERROR:
      state = {
        ...state,
        loading: false,
        single_plan_history: null,
        single_plan_history_err: action.payload,
      };
      break;

    case VIEW_BANK_DETAIL_SUCCESS:
      state = {
        ...state,
        loading: false,
        bank_detail: action.payload,
        bank_detail_err: null,
      };
      break;

    case VIEW_BANK_DETAIL_ERROR:
      state = {
        ...state,
        loading: false,
        bank_detail: null,
        bank_detail_err: action.payload,
      };
      break;

    case GET_PENAL_CHARGE_SUCCESS:
      state = {
        ...state,
        loading: false,
        penal_charge: action.payload,
        penal_charge_error: null,
      };
      break;

    case GET_PENAL_CHARGE_ERROR:
      state = {
        ...state,
        loading: false,
        penal_charge: null,
        penal_charge_error: action.payload,
      };
      break;

    case PAY_WITH_CARD_SUCCESS:
      state = {
        ...state,
        loading: false,
        pay_with_card: action.payload,
        pay_with_card_err: null,
      };
      break;

    case PAY_WITH_CARD_ERROR:
      state = {
        ...state,
        loading: false,
        pay_with_card: null,
        pay_with_card_err: action.payload,
      };
      break;

    case COMPLETE_TRANSFER_SUCCESS:
      state = {
        ...state,
        loading: false,
        transferSuccess: action.payload,
        transferError: null,
      };
      break;

    case COMPLETE_TRANSFER_ERROR:
      state = {
        ...state,
        loading: false,
        transferSuccess: null,
        transferError: action.payload,
      };
      break;

    case DELETE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        deletePlanMsg: action.payload,
        deletePlanError: null,
      };
      break;

    case DELETE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        deletePlanMsg: null,
        deletePlanError: action.payload,
      };
      break;

    case GET_CLOSED_PLANS_SUCCESS:
      state = {
        ...state,
        loading: false,
        closed_plans: action.payload,
        closed_plans_error: null,
      };
      break;

    case GET_CLOSED_PLANS_ERROR:
      state = {
        ...state,
        loading: false,
        closed_plans: null,
        closed_plans_error: action.payload,
      };
      break;

    case UPDATE_PLAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        plan_update: action.payload,
        plan_update_err: null,
      };
      break;

    case UPDATE_PLAN_ERROR:
      state = {
        ...state,
        loading: false,
        plan_update: null,
        plan_update_err: action.payload,
      };
      break;

    case TEST_DEBIT_CARD_SUCCESS:
      state = {
        ...state,
        loading: false,
        card_test_msg: action.payload,
        card_test_error: null,
      };
      break;

    case TEST_DEBIT_CARD_ERROR:
      state = {
        ...state,
        loading: false,
        card_test_msg: null,
        card_test_error: action.payload,
      };
      break;

    case LOGOUT_USER_SUCCESS:
      state = initialState;
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default plan;
