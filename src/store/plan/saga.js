import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  CREATE_PLAN,
  DELETE_PLAN,
  GET_CONTRIB_VAL,
  GET_ELIGIBLE_PLANS,
  GET_EX_RATES,
  GET_INVESTMENT_RATES,
  GET_PENAL_CHARGE,
  GET_PLAN_HISTORY,
  GET_PLANS,
  GET_SINGLE_PLAN,
  GET_SINGLE_PLAN_HISTORY,
  GET_TENOR,
  GET_WITHHOLDING_TAX,
  PAY_WITH_CARD,
  PLAN_ACTION,
  VIEW_BANK_DETAIL,
  COMPLETE_TRANSFER,
  GET_CLOSED_PLANS,
} from "./actionTypes";

import {
  createPlanError,
  createPlanSuccess,
  deletePlanError,
  deletePlanSuccess,
  getContribValError,
  getContribValSuccess,
  getEligiblePlansError,
  getEligiblePlansSuccess,
  getExRatesError,
  getExRatesSuccess,
  getInvestmentRatesError,
  getInvestmentRatesSuccess,
  payWithCardError,
  payWithCardSuccess,
  getPenalChargeSuccess,
  getPenalChargeError,
  getPlanHistoryError,
  getPlanHistorySuccess,
  getPlansError,
  getPlansSuccess,
  getSinglePlanError,
  getSinglePlanSuccess,
  getSinglePlanHistoryError,
  getSinglePlanHistorySuccess,
  getTenorError,
  getTenorSuccess,
  getWithholdingTaxError,
  getWithholdingTaxSuccess,
  planActionError,
  planActionSuccess,
  viewBankDetailError,
  viewBankDetailSuccess,
  completeTransferSuccess,
  completeTransferError,
  completeTransfer,
  getClosedPlansSuccess,
  getClosedPlansError,
} from "./actions";

import {
  completeTransferService,
  createPlanService,
  deletePlanService,
  getAllPlanHistoryService,
  getClosedPlansService,
  getContribValService,
  getEligiblePlansService,
  getExRatesService,
  getInvestmentRatesService,
  getPlansService,
  getSinglePlanService,
  getTenorService,
  getWithholdingTaxService,
  payWithCardService,
  penalChargeService,
  planActionService,
  singlePlanHistoryService,
  viewBankDetailService,
} from "../../services/planService";

function* getContribVal() {
  try {
    const response = yield call(getContribValService);
    console.log(response.data);
    yield put(getContribValSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getContribValError(error?.response?.data));
  }
}

function* completeTransfers({ payload: { data } }) {
  const { id, handleShowModalTwo } = data;
  try {
    const response = yield call(completeTransferService, id);
    console.log(response.data);
    yield put(completeTransferSuccess(response.data));
    if (response) {
      handleShowModalTwo("modal-two");
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(completeTransferError(error?.response?.data));
  }
}

function* getExRates() {
  try {
    const response = yield call(getExRatesService);
    console.log(response.data);
    yield put(getExRatesSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getExRatesError(error?.response?.data));
  }
}

function* createPlan({ payload: { formData, setShow } }) {
  try {
    const response = yield call(createPlanService, formData);
    console.log(response.data);
    yield put(createPlanSuccess(response.data));
    if (response) {
      setShow(true);
    }
  } catch (error) {
    console.log(error?.response?.data);
    const message = error?.response?.data
      ? error?.response?.data?.message
      : "Unable to create plan";

    yield put(createPlanError(error?.response?.data));
    if (message) {
      toast.error(message, {
        position: "top-right",
      });
    }
  }
}

function* getPlans() {
  try {
    const response = yield call(getPlansService);
    console.log(response.data);
    yield put(getPlansSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getPlansError(error?.response?.data));
  }
}

function* getSinglePlan({ payload: { id } }) {
  try {
    const response = yield call(getSinglePlanService, id);
    console.log(response.data);
    yield put(getSinglePlanSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getSinglePlanError(error?.response?.data));
  }
}

function* getTenor({ payload: { formData } }) {
  try {
    const response = yield call(getTenorService, formData);
    console.log(response.data);
    yield put(getTenorSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getTenorError(error?.response?.data));
  }
}

function* getWithholdingTax() {
  try {
    const response = yield call(getWithholdingTaxService);
    console.log(response.data);
    yield put(getWithholdingTaxSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getWithholdingTaxError(error?.response?.data));
  }
}

function* getInvestmentRates() {
  try {
    const response = yield call(getInvestmentRatesService);
    console.log(response.data);
    yield put(getInvestmentRatesSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getInvestmentRatesError(error?.response?.data));
  }
}

function* getEligiblePlans() {
  try {
    const response = yield call(getEligiblePlansService);
    console.log(response.data);
    yield put(getEligiblePlansSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getEligiblePlansError(error?.response?.data));
  }
}

function* deletePlan({ payload: { id } }) {
  try {
    const response = yield call(deletePlanService, id);
    console.log(response.data);
    yield put(deletePlanSuccess(response.data));
    if (response) {
      toast.success(
        "Plan would be removed after temporary bank details expires.",
        {
          position: "top-right",
        }
      );
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(deletePlanError(error?.response?.data));
    const message = error?.response?.data?.message
      ? error?.response?.data?.message
      : "Unable to delete plan";
    if (message) {
      toast.error(message, {
        position: "top-right",
      });
    }
  }
}

function* planAction({
  payload: {
    formData,
    onSuccess,
    handleShowModalTwo,
    dispatch,
    setDebitPopup,
    rolloverType,
  },
}) {
  const { planAction, paymentType } = formData;
  try {
    const response = yield call(planActionService, formData);
    console.log(response.data);
    yield put(planActionSuccess(response.data));
    if (response) {
      if (planAction === "WITHDRAW") {
        onSuccess(true);
        toast.success(response.data.message);
      } else if (planAction === "TOP_UP" && paymentType === "BANK_TRANSFER") {
        toast.success("Top-up saved", { position: "top-right" });
        setTimeout(() => {
          console.log("saved");
        }, 2000);
        window.location.replace("/plan-list");
      } else if (planAction === "TOP_UP" && paymentType === "DEBIT_CARD") {
        setDebitPopup(false);
        onSuccess(true);
      } else if (planAction === "TRANSFER") {
        const data = {
          id: response.data.object.actionLogId,
          handleShowModalTwo,
        };
        dispatch(completeTransfer(data));
      } else if (planAction === "ROLLOVER") {
        if (rolloverType === "part") {
          onSuccess(true);
          toast.success(response.data.message, { position: "top-right" });
        } else if (rolloverType === "full") {
          handleShowModalTwo();
          toast.success(response.data.message, { position: "top-right" });
        }
      }
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(planActionError(error?.response?.data));
    const message = error?.response?.data
      ? error?.response?.data?.message
      : "Unable to Withdraw";
    if (message) {
      if (planAction === "TOP_UP" && paymentType === "BANK_TRANSFER") {
        toast.error(message, { position: "top-right" });
        window.location.replace("/plan-list");
      } else {
        toast.error(message, {
          position: "top-right",
        });
      }
    }
  }
}

function* getPlanHistory() {
  try {
    const response = yield call(getAllPlanHistoryService);
    console.log(response.data);
    yield put(getPlanHistorySuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getPlanHistoryError(error?.response?.data));
  }
}

function* getSinglePlanHistory({ payload: { id } }) {
  try {
    const response = yield call(singlePlanHistoryService, id);
    console.log(response.data);
    yield put(getSinglePlanHistorySuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getSinglePlanHistoryError(error?.response?.data));
  }
}

function* viewBankDetail({ payload: { id } }) {
  try {
    const response = yield call(viewBankDetailService, id);
    console.log(response.data);
    yield put(viewBankDetailSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(viewBankDetailError(error?.response?.data));
  }
}

function* getPenalCharge() {
  try {
    const response = yield call(penalChargeService);
    console.log(response.data);
    yield put(getPenalChargeSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getPenalChargeError(error?.response?.data));
  }
}

function* payWithCard({ payload: { id, setSuccess } }) {
  try {
    const response = yield call(payWithCardService, id);
    console.log(response.data);
    yield put(payWithCardSuccess(response.data));
    if (response) {
      setSuccess(true);
    }
  } catch (error) {
    console.log(error?.response?.data);
    yield put(payWithCardError(error?.response?.data));
  }
}

function* getClosedPlans() {
  try {
    const response = yield call(getClosedPlansService);
    console.log(response.data);
    yield put(getClosedPlansSuccess(response.data));
  } catch (error) {
    console.log(error?.response?.data);
    yield put(getClosedPlansError(error?.response?.data));
  }
}

export function* watchGetContribVal() {
  yield takeEvery(GET_CONTRIB_VAL, getContribVal);
}

export function* watchGetExRates() {
  yield takeEvery(GET_EX_RATES, getExRates);
}

export function* watchCreatePlan() {
  yield takeEvery(CREATE_PLAN, createPlan);
}

export function* watchGetPlans() {
  yield takeEvery(GET_PLANS, getPlans);
}

export function* watchGetSinglePlan() {
  yield takeEvery(GET_SINGLE_PLAN, getSinglePlan);
}

export function* watchGetTenor() {
  yield takeEvery(GET_TENOR, getTenor);
}

export function* watchGetWithholdingTax() {
  yield takeEvery(GET_WITHHOLDING_TAX, getWithholdingTax);
}

export function* watchGetInvestmentRates() {
  yield takeEvery(GET_INVESTMENT_RATES, getInvestmentRates);
}

export function* watchGetEligiblePlans() {
  yield takeEvery(GET_ELIGIBLE_PLANS, getEligiblePlans);
}
export function* watchDeletePlan() {
  yield takeEvery(DELETE_PLAN, deletePlan);
}

export function* watchPlanAction() {
  yield takeEvery(PLAN_ACTION, planAction);
}

export function* watchGetPlanHistory() {
  yield takeEvery(GET_PLAN_HISTORY, getPlanHistory);
}

export function* watchGetSinglePlanHistory() {
  yield takeEvery(GET_SINGLE_PLAN_HISTORY, getSinglePlanHistory);
}

export function* watchViewBankDetail() {
  yield takeEvery(VIEW_BANK_DETAIL, viewBankDetail);
}

export function* watchGetPenalCharge() {
  yield takeEvery(GET_PENAL_CHARGE, getPenalCharge);
}

export function* watchPayWithCard() {
  yield takeEvery(PAY_WITH_CARD, payWithCard);
}

export function* watchCompleteTransfer() {
  yield takeEvery(COMPLETE_TRANSFER, completeTransfers);
}

export function* watchGetClosedPlans() {
  yield takeEvery(GET_CLOSED_PLANS, getClosedPlans);
}

function* PlanSaga() {
  yield all([
    fork(watchGetContribVal),
    fork(watchGetExRates),
    fork(watchCreatePlan),
    fork(watchGetPlans),
    fork(watchGetSinglePlan),
    fork(watchGetTenor),
    fork(watchGetWithholdingTax),
    fork(watchGetInvestmentRates),
    fork(watchGetEligiblePlans),
    fork(watchDeletePlan),
    fork(watchPlanAction),
    fork(watchGetPlanHistory),
    fork(watchGetSinglePlanHistory),
    fork(watchViewBankDetail),
    fork(watchGetPenalCharge),
    fork(watchPayWithCard),
    fork(watchCompleteTransfer),
    fork(watchGetClosedPlans),
  ]);
}

export default PlanSaga;
