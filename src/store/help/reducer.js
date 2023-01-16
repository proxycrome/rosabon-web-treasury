import { LOGOUT_USER_SUCCESS } from "../auth/actionTypes";
import { GET_FAQ, GET_FAQ_ERROR, GET_FAQ_SUCCESS } from "./actionTypes";

const initialState = {
  loading: false,
  faqs: null,
  faqError: null,
};

const help = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAQ:
      state = {
        ...state,
        loading: true,
        faqs: null,
        faqError: null,
      };
      break;

    case GET_FAQ_SUCCESS:
      state = {
        ...state,
        loading: false,
        faqs: action.payload,
        faqError: null,
      };
      break;

    case GET_FAQ_ERROR:
      state = {
        ...state,
        loading: false,
        faqs: null,
        faqError: action.payload,
      };
      break;

    case LOGOUT_USER_SUCCESS:
      state = initialState;
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default help;
