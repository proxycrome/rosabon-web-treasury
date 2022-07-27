import * as types from "../constant/auth";

const authReducer = (state = { signup_btn: true }, action) => {
  switch (action.type) {
    case types.SET_SIGNUPBTN:
      return {
        ...state,
        signup_btn: action.payload,
      };
    // case types.AUTHORIZE_SUCCESS:
    // 	return { loading: false, user: action.payload, logged_in: true };
    // case types.AUTHORIZE_FAIL:
    // 	return { loading: false, error: action.payload };
    // case types.LOG_OUT:
    // 	return { logged_in: false };
    default:
      return state;
  }
};

export { authReducer };
