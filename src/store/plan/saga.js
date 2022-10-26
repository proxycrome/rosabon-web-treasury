import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
	CREATE_PLAN,
	DELETE_PLAN,
	GET_CONTRIB_VAL,
	GET_ELIGIBLE_PLANS,
	GET_EX_RATES,
	GET_INVESTMENT_RATES,
	GET_PLANS,
    GET_SINGLE_PLAN,
    GET_TENOR,
	GET_WITHHOLDING_TAX,
	PLAN_ACTION,
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
	getPlansError,
	getPlansSuccess,
	getSinglePlanError,
	getSinglePlanSuccess,
    getTenorError,
    getTenorSuccess,
	getWithholdingTaxError,
	getWithholdingTaxSuccess,
	planActionError,
	planActionSuccess,
} from "./actions";

import {
	createPlanService,
	deletePlanService,
	getContribValService,
	getEligiblePlansService,
	getExRatesService,
	getInvestmentRatesService,
	getPlansService,
	getSinglePlanService,
    getTenorService,
	getWithholdingTaxService,
	planActionService,
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
		const message = error?.response?.data ? error?.response?.data?.message : 
		"Unable to create plan"
		
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
		toast.success("Plan Successfully removed", {
			position: "top-right",
		});
		
	} catch (error) {
		console.log(error?.response?.data);
		yield put(deletePlanError(error?.response?.data));
		const message = error?.response?.data ? error?.response?.data?.message : 
		"Unable to create plan"
		if (message) {
			toast.error(message, {
				position: "top-right",
			});
		}
	}
};

function* planAction({ payload: { formData } }) {
	try {
		const response = yield call(planActionService, formData);
		console.log(response.data);
		yield put(planActionSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(planActionError(error?.response?.data));
		const message = error?.response?.data ? error?.response?.data?.message : 
		"Unable to Withdraw"
		if (message) {
			toast.error(message, {
				position: "top-right",
			});
		}
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
};

export function* watchPlanAction() {
	yield takeEvery(PLAN_ACTION, planAction);
};

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
	]);
}

export default PlanSaga;
