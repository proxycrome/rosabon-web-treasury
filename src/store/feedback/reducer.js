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
  } from "./actionTypes";
  
  const initialState = {
    loading: false,
    posted_feedback: null,
    posted_feedback_err: null,
    my_tickets: null,
    my_tickets_err: null,
    open_tickets: null,
    open_tickets_err: null,
    closed_tickets: null,
    closed_tickets_err: null,
  }
  
  const feedback = ( state=initialState, action ) => {
    switch(action.type) {
      case POST_FEEDBACK:
      case GET_TICKETS:
      case GET_OPEN_TICKETS:
      case GET_CLOSED_TICKETS:
        state = {
          ...state,
          loading: true
        }
        break;
  
      case POST_FEEDBACK_SUCCESS:
        state = {
          ...state,
          loading: false,
          posted_feedback: action.payload,
          posted_feedback_err: null
        }
        break;
  
      case POST_FEEDBACK_ERROR:
        state = {
          ...state,
          loading: false,
          posted_feedback: null,
          posted_feedback_err: action.payload
        }
        break;
      
      case GET_TICKETS_SUCCESS:
        state = {
          ...state,
          loading: false,
          my_tickets: action.payload,
          my_tickets_err: null
        }
        break;
  
      case GET_TICKETS_ERROR:
        state = {
          ...state,
          loading: false,
          my_tickets: null,
          my_tickets_err: action.payload
        }
        break;
  
      case GET_OPEN_TICKETS_SUCCESS:
        state = {
          ...state,
          loading: false,
          open_tickets: action.payload,
          open_tickets_err: null
        }
        break;
  
      case GET_OPEN_TICKETS_ERROR:
        state = {
          ...state,
          loading: false,
          open_tickets: null,
          open_tickets_err: action.payload
        }
        break;
  
      case GET_CLOSED_TICKETS_SUCCESS:
        state = {
          ...state,
          loading: false,
          closed_tickets: action.payload,
          closed_tickets_err: null
        }
        break;
      
      case GET_CLOSED_TICKETS_ERROR:
        state = {
          ...state,
          loading: false,
          closed_tickets: null,
          closed_tickets_err: action.payload
        }
        break;
  
      default:
        state = { ...state }
        break;
    }
  
    return state;
  }
  
  export default feedback;