import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

export const personal_bank_details = async (token, objData) => {
  try {
    const response = await axios.post(`${config.rosobon}`, objData, {
      headers: authHeader(token),
    });
    const formData = await response.data;
    return { formData };
  } catch (error) {}
};

export const company_bank_details = async (token, objData) => {
  try {
    const response = await axios.post(`${config.rosobon}`, objData, {
      headers: authHeader(token),
    });
    const formData = await response.data;
    return { formData };
  } catch (error) {}
};
