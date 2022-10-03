import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
	GET_CLOSED_TICKETS,
	GET_OPEN_TICKETS,
	GET_TICKETS,
	POST_FEEDBACK,
} from "./actionTypes";

import {
	getClosedTicketsError,
	getClosedTicketsSuccess,
	getOpenTicketsError,
	getOpenTicketsSuccess,
	getTicketsError,
	getTicketsSuccess,
	postFeedbackError,
	postFeedbackSuccess,
} from "./actions";

import {
	getClosedTicketsService,
	getOpenTicketsService,
	getTicketsService,
	postFeedbackService,
} from "../../services/feedbackService";

function* postFeedback({ payload: { formData, setShow } }) {
	try {
		const response = yield call(postFeedbackService, formData);
		console.log(response.data);
		yield put(postFeedbackSuccess(response.data));
		if (response) {
			setShow(true);
		}
	} catch (error) {
		console.log(error?.response?.data);
		yield put(postFeedbackError(error?.response?.data));
	}
}

function* getTickets() {
	try {
		const response = yield call(getTicketsService);
		console.log(response.data);
		yield put(getTicketsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getTicketsError(error?.response?.data));
	}
}

function* getOpenTickets() {
	try {
		const response = yield call(getOpenTicketsService);
		console.log(response.data);
		yield put(getOpenTicketsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getOpenTicketsError(error?.response?.data));
	}
}

function* getClosedTickets() {
	try {
		const response = yield call(getClosedTicketsService);
		console.log(response.data);
		yield put(getClosedTicketsSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getClosedTicketsError(error?.response?.data));
	}
}

export function* watchPostFeedback() {
	yield takeEvery(POST_FEEDBACK, postFeedback);
}

export function* watchGetTickets() {
	yield takeEvery(GET_TICKETS, getTickets);
}

export function* watchGetOpenTickets() {
	yield takeEvery(GET_OPEN_TICKETS, getOpenTickets);
}

export function* watchGetClosedTickets() {
	yield takeEvery(GET_CLOSED_TICKETS, getClosedTickets);
}

function* FeedbackSaga() {
	yield all([
		fork(watchPostFeedback),
		fork(watchGetTickets),
		fork(watchGetOpenTickets),
        fork(watchGetClosedTickets)
	]);
}

export default FeedbackSaga;
