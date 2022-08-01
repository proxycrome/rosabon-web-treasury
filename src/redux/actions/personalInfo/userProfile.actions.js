import * as types from "../../constant/auth";
import { get_users, get_user } from "../../api/userProfile.api";

export const getAuthUsers = (token) => async (dispatch) => {
  try {
    const { formData } = await get_users(token);
    dispatch({ type: types.GET_AUTH_USERS, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const getAuthUser = (token, email) => async (dispatch) => {
  try {
    const { formData } = await get_user(token);
    dispatch({ type: types.GET_AUTH_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};
