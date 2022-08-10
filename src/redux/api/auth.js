import { config } from "../config";
import axios from "axios";
import { authHeader, headers } from "../headers";

export const register = async (obj) => {
  const response = await axios.post(`${config.rosobon}users`, obj, headers);

  const formData = await response.data;
  return { formData };
};

export const login_user = async (obj) => {
  const response = await axios.post(`${config.rosobon}login`, obj, headers);
  const formData = await response.data;
  return { formData };
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
