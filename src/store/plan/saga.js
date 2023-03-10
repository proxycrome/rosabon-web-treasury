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
  UPDATE_PLAN,
  TEST_DEBIT_CARD,
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
  updatePlanSuccess,
  updatePlanError,
  // getSinglePlan,
  getPlans,
  testDebitCardSuccess,
  testDebitCardError,
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
  testDebitCardService,
  updatePlanService,
  viewBankDetailService,
} from "../../services/planService";

function* getContribVal() {
  try {
    const response = yield call(getContribValService);
    yield put(getContribValSuccess(response.data));
  } catch (error) {
    yield put(getContribValError(error?.response?.data));
  }
}

function* completeTransfers({ payload: { data } }) {
  const { id, handleShowModalTwo } = data;
  try {
    const response = yield call(completeTransferService, id);
    yield put(completeTransferSuccess(response.data));
    if (response) {
      handleShowModalTwo("modal-two");
    }
  } catch (error) {
    yield put(completeTransferError(error?.response?.data));
  }
}

function* getExRates() {
  try {
    const response = yield call(getExRatesService);
    yield put(getExRatesSuccess(response.data));
  } catch (error) {
    yield put(getExRatesError(error?.response?.data));
  }
}

function* createPlan({ payload: { formData, setShow } }) {
  try {
    const response = yield call(createPlanService, formData);
    yield put(createPlanSuccess(response.data));
    if (response) {
      setShow(true);
      toast.success("Plan Saved", {
        position: "top-right",
      });
    }
  } catch (error) {
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

function* getInvPlans() {
  try {
    const response = yield call(getPlansService);
    yield put(getPlansSuccess(response.data));
  } catch (error) {
    yield put(getPlansError(error?.response?.data));
  }
}

function* getSingleInvPlan({ payload: { id, setShow, source } }) {
  try {
    const response = yield call(getSinglePlanService, id);
    yield put(getSinglePlanSuccess(response.data));
    if (response && source === "planModal") {
      setShow(true);
    }
  } catch (error) {
    yield put(getSinglePlanError(error?.response?.data));
  }
}

function* getTenor({ payload: { formData } }) {
  try {
    const response = yield call(getTenorService, formData);
    yield put(getTenorSuccess(response.data));
  } catch (error) {
    yield put(getTenorError(error?.response?.data));
  }
}

function* getWithholdingTax() {
  try {
    const response = yield call(getWithholdingTaxService);
    yield put(getWithholdingTaxSuccess(response.data));
  } catch (error) {
    yield put(getWithholdingTaxError(error?.response?.data));
  }
}

function* getInvestmentRates() {
  try {
    const response = yield call(getInvestmentRatesService);
    yield put(getInvestmentRatesSuccess(response.data));
  } catch (error) {
    yield put(getInvestmentRatesError(error?.response?.data));
  }
}

function* getEligiblePlans() {
  try {
    const response = yield call(getEligiblePlansService);
    yield put(getEligiblePlansSuccess(response.data));
  } catch (error) {
    yield put(getEligiblePlansError(error?.response?.data));
  }
}

function* deletePlan({ payload: { id } }) {
  try {
    const response = yield call(deletePlanService, id);
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
    yield put(planActionSuccess(response.data));
    if (response) {
      if (planAction === "WITHDRAW") {
        if (
          response.data.message ===
          "There is a pending withdrawal on this plan. Kindly await approval before making another request"
        ) {
          onSuccess(false);
          toast.success(response.data.message, { position: "top-center" });
        } else {
          onSuccess(true);
          toast.success(response.data.message, { position: "top-right" });
        }
      } else if (planAction === "TOP_UP" && paymentType === "BANK_TRANSFER") {
        toast.success("Top-up saved", { position: "top-right" });
        setTimeout(() => {
          window.location.replace("/plan-list");
        }, 2000);
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
    yield put(planActionError(error?.response?.data));
    const message = error?.response?.data?.message;
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
    yield put(getPlanHistorySuccess(response.data));
  } catch (error) {
    yield put(getPlanHistoryError(error?.response?.data));
  }
}

function* getSinglePlanHistory({ payload: { id } }) {
  try {
    const response = yield call(singlePlanHistoryService, id);
    yield put(getSinglePlanHistorySuccess(response.data));
  } catch (error) {
    yield put(getSinglePlanHistoryError(error?.response?.data));
  }
}

function* viewBankDetail({ payload: { id } }) {
  try {
    const response = yield call(viewBankDetailService, id);
    yield put(viewBankDetailSuccess(response.data));
  } catch (error) {
    yield put(viewBankDetailError(error?.response?.data));
  }
}

function* getPenalCharge() {
  try {
    const response = yield call(penalChargeService);
    yield put(getPenalChargeSuccess(response.data));
  } catch (error) {
    yield put(getPenalChargeError(error?.response?.data));
  }
}

function* payWithCard({ payload: { id, setSuccess } }) {
  try {
    const response = yield call(payWithCardService, id);
    yield put(payWithCardSuccess(response.data));
    if (response) {
      setSuccess(true);
    }
  } catch (error) {
    yield put(payWithCardError(error?.response?.data));
  }
}

function* getClosedPlans() {
  try {
    const response = yield call(getClosedPlansService);
    yield put(getClosedPlansSuccess(response.data));
  } catch (error) {
    yield put(getClosedPlansError(error?.response?.data));
  }
}

function* testDebitCard({ payload: { formData } }) {
  try {
    const response = yield call(testDebitCardService, formData);
    yield put(testDebitCardSuccess(response.data));
    if (response) {
      window.open(response.data, "_blank");
    }
  } catch (error) {
    yield put(testDebitCardError(error?.response?.data));
  }
}

function* updatePlan({
  payload: { formData, id, dispatch, action, setShow, setDebitPopup },
}) {
  if (action === "createPlan") {
    var { planId, updateStatus, ...dataObj } = formData;
  }
  try {
    const response = yield call(updatePlanService, dataObj, {
      id,
      updateStatus,
    });
    yield put(updatePlanSuccess(response.data));
    if (response) {
      if (action === "createPlan") {
        setDebitPopup(false);
        setShow(true);
        toast.success(response.data.message, { position: "top-right" });
      } else {
        dispatch(getPlans());
        setTimeout(() => {
          window.location.reload(true);
        }, 1000);
      }
    }
  } catch (error) {
    yield put(updatePlanError(error?.response?.data));
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
  yield takeEvery(GET_PLANS, getInvPlans);
}

export function* watchGetSinglePlan() {
  yield takeEvery(GET_SINGLE_PLAN, getSingleInvPlan);
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

export function* watchUpdatePlan() {
  yield takeEvery(UPDATE_PLAN, updatePlan);
}

export function* watchTestDebitCard() {
  yield takeEvery(TEST_DEBIT_CARD, testDebitCard);
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
    fork(watchUpdatePlan),
    fork(watchTestDebitCard),
  ]);
}

export default PlanSaga;
