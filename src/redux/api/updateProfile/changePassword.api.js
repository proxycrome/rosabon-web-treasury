import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

export const change_personal_password = async (token, objData) => {
  try {
    const response = await axios.post(`${config.rosobon}`, objData, {
      headers: authHeader(token),
    });
    const formData = await response.data;
    return { formData };
  } catch (error) {}
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
