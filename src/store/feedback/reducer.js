import {
    POST_FEEDBACK,
    POST_FEEDBACK_SUCCESS,
    POST_FEEDBACK_ERROR,
    GET_TICKETS,
    GET_TICKETS_SUCCESS,
    GET_TICKETS_ERROR,
    GET_TICKET_CATEGORIES,
    GET_TICKET_CATEGORIES_SUCCESS,
    GET_TICKET_CATEGORIES_ERROR,
    GET_OPEN_TICKETS,
    GET_OPEN_TICKETS_SUCCESS,
    GET_OPEN_TICKETS_ERROR,
    GET_CLOSED_TICKETS,
    GET_CLOSED_TICKETS_SUCCESS,
    GET_CLOSED_TICKETS_ERROR,
    GET_SINGLE_TICKET,
    GET_SINGLE_TICKET_SUCCESS,
    GET_SINGLE_TICKET_ERROR,
    POST_REPLY,
    POST_REPLY_SUCCESS,
    POST_REPLY_ERROR,
    GET_REPLIES,
    GET_REPLIES_SUCCESS,
    GET_REPLIES_ERROR
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
    single_ticket: null,
    single_ticket_error: null,
    post_reply: null,
    post_reply_err: null,
    replies: null,
    replies_err: null,
    categories: null,
    categories_err: null
  }
  
  const feedback = ( state=initialState, action ) => {
    switch(action.type) {
      case POST_FEEDBACK:
      case GET_TICKETS:
      case GET_OPEN_TICKETS:
      case GET_CLOSED_TICKETS:
      case GET_SINGLE_TICKET:
      case POST_REPLY:
      case GET_REPLIES:
      case GET_TICKET_CATEGORIES:
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
      
      case GET_SINGLE_TICKET_SUCCESS:
        state = {
          ...state,
          loading: false,
          single_ticket: action.payload,
          single_ticket_error: null
        };
        break;

      case GET_SINGLE_TICKET_ERROR:
        state = {
          ...state,
          loading: false,
          single_ticket: null,
          single_ticket_error: action.payload
        };
        break;

      case POST_REPLY_SUCCESS:
        state = {
          ...state,
          loading: false,
          post_reply: action.payload,
          post_reply_err: null
        };
        break;

      case POST_REPLY_ERROR:
        state = {
          ...state,
          loading: false,
          post_reply: null,
          post_reply_err: action.payload
        };
        break;

      case GET_REPLIES_SUCCESS:
        state = {
          ...state,
          loading: false,
          replies: action.payload,
          replies_err: null
        };
        break;

      case GET_REPLIES_ERROR:
        state = {
          ...state,
          loading: false,
          replies: null,
          replies_err: action.payload
        };
        break;

      case GET_TICKET_CATEGORIES_SUCCESS:
        state = {
          ...state,
          loading: false,
          categories: action.payload,
          categories_err: null
        };
        break;

      case GET_TICKET_CATEGORIES_ERROR:
        state = {
          ...state,
          loading: false,
          categories: null,
          categories_err: action.payload
        };
        break;
  
      default:
        state = { ...state }
        break;
    }
  
    return state;
  }
  
  export default feedback;