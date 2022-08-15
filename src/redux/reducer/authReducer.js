import * as types from "../constant/auth";

const authReducer = (state = { login: {}, isLoggedIn: false, isSigned: false }, action) => {
  switch (action.type) {
    case types.SET_SIGNUPBTN:
      return {
        ...state,
        signup_btn: action.payload,
      };
    case types.REGISTER_COMPANY:
      return {
        ...state,
        register: action.payload,
        isSignedup: action.success,
        
      };
    case types.LOGIN_USER:
      return {
        ...state,
        login: action.payload,
        isLoggedIn: action.success,
      };
    case types.AUTHORIZE_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };
    case types.REGISTER_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export { authReducer };
