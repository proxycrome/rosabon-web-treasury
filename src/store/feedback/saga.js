import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
	GET_CLOSED_TICKETS,
	GET_OPEN_TICKETS,
	GET_REPLIES,
	GET_SINGLE_TICKET,
	GET_TICKETS,
	POST_FEEDBACK,
	POST_REPLY,
} from "./actionTypes";

import {
	getClosedTicketsError,
	getClosedTicketsSuccess,
	getOpenTicketsError,
	getOpenTicketsSuccess,
	getRepliesError,
	getRepliesSuccess,
	getSingleTicketError,
	getSingleTicketSuccess,
	getTicketsError,
	getTicketsSuccess,
	postFeedbackError,
	postFeedbackSuccess,
	postReplyError,
	postReplySuccess,
} from "./actions";

import {
	getClosedTicketsService,
	getOpenTicketsService,
	getRepliesService,
	getSingleTicketService,
	getTicketsService,
	postFeedbackService,
	postReplyService,
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
		const message = error.response
			? error.response.data.message
				? error.response.data.message
				: error.response.data.response_message
				? error.response.data.response_message
				: "Invalid Credentials"
			: "Network Error";
		if (message) {
			toast.error(message, {
				position: "top-right",
			});
		}
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

function* postReply({ payload: { formData } }) {
	try {
		const response = yield call(postReplyService, formData);
		console.log(response.data);
		yield put(postReplySuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(postReplyError(error?.response?.data));
		const message = error.response
			? error.response.data.message
				? error.response.data.message
				: error.response.data.response_message
				? error.response.data.response_message
				: "Invalid Credentials"
			: "Network Error";
		if (message) {
			toast.error(message, {
				position: "top-right",
			});
		}
	}
}

function* getReplies({ payload: { id } }) {
	try {
		const response = yield call(getRepliesService, id);
		console.log(response.data);
		yield put(getRepliesSuccess(response.data));
	} catch (error) {
		console.log(error?.response?.data);
		yield put(getRepliesError(error?.response?.data));
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

export function* watchPostReply() {
	yield takeEvery(POST_REPLY, postReply);
}

export function* watchGetReplies() {
	yield takeEvery(GET_REPLIES, getReplies);
}

function* FeedbackSaga() {
	yield all([
		fork(watchPostFeedback),
		fork(watchGetTickets),
		fork(watchGetOpenTickets),
        fork(watchGetClosedTickets),
		fork(watchGetSingleTicket),
		fork(watchPostReply),
		fork(watchGetReplies),
	]);
}

export default FeedbackSaga;
