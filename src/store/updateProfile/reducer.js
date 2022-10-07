import { CLOSE_MODAL } from "../profile/actionTypes";

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
	UPDATE_COMPANY_DOCS,
	UPDATE_COMPANY_DOCS_ERROR,
	UPDATE_COMPANY_DOCS_SUCCESS,
	UPDATE_COMPANY_INFO,
	UPDATE_COMPANY_INFO_ERROR,
	UPDATE_COMPANY_INFO_SUCCESS,
	UPDATE_DIRECTOR_DETAILS,
	UPDATE_DIRECTOR_DETAILS_ERROR,
	UPDATE_DIRECTOR_DETAILS_SUCCESS,
	VALIDATE_PHONE_OTP,
	VALIDATE_PHONE_OTP_ERROR,
	VALIDATE_PHONE_OTP_SUCCESS,
	VERIFY_ACCOUNT_NO,
	VERIFY_ACCOUNT_NO_ERROR,
	VERIFY_ACCOUNT_NO_SUCCESS,
	VERIFY_PHONE,
	VERIFY_PHONE_ERROR,
	VERIFY_PHONE_SUCCESS,
} from "./actionTypes";

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
	companyInfoMsg: null,
	companyInfoError: null,
	companyDocMsg: null,
	companyDocMsgError: null,
	directorMsg: null,
	directorMsgError: null,
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

		case UPDATE_COMPANY_INFO:
			state = {
				...state,
				loading: true,
				companyInfoMsg: null,
				companyInfoError: null,
			};
			break;

		case UPDATE_COMPANY_INFO_SUCCESS:
			state = {
				...state,
				loading: false,
				companyInfoMsg: action.payload,
				companyInfoError: null,
			};
			break;

		case UPDATE_COMPANY_INFO_ERROR:
			state = {
				...state,
				loading: false,
				companyInfoMsg: null,
				companyInfoError: action.payload,
			};
			break;

		case UPDATE_COMPANY_DOCS:
			state = {
				...state,
				loading: true,
				companyDocMsg: null,
				companyDocMsgError: null,
			};
			break;

		case UPDATE_COMPANY_DOCS_SUCCESS:
			state = {
				...state,
				loading: false,
				companyDocMsg: action.payload,
				companyDocMsgError: null,
			};
			break;

		case UPDATE_COMPANY_DOCS_ERROR:
			state = {
				...state,
				loading: false,
				companyDocMsg: null,
				companyDocMsgError: action.payload,
			};
			break;

		case UPDATE_DIRECTOR_DETAILS:
			state = {
				...state,
				loading: true,
				directorMsg: null,
				directorMsgError: null,
			};
			break;

		case UPDATE_DIRECTOR_DETAILS_SUCCESS:
			state = {
				...state,
				loading: false,
				directorMsg: action.payload,
				directorMsgError: null,
			};
			break;

		case UPDATE_DIRECTOR_DETAILS_ERROR:
			state = {
				...state,
				loading: false,
				directorMsg: null,
				directorMsgError: action.payload,
			};
			break;

		default:
			state = { ...state };
			break;
	}

	return state;
};

export default updateProfile;