import { takeEvery, fork, put, all, call } from "redux-saga/effects";
import toast from "react-hot-toast";

import {
  GET_CLOSED_TICKETS,
  GET_OPEN_TICKETS,
  GET_REPLIES,
  GET_SINGLE_TICKET,
  GET_TICKETS,
  GET_TICKET_CATEGORIES,
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
  getTicketCategoriesSuccess,
  getTicketCategoriesError,
  postFeedbackError,
  postFeedbackSuccess,
  postReplyError,
  postReplySuccess,
  getReplies,
} from "./actions";

import {
  getClosedTicketsService,
  getOpenTicketsService,
  getRepliesService,
  getSingleTicketService,
  getTicketsService,
  getTicketCategoriesService,
  postFeedbackService,
  postReplyService,
} from "../../services/feedbackService";

function* postFeedback({ payload: { formData, setShow } }) {
  try {
    const response = yield call(postFeedbackService, formData);
    yield put(postFeedbackSuccess(response.data));
    if (response) {
      setShow(true);
    }
  } catch (error) {
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
    yield put(getTicketsSuccess(response.data));
  } catch (error) {
    yield put(getTicketsError(error?.response?.data));
  }
}

function* getOpenTickets() {
  try {
    const response = yield call(getOpenTicketsService);
    yield put(getOpenTicketsSuccess(response.data));
  } catch (error) {
    yield put(getOpenTicketsError(error?.response?.data));
  }
}

function* getClosedTickets() {
  try {
    const response = yield call(getClosedTicketsService);
    yield put(getClosedTicketsSuccess(response.data));
  } catch (error) {
    yield put(getClosedTicketsError(error?.response?.data));
  }
}

function* getSingleTicket({ payload: { id } }) {
  try {
    const response = yield call(getSingleTicketService, id);
    yield put(getSingleTicketSuccess(response.data));
  } catch (error) {
    yield put(getSingleTicketError(error?.response?.data));
  }
}

function* postReply({ payload: { formData, dispatch } }) {
  try {
    const response = yield call(postReplyService, formData);
    yield put(postReplySuccess(response.data));
    if (response) {
      dispatch(getReplies(formData.ticketId));
    }
  } catch (error) {
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

function* getFeedReplies({ payload: { id } }) {
  try {
    const response = yield call(getRepliesService, id);
    yield put(getRepliesSuccess(response.data));
  } catch (error) {
    yield put(getRepliesError(error?.response?.data));
  }
}

function* getTicketCategories() {
  try {
    const response = yield call(getTicketCategoriesService);
    yield put(getTicketCategoriesSuccess(response.data));
  } catch (error) {
    yield put(getTicketCategoriesError(error?.response?.data));
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
  yield takeEvery(GET_REPLIES, getFeedReplies);
}

export function* watchGetTicketCategories() {
  yield takeEvery(GET_TICKET_CATEGORIES, getTicketCategories);
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
    fork(watchGetTicketCategories),
  ]);
}

export default FeedbackSaga;
