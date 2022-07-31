import * as types from "../../constant/auth";
import { register_company, login_user } from "../../api/auth";

export const register = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await register_company(dataObj);
    console.log(formData)
    dispatch({ type: types.REGISTER_COMPANY, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const loginUser = (dataObj) => async (dispatch) => {
  try {
    const { formData } = await login_user(dataObj);
    console.log(formData)
    dispatch({ type: types.LOGIN_USER, payload: formData });
    dispatch({ type: types.AUTHORIZE_SUCCESS, payload: true });
  } catch (error) {}
};

export const successMessage = (success) => (dispatch) => {
  dispatch({ type: types.AUTHORIZE_SUCCESS, payload: success });
}

// export const user_login = (obj) => async (dispatch) => {
// 	try {
// 		dispatch({ type: types.AUTHORIZE_REQUEST });

// 		const { data } = await axios.post(
// 			`${config.getripayTest}/user/users/login`,
// 			obj,
// 			{
// 				headers: headers,
// 			}
// 		);

// 		if (data.success) {
// 			dispatch({
// 				type: types.AUTHORIZE_SUCCESS,
// 				payload: data.data,
// 			});
// 		}
// 	} catch (error) {
// 		const message = error.response
// 			? error.response.data.message
// 				? error.response.data.message
// 				: error.response.data.response_message
// 				? error.response.data.response_message
// 				: "Invalid Credentials"
// 			: "Network Error";
// 		dispatch({
// 			type: types.AUTHORIZE_FAIL,
// 			payload: message,
// 		});
// 		toast.error(message, {
// 			position: "top-right",
// 		});
// 	}
// };

// export const get_profile = (token, id) => async (dispatch) => {
// 	try {
// 		const { data } = await axios.get(
// 			`${config.getripayTest}/user/users-profile/${id}?front_end=1n`,
// 			{
// 				headers: authHeader(token),
// 			}
// 		);

// 		if (data) {
// 			dispatch({
// 				type: types.AUTHORIZE_SUCCESS,
// 				payload: data.data,
// 			});
// 		}
// 	} catch (error) {
// 		const message = error.response
// 			? error.response.data.message
// 				? error.response.data.message
// 				: error.response.data.response_message
// 				? error.response.data.response_message
// 				: "Invalid Credentials"
// 			: "Network Error";
// 		if (
// 			message === "Invalid Token" ||
// 			message === "Expired token" ||
// 			message === "Unauthorized"
// 		) {
// 			dispatch(user_logout());
// 		}
// 	}
// };

export const set_signup = (data) => (dispatch) => {
  dispatch({ type: types.SET_SIGNUPBTN, payload: data });
};
