import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
	GET_CLOSED_TICKETS,
	GET_OPEN_TICKETS,
	GET_SINGLE_TICKET,
	GET_TICKETS,
	POST_FEEDBACK,
} from "./actionTypes";

import {
	getClosedTicketsError,
	getClosedTicketsSuccess,
	getOpenTicketsError,
	getOpenTicketsSuccess,
	getSingleTicketError,
	getSingleTicketSuccess,
	getTicketsError,
	getTicketsSuccess,
	postFeedbackError,
	postFeedbackSuccess,
} from "./actions";

import {
	getClosedTicketsService,
	getOpenTicketsService,
	getSingleTicketService,
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

function* getSingleTicket({ payload: { id } }) {
	try {
		const response = yield call(getSingleTicketService, id);
		console.log(response.data);
		yield put(getSingleTicketSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getSingleTicketError(error?.response?.data));
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

export function* watchGetSingleTicket() {
	yield takeEvery(GET_SINGLE_TICKET, getSingleTicket);
}

function* FeedbackSaga() {
	yield all([
		fork(watchPostFeedback),
		fork(watchGetTickets),
		fork(watchGetOpenTickets),
        fork(watchGetClosedTickets),
		fork(watchGetSingleTicket),
	]);
}

export default FeedbackSaga;
