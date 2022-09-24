import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem('token'));

export const change_personal_password = async (objData) => {
  try {
    const response = await axios.post(`${config.rosobon}auth/users/change-password`, objData, {
      headers: authHeader(tokenObj.token),
    });
    
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error?.response?.data;
    return { errorObj };
  }
};

export const change_company_password = async (token, objData) => {
  try {
    const response = await axios.post(`${config.rosobon}`, objData, {
      headers: authHeader(token),
    });
    const formData = await response.data;
    return { formData };
  } catch (error) {}
};
