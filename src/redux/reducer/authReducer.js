import * as types from "../constant/auth";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SET_SIGNUPBTN:
      return {
        ...state,
        signup_btn: action.payload,
      };
    case types.REGISTER_COMPANY:
      console.log(action.payload);
      return {
        ...state,
        company: action.payload,
      };
    case types.LOGIN_USER:
      console.log(action.payload);
      return {
        ...state,
        company: action.payload,
      };
    case types.AUTHORIZE_SUCCESS:
      console.log(action.payload);
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
