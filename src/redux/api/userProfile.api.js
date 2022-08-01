import { config } from "../config";
import axios from "axios";

export const get_users = async (token) => {
  const response = await axios.get(`${config.rosobon}auth/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const formData = await response.data;
  return { formData };
};

export const get_user = async (token, email) => {
  const response = await axios.get(`${config.rosobon}auth/${email}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const formData = await response.data;
  return { formData };
};
