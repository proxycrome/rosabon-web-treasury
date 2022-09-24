import { CLOSE_MODAL } from '../constant/auth';
import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  CLEAR_MESSAGES,
  PUT_CONTACT_DETAILS,
  PUT_CONTACT_DETAILS_ERROR,
  PUT_CONTACT_DETAILS_SUCCESS,
  PUT_PERSONAL_DOCUMENTS,
  PUT_PERSONAL_DOCUMENTS_ERROR,
  PUT_PERSONAL_DOCUMENTS_SUCCESS,
  PUT_PERSONAL_INFO,
  PUT_PERSONAL_INFO_ERROR,
  PUT_PERSONAL_INFO_SUCCESS,
  VALIDATE_PHONE_OTP,
  VALIDATE_PHONE_OTP_ERROR,
  VALIDATE_PHONE_OTP_SUCCESS,
  VERIFY_ACCOUNT_NO,
  VERIFY_ACCOUNT_NO_ERROR,
  VERIFY_ACCOUNT_NO_SUCCESS,
  VERIFY_PHONE,
  VERIFY_PHONE_ERROR,
  VERIFY_PHONE_SUCCESS,
} from '../constant/updateProfileActionTypes';

const initialState = {
  loading: false,
  phoneMsg: null,
  phoneMsgError: null,
  contactMsg: null,
  contactMsgError: null,
  personalInfoMsg: null,
  personalInfoMsgError: null,
  infoSuccess: false,
  showPhoneOtpModal: false,
  validatePhone: null,
  validatePhoneError: null,
  accountDetail: null,
  accountDetailError: null,
  showAccountValidErrorModal: false,
  passChangeMsg: null,
  passChangeError: null,
  docMsg: null,
  docMsgError: null,
};

const updateProfile = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_PHONE:
      state = {
        ...state,
        loading: true,
      };
      break;

    case VERIFY_PHONE_SUCCESS:
      state = {
        ...state,
        loading: false,
        phoneMsg: action.payload,
        phoneMsgError: null,
        showPhoneOtpModal: true,
      };
      break;

    case VERIFY_PHONE_ERROR:
      state = {
        ...state,
        loading: false,
        phoneMsg: null,
        phoneMsgError: action.payload,
        showPhoneOtpModal: false,
      };
      break;

    case CLOSE_MODAL:
      state = {
        ...state,
        showPhoneOtpModal: false,
        validatePhone: null,
      };
      break;

    case PUT_CONTACT_DETAILS:
      state = {
        ...state,
        loading: true,
        contactMsg: null,
        contactMsgError: null,
      };
      break;

    case PUT_CONTACT_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        contactMsg: action.payload,
        contactMsgError: null,
      };
      break;

    case PUT_CONTACT_DETAILS_ERROR:
      state = {
        ...state,
        loading: false,
        contactMsg: null,
        contactMsgError: action.payload,
      };
      break;

    case PUT_PERSONAL_INFO:
      state = {
        ...state,
        loading: true,
        personalInfoMsg: null,
        personalInfoMsgError: null,
      };
      break;

    case PUT_PERSONAL_INFO_SUCCESS:
      state = {
        ...state,
        loading: false,
        personalInfoMsg: action.payload,
        personalInfoMsgError: null,
        infoSuccess: true,
      };
      break;

    case PUT_PERSONAL_INFO_ERROR:
      state = {
        ...state,
        loading: false,
        personalInfoMsg: null,
        personalInfoMsgError: action.payload,
        infoSuccess: false,
      };
      break;

    case VALIDATE_PHONE_OTP:
      state = {
        ...state,
        loading: true,
        validatePhone: null,
        validatePhoneError: null,
      };
      break;

    case VALIDATE_PHONE_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        validatePhone: action.payload,
        validatePhoneError: null,
      };
      break;

    case VALIDATE_PHONE_OTP_ERROR:
      state = {
        ...state,
        loading: false,
        validatePhone: null,
        validatePhoneError: action.payload,
      };
      break;

    case CLEAR_MESSAGES:
      state = {
        ...state,
        infoSuccess: false,
        contactMsg: null,
        contactMsgError: null,
      };
      break;

    case VERIFY_ACCOUNT_NO:
      state = {
        ...state,
        loading: true,
        accountDetail: null,
        accountDetailError: null,
      };
      break;

    case VERIFY_ACCOUNT_NO_SUCCESS:
      state = {
        ...state,
        loading: false,
        accountDetail: action.payload,
        accountDetailError: null,
      };
      break;

    case VERIFY_ACCOUNT_NO_ERROR:
      state = {
        ...state,
        loading: false,
        accountDetail: null,
        accountDetailError: action.payload,
        // showAccountValidErrorModal: true,
      };
      break;

    case CHANGE_PASSWORD:
      state = {
        ...state,
        loading: true,
        passChangeMsg: null,
        passChangeError: null,
      };
      break;

    case CHANGE_PASSWORD_SUCCESS:
      state = {
        ...state,
        loading: false,
        passChangeMsg: action.payload,
        passChangeError: null,
      };
      break;

    case CHANGE_PASSWORD_ERROR:
      state = {
        ...state,
        loading: false,
        passChangeMsg: null,
        passChangeError: action.payload,
      };
      break;

    case PUT_PERSONAL_DOCUMENTS:
      state = {
        ...state,
        loading: true,
        docMsg: null,
        docMsgError: null,
      };
      break;

    case PUT_PERSONAL_DOCUMENTS_SUCCESS:
      state = {
        ...state,
        loading: false,
        docMsg: action.payload,
        docMsgError: null,
      };
      break;

    case PUT_PERSONAL_DOCUMENTS_ERROR:
      state = {
        ...state,
        loading: false,
        docMsg: null,
        docMsgError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }

  return state;
};

export default updateProfile;
