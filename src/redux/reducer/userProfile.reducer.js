import * as types from "../constant/auth";

const userProfileReducer = (state = {}, action) => {
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

    default:
      return state;
  }
};

export { userProfileReducer };
