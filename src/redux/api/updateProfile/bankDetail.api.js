import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem('token'));

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

export const verify_account_no = async (dataObj) => {
  try {
    const response = await axios.post(
      `${config.rosobon}auth/individual-user/bank-account/verify`,
      dataObj,
      {
        headers: authHeader(tokenObj.token),
      }
    );
    const formData = await response.data;
    return {formData};
  } catch (error) {
    const errorObj = await error.response.data;
    return {errorObj}
  }
};
