import {
  POST_FEEDBACK,
  POST_FEEDBACK_SUCCESS,
  POST_FEEDBACK_ERROR,
  GET_TICKETS,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_ERROR,
  GET_OPEN_TICKETS,
  GET_OPEN_TICKETS_SUCCESS,
  GET_OPEN_TICKETS_ERROR,
  GET_CLOSED_TICKETS,
  GET_CLOSED_TICKETS_SUCCESS,
  GET_CLOSED_TICKETS_ERROR
} from '../../constant/feedbackActionTypes';
import { 
  post_feedback, 
  get_tickets, 
  get_open_tickets, 
  get_closed_tickets 
} from '../../api/feedback/feedback.api';

export const postFeedback = (dataObj) => async (dispatch) => {
  dispatch({ type:POST_FEEDBACK });
  const { formData, errorObj } = await post_feedback(dataObj);

  if (formData) {
    dispatch({ type: POST_FEEDBACK_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: POST_FEEDBACK_ERROR, payload: errorObj });
  }
}

export const getTickets = () => async (dispatch) => {
  dispatch({ type:GET_TICKETS });
  const { formData, errorObj } = await get_tickets();

  if (formData) {
    dispatch({ type: GET_TICKETS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_TICKETS_ERROR, payload: errorObj });
  }
}

export const getOpenTickets = () => async (dispatch) => {
  dispatch({ type:GET_OPEN_TICKETS });
  const { formData, errorObj } = await get_open_tickets();

  if (formData) {
    dispatch({ type: GET_OPEN_TICKETS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_OPEN_TICKETS_ERROR, payload: errorObj });
  }
}

export const getClosedTickets = () => async (dispatch) => {
  dispatch({ type:GET_CLOSED_TICKETS });
  const { formData, errorObj } = await get_closed_tickets();

  if (formData) {
    dispatch({ type: GET_CLOSED_TICKETS_SUCCESS, payload: formData });
  }

  if (errorObj) {
    dispatch({ type: GET_CLOSED_TICKETS_ERROR, payload: errorObj });
  }
}