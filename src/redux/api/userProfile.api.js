import { config } from "../config";
import { authHeader } from "../headers";
import axios from "axios";

export const get_users = async (token) => {
  try {
    console.log(token)
    const response = await axios.get(`${config.rosobon}auth/users`, {
      headers: authHeader(token),
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    console.log(error);
  }
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

export const update_user_company_kyc = async (token, objData) => {
  try {
    const response = await axios.put(`${config.rosobon}auth/users`, objData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    const formData = await response.data;
    return { formData };
  } catch (error) {
    console.log(error.response);
  }
  
};