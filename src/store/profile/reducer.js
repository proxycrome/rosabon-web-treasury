import { LOGOUT_USER_SUCCESS } from "../auth/actionTypes";
import {
  CLEAR_BVN,
  CLEAR_MESSAGES,
  CLEAR_OTP,
  CLEAR_USERS,
  CLOSE_MODAL,
  GET_ALL_GENDER,
  GET_ALL_GENDER_ERROR,
  GET_ALL_GENDER_SUCCESS,
  GET_ALL_ID_TYPES,
  GET_ALL_ID_TYPES_ERROR,
  GET_ALL_ID_TYPES_SUCCESS,
  GET_ALL_SOURCES,
  GET_ALL_SOURCES_ERROR,
  GET_ALL_SOURCES_SUCCESS,
  GET_AUTH_USER,
  GET_AUTH_USERS,
  GET_AUTH_USERS_ERROR,
  GET_AUTH_USERS_SUCCESS,
  GET_AUTH_USER_ERROR,
  GET_AUTH_USER_SUCCESS,
  GET_BANKS,
  GET_BANKS_ERROR,
  GET_BANKS_SUCCESS,
  GET_BANK_DETAILS,
  GET_BANK_DETAILS_ERROR,
  GET_BANK_DETAILS_SUCCESS,
  GET_COMPANY_DOCS,
  GET_COMPANY_DOCS_ERROR,
  GET_COMPANY_DOCS_SUCCESS,
  GET_COUNTRY,
  GET_COUNTRY_ERROR,
  GET_COUNTRY_SUCCESS,
  GET_LGA,
  GET_LGA_ERROR,
  GET_LGA_SUCCESS,
  GET_STATE,
  GET_STATE_ERROR,
  GET_STATE_SUCCESS,
  GET_USER_DOCS,
  GET_USER_DOCS_ERROR,
  GET_USER_DOCS_SUCCESS,
  GET_WITHDRAW_REASON,
  GET_WITHDRAW_REASON_ERROR,
  GET_WITHDRAW_REASON_SUCCESS,
  REMOVE_FOOTER,
  SEND_COMPANY_OTP,
  SEND_COMPANY_OTP_ERROR,
  SEND_COMPANY_OTP_SUCCESS,
  SEND_OTP,
  SEND_OTP_ERROR,
  SEND_OTP_SUCCESS,
  TOGGLE_SIDEBAR,
  UPDATE_USER_KYC,
  UPDATE_USER_KYC_ERROR,
  UPDATE_USER_KYC_SUCCESS,
  UPDATE_USER_NAME,
  UPDATE_USER_NAME_ERROR,
  UPDATE_USER_NAME_SUCCESS,
  VALIDATE_OTP,
  VALIDATE_OTP_ERROR,
  VALIDATE_OTP_SUCCESS,
  VERIFY_BVN,
  VERIFY_BVN_ERROR,
  VERIFY_BVN_SUCCESS,
} from "./actionTypes";

const initialState = {
  loading: false,
  user: null,
  userError: null,
  users: null,
  usersError: null,
  kycData: null,
  kycDataError: null,
  modal: null,
  bvnMessage: null,
  bvnError: null,
  showBvnModal: false,
  countries: null,
  countriesError: null,
  states: null,
  statesError: null,
  lgas: null,
  lgasError: null,
  otp: null,
  otpError: null,
  showEmailOtpModal: false,
  banks: null,
  banksError: null,
  validateEmailOtp: null,
  validateOtpError: null,
  companyDocs: null,
  companyDocsError: null,
  id: 0,
  bankDetails: null,
  bankDetailsError: null,
  withdrawReasons: null,
  withdrawReasonsError: null,
  documents: null,
  documentsError: null,
  sidebar: false,
  gender: null,
  genderError: null,
  sources: null,
  sourcesError: null,
  idTypes: null,
  idTypesError: null,
  nameUpdateMsg: null,
  nameUpdateError: null,
};

const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH_USER:
    case GET_AUTH_USERS:
    case UPDATE_USER_KYC:
    case VERIFY_BVN:
    case GET_COUNTRY:
    case GET_STATE:
    case GET_LGA:
    case SEND_OTP:
    case VALIDATE_OTP:
    case SEND_COMPANY_OTP:
    case GET_COMPANY_DOCS:
    case GET_BANKS:
    case GET_BANK_DETAILS:
    case GET_WITHDRAW_REASON:
    case GET_USER_DOCS:
    case GET_ALL_GENDER:
    case GET_ALL_SOURCES:
    case GET_ALL_ID_TYPES:
    case UPDATE_USER_NAME:
      state = {
        ...state,
        loading: true,
      };
      break;

    case GET_AUTH_USER_SUCCESS:
      state = {
        ...state,
        loading: false,
        user: action.payload,
        userError: null,
      };
      break;

    case GET_AUTH_USER_ERROR:
      state = {
        ...state,
        loading: false,
        user: null,
        userError: action.payload,
      };
      break;

    case GET_AUTH_USERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        users: action.payload,
        usersError: null,
      };
      break;

    case GET_AUTH_USERS_ERROR:
      state = {
        ...state,
        loading: false,
        users: null,
        usersError: action.payload,
      };
      break;

    case CLEAR_USERS:
      state = {
        ...state,
        users: null,
      };
      break;

    case REMOVE_FOOTER:
      state = {
        ...state,
        modal: null,
      };
      break;

    case UPDATE_USER_KYC_SUCCESS:
      state = {
        ...state,
        loading: false,
        kycData: action.payload,
        kycDataError: null,
      };
      break;

    case UPDATE_USER_KYC_ERROR:
      state = {
        ...state,
        loading: false,
        kycData: null,
        kycDataError: action.payload,
      };
      break;

    case UPDATE_USER_NAME_SUCCESS:
      state = {
        ...state,
        loading: false,
        nameUpdateMsg: action.payload,
        nameUpdateError: null,
      };
      break;

    case UPDATE_USER_NAME_ERROR:
      state = {
        ...state,
        loading: false,
        nameUpdateMsg: null,
        nameUpdateError: action.payload,
      };
      break;

    case VERIFY_BVN_SUCCESS:
      state = {
        ...state,
        loading: false,
        bvnMessage: action.payload,
        bvnError: null,
        showBvnModal: true,
      };
      break;

    case VERIFY_BVN_ERROR:
      state = {
        ...state,
        loading: false,
        bvnMessage: null,
        bvnError: action.payload,
        showBvnModal: false,
        id: action.id,
      };
      break;

    case GET_COUNTRY_SUCCESS:
      state = {
        ...state,
        loading: false,
        countries: action.payload,
        countriesError: null,
      };
      break;

    case GET_COUNTRY_ERROR:
      state = {
        ...state,
        loading: false,
        countries: null,
        countriesError: action.payload,
      };
      break;

    case GET_STATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        states: action.payload,
        statesError: null,
      };
      break;

    case GET_STATE_ERROR:
      state = {
        ...state,
        loading: false,
        states: null,
        statesError: action.payload,
      };
      break;

    case GET_LGA_SUCCESS:
      state = {
        ...state,
        loading: false,
        lgas: action.payload,
        lgasError: null,
      };
      break;

    case GET_LGA_ERROR:
      state = {
        ...state,
        loading: false,
        lgas: null,
        lgasError: action.payload,
      };
      break;

    case SEND_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        otp: action.payload,
        otpError: null,
        showEmailOtpModal: true,
      };
      break;

    case SEND_OTP_ERROR:
      state = {
        ...state,
        loading: false,
        otp: null,
        otpError: action.payload,
        showEmailOtpModal: false,
      };
      break;

    case VALIDATE_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        validateEmailOtp: action.payload,
        validateOtpError: null,
      };
      break;

    case VALIDATE_OTP_ERROR:
      state = {
        ...state,
        loading: false,
        validateEmailOtp: null,
        validateOtpError: action.payload,
      };
      break;

    case CLOSE_MODAL:
      state = {
        ...state,
        showBvnModal: false,
        showEmailOtpModal: false,
      };
      break;

    case CLEAR_MESSAGES:
      state = {
        ...state,
        kycData: null,
        kycDataError: null,
        validateEmailOtp: null,
        validateOtpError: null,
      };
      break;

    case CLEAR_OTP:
      state = {
        ...state,
        otp: null,
        otpError: null,
      };
      break;

    case SEND_COMPANY_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        otp: action.payload,
        otpError: null,
        showEmailOtpModal: true,
      };
      break;

    case SEND_COMPANY_OTP_ERROR:
      state = {
        ...state,
        loading: false,
        otp: null,
        otpError: action.payload,
        showEmailOtpModal: false,
      };
      break;

    case GET_BANKS_SUCCESS:
      state = {
        ...state,
        loading: false,
        banks: action.payload,
        banksError: null,
      };
      break;

    case GET_BANKS_ERROR:
      state = {
        ...state,
        loading: false,
        banks: null,
        banksError: action.payload,
      };
      break;

    case GET_COMPANY_DOCS_SUCCESS:
      state = {
        ...state,
        loading: false,
        companyDocs: action.payload,
        companyDocsError: null,
      };
      break;

    case GET_COMPANY_DOCS_ERROR:
      state = {
        ...state,
        loading: false,
        companyDocs: null,
        companyDocsError: action.payload,
      };
      break;

    case GET_BANK_DETAILS_SUCCESS:
      state = {
        ...state,
        loading: false,
        bankDetails: action.payload,
        bankDetailsError: null,
      };
      break;

    case GET_BANK_DETAILS_ERROR:
      state = {
        ...state,
        loading: false,
        bankDetails: null,
        bankDetailsError: action.payload,
      };
      break;

    case GET_WITHDRAW_REASON_SUCCESS:
      state = {
        ...state,
        loading: false,
        withdrawReasons: action.payload,
        withdrawReasonsError: null,
      };
      break;

    case GET_WITHDRAW_REASON_ERROR:
      state = {
        ...state,
        loading: false,
        withdrawReasons: null,
        withdrawReasonsError: action.payload,
      };
      break;

    case GET_USER_DOCS_SUCCESS:
      state = {
        ...state,
        loading: false,
        documents: action.payload,
        documentsError: null,
      };
      break;

    case GET_USER_DOCS_ERROR:
      state = {
        ...state,
        loading: false,
        documents: null,
        documentsError: action.payload,
      };
      break;

    case GET_ALL_GENDER_SUCCESS:
      state = {
        ...state,
        loading: false,
        gender: action.payload,
        genderError: null,
      };
      break;

    case GET_ALL_GENDER_ERROR:
      state = {
        ...state,
        loading: false,
        gender: null,
        genderError: action.payload,
      };
      break;

    case GET_ALL_SOURCES_SUCCESS:
      state = {
        ...state,
        loading: false,
        sources: action.payload,
        sourcesError: null,
      };
      break;

    case GET_ALL_SOURCES_ERROR:
      state = {
        ...state,
        loading: false,
        sources: null,
        sourcesError: action.payload,
      };
      break;

    case GET_ALL_ID_TYPES_SUCCESS:
      state = {
        ...state,
        loading: false,
        idTypes: action.payload,
        idTypesError: null,
      };
      break;

    case GET_ALL_ID_TYPES_ERROR:
      state = {
        ...state,
        loading: false,
        idTypes: null,
        idTypesError: action.payload,
      };
      break;

    case CLEAR_BVN:
      state = {
        ...state,
        bvnMessage: null,
        bvnError: null,
      };
      break;

    case TOGGLE_SIDEBAR:
      state = {
        ...state,
        sidebar: !state.sidebar,
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

export default userProfileReducer;
