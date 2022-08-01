import { config } from "../config";
import axios from "axios";


export const register_company = async (obj) => {
  const response = await axios.post(`${config.rosobon}users`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const formData = await response.data;
  return { formData };
};

export const login_user = async (obj) => {
  const response = await axios.post(`${config.rosobon}login`, obj, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const formData = await response.data;
  return { formData };
};

export const reset_password = async (obj) => {
  const response = await axios.post(
    `${config.rosobon}auth/users/change-password`,
    obj,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const formData = await response.data;
  return { formData };
};

export const forgot_password = async (email) => {
  const response = await axios.post(
    `${config.rosobon}
  users​/${email}​/forgot-password`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const formData = await response.data;
  return { formData };
};
