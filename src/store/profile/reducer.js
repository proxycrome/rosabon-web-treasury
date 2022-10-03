import {
	CLEAR_MESSAGES,
	CLEAR_OTP,
	CLEAR_USERS,
	CLOSE_MODAL,
	GET_AUTH_USER,
	GET_AUTH_USERS,
	GET_AUTH_USERS_ERROR,
	GET_AUTH_USERS_SUCCESS,
	GET_AUTH_USER_ERROR,
	GET_AUTH_USER_SUCCESS,
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
	REMOVE_FOOTER,
	SEND_COMPANY_OTP,
	SEND_COMPANY_OTP_ERROR,
	SEND_COMPANY_OTP_SUCCESS,
	SEND_OTP,
	SEND_OTP_ERROR,
	SEND_OTP_SUCCESS,
	UPDATE_USER_KYC,
	UPDATE_USER_KYC_ERROR,
	UPDATE_USER_KYC_SUCCESS,
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
};

const userProfileReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_AUTH_USER:
		case GET_AUTH_USERS:
			state = {
				...state,
				loading: true,
				user: null,
				userError: null,
				users: null,
				usersError: null,
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

		case UPDATE_USER_KYC:
			state = {
				...state,
				loading: true,
				kycData: null,
				kycDataError: null,
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

		case VERIFY_BVN:
			state = {
				...state,
				loading: true,
				bvnMessage: null,
				bvnError: null,
				showBvnModal: false,
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

		case GET_COUNTRY:
			state = {
				...state,
				loading: true,
				countries: null,
				countriesError: null,
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

		case GET_STATE:
			state = {
				...state,
				loading: true,
				states: null,
				statesError: null,
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

		case GET_LGA:
			state = {
				...state,
				loading: true,
				lgas: null,
				lgasError: null,
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

		case SEND_OTP:
			state = {
				...state,
				loading: true,
				otp: null,
				otpError: null,
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

		case VALIDATE_OTP:
			state = {
				...state,
				loading: true,
				validateEmailOtp: null,
				validateOtpError: null,
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

		case SEND_COMPANY_OTP:
			state = {
				...state,
				loading: true,
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

		case GET_BANKS:
			state = {
				...state,
				loading: true,
				banks: null,
				banksError: null,
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

		case GET_COMPANY_DOCS:
			state = {
				loading: true,
				companyDocs: null,
				companyDocsError: null,
			};
			break;

		case GET_COMPANY_DOCS_SUCCESS:
			state = {
				loading: false,
				companyDocs: action.payload,
				companyDocsError: null,
			};
			break;

		case GET_COMPANY_DOCS_ERROR:
			state = {
				loading: false,
				companyDocs: null,
				companyDocsError: action.payload,
			};
			break;

		default:
			state = { ...state };
			break;
	}

	return state;
};

export default userProfileReducer;
