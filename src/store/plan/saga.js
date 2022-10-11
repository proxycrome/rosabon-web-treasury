import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
	CREATE_PLAN,
	GET_CONTRIB_VAL,
	GET_EX_RATES,
	GET_PLANS,
    GET_SINGLE_PLAN,
    GET_TENOR,
} from "./actionTypes";

import {
	createPlanError,
	createPlanSuccess,
	getContribValError,
	getContribValSuccess,
	getExRatesError,
	getExRatesSuccess,
	getPlansError,
	getPlansSuccess,
	getSinglePlanError,
	getSinglePlanSuccess,
    getTenorError,
    getTenorSuccess,
} from "./actions";

import {
	createPlanService,
	getContribValService,
	getExRatesService,
	getPlansService,
	getSinglePlanService,
    getTenorService,
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

function* PlanSaga() {
	yield all([
		fork(watchGetContribVal),
		fork(watchGetExRates),
		fork(watchCreatePlan),
		fork(watchGetPlans),
		fork(watchGetSinglePlan),
		fork(watchGetTenor),
	]);
}

export default PlanSaga;
