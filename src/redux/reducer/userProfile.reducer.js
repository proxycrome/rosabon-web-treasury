import * as types from "../constant/auth";
import {
	CLEAR_OTP,
	GET_BANKS,
	GET_BANKS_ERROR,
	GET_BANKS_SUCCESS,
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
	SEND_COMPANY_OTP,
	SEND_COMPANY_OTP_ERROR,
	SEND_COMPANY_OTP_SUCCESS,
	SEND_OTP,
	SEND_OTP_ERROR,
	SEND_OTP_SUCCESS,
	VALIDATE_OTP,
	VALIDATE_OTP_ERROR,
	VALIDATE_OTP_SUCCESS,
} from "../constant/userActionTypes";

const initialState = {
	loading: false,
	user: null,
	users: null,
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
};

const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_AUTH_USER:
			return {
				...state,
				user: action.payload,
			};
		case types.GET_AUTH_USERS:
			// console.log(action.payload);
			return {
				...state,
				users: action.payload,
			};
		case types.CLEAR_USERS:
			return {
				...state,
				users: null,
			};
		case types.REMOVE_FOOTER:
			return {
				...state,
				modal: null,
			};

		case types.VERIFY_BVN:
			return {
				...state,
				loading: true,
				bvnMessage: null,
				bvnError: null,
				showBvnModal: false,
			};

		case types.VERIFY_BVN_SUCCESS:
			return {
				...state,
				loading: false,
				bvnMessage: action.payload,
				bvnError: null,
				showBvnModal: true,
			};

		case types.VERIFY_BVN_ERROR:
			return {
				...state,
				loading: false,
				bvnMessage: null,
				bvnError: action.payload,
				showBvnModal: false,
				id: action.id,
			};

		case types.CLOSE_MODAL:
			return {
				...state,
				showBvnModal: false,
				showEmailOtpModal: false,
			};

		case GET_COUNTRY:
			return {
				...state,
				loading: true,
				countries: null,
				countriesError: null,
			};

		case GET_COUNTRY_SUCCESS:
			return {
				...state,
				loading: false,
				countries: action.payload,
				countriesError: null,
			};

		case GET_COUNTRY_ERROR:
			return {
				...state,
				loading: false,
				countries: null,
				countriesError: action.payload,
			};

		case GET_STATE:
			return {
				...state,
				loading: true,
				states: null,
				statesError: null,
			};

		case GET_STATE_SUCCESS:
			return {
				...state,
				loading: false,
				states: action.payload,
				statesError: null,
			};

		case GET_STATE_ERROR:
			return {
				...state,
				loading: false,
				states: null,
				statesError: action.payload,
			};

		case GET_LGA:
			return {
				...state,
				loading: true,
				lgas: null,
				lgasError: null,
			};

		case GET_LGA_SUCCESS:
			return {
				...state,
				loading: false,
				lgas: action.payload,
				lgasError: null,
			};

		case GET_LGA_ERROR:
			return {
				...state,
				loading: false,
				lgas: null,
				lgasError: action.payload,
			};

		case SEND_OTP:
			return {
				...state,
				loading: true,
				otp: null,
				otpError: null,
			};

		case SEND_OTP_SUCCESS:
			return {
				...state,
				loading: false,
				otp: action.payload,
				otpError: null,
				showEmailOtpModal: true,
			};

		case SEND_OTP_ERROR:
			return {
				...state,
				loading: false,
				otp: null,
				otpError: action.payload,
				showEmailOtpModal: false,
			};

		case GET_BANKS:
			return {
				...state,
				loading: true,
				banks: null,
				banksError: null,
			};

		case GET_BANKS_SUCCESS:
			return {
				...state,
				loading: false,
				banks: action.payload,
				banksError: null,
			};

		case GET_BANKS_ERROR:
			return {
				...state,
				loading: false,
				banks: null,
				banksError: action.payload,
			};

		case VALIDATE_OTP:
			return {
				...state,
				loading: true,
				validateEmailOtp: null,
				validateOtpError: null,
			};

		case VALIDATE_OTP_SUCCESS:
			return {
				...state,
				loading: false,
				validateEmailOtp: action.payload,
				validateOtpError: null,
			};

		case VALIDATE_OTP_ERROR:
			return {
				...state,
				loading: false,
				validateEmailOtp: null,
				validateOtpError: action.payload,
			};

		case types.CLEAR_MESSAGES:
			return {
				...state,
				validateEmailOtp: null,
				validateOtpError: null,
			};

		case SEND_COMPANY_OTP:
			return {
				...state,
				loading: true,
				otp: null,
				otpError: null,
			};

		case SEND_COMPANY_OTP_SUCCESS:
			return {
				...state,
				loading: false,
				otp: action.payload,
				otpError: null,
				showEmailOtpModal: true,
			};

		case SEND_COMPANY_OTP_ERROR:
			return {
				...state,
				loading: false,
				otp: null,
				otpError: action.payload,
				showEmailOtpModal: false,
			};

		case CLEAR_OTP:
			return {
				otp: null,
				otpError: null,
			};

		case GET_COMPANY_DOCS:
			return {
				loading: true,
				companyDocs: null,
				companyDocsError: null,
			};

		case GET_COMPANY_DOCS_SUCCESS:
			return {
				loading: false,
				companyDocs: action.payload,
				companyDocsError: null,
			};

		case GET_COMPANY_DOCS_ERROR:
			return {
				loading: false,
				companyDocs: null,
				companyDocsError: action.payload,
			};

		default:
			return state;
	}
};

export { userProfileReducer };
