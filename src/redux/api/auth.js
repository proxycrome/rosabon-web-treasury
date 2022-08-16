import { config } from "../config";
import axios from "axios";
import { authHeader, headers } from "../headers";

export const register = async (obj) => {
  try {
    const response = await axios.post(`${config.rosobon}users`, obj, headers);
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
    return { message };
  }
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
    return { message };
  }
};

export const reset_password = async (token, obj) => {
  try {
    const response = await axios.post(
      `${config.rosobon}auth/users/change-password`,
      obj,
      { headers: authHeader(token) }
    );
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
    return { message };
  }
};

export const forgot_password = async (email) => {
  try {
    const mail = email.trim()
    const response = await axios.post(
      `${config.rosobon}users/${mail}/forgot-password`,
      headers
    );
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
    return { message };
  }
};
