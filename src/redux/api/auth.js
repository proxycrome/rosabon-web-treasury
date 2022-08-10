import { config } from "../config";
import axios from "axios";
import { authHeader, headers } from "../headers";

export const register = async (obj) => {
  const response = await axios.post(`${config.rosobon}users`, obj, headers);

  const formData = await response.data;
  return { formData };
};

export const login_user = async (obj) => {
  try {
    const response = await axios.post(`${config.rosobon}login`, obj, headers);
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const message = error.response
      ? error.response.data.message
        ? error.response.data.message
        : error.response.data.response_message
        ? error.response.data.response_message
        : "Invalid Credentials"
      : "Network Error";
    console.log(message)
    // dispatch({
    //   type: types.AUTHORIZE_FAIL,
    //   payload: message,
    // });
    // toast.error(message, {
    //   position: "top-right",
    // });
    // console.log(error)
  }
  
};

export const reset_password = async (token, obj) => {
  const response = await axios.post(
    `${config.rosobon}auth/users/change-password`,
    obj,
    { headers: authHeader(token) }
  );
  const formData = await response.data;
  return { formData };
};

export const forgot_password = async (email) => {
  const response = await axios.post(
    `${config.rosobon}
  users​/${email}​/forgot-password`,
    headers
  );
  const formData = await response.data;
  return { formData };
};
