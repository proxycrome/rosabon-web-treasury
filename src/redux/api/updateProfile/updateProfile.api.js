import { config } from '../../config';
import { authHeader } from '../../headers';
import axios from 'axios';

const tokenObj = JSON.parse(localStorage.getItem('token'));

export const update_company_details = async (objData) => {
  try {
    const response = await axios.put(`${config.rosobon}auth/company`, objData, {
      headers: authHeader(tokenObj.token),
    });
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error?.response?.data;
    return { errorObj };
  }
};

export const verify_phone = async (recipient) => {
  try {
    const response = await axios.post(
      `${config.rosobon}auth/individual-user/verify-phone?recipient=${recipient}`,
      null,
      {
        headers: authHeader(tokenObj.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const update_contact_details = async (dataObj) => {
  try {
    const response = await axios.put(
      `${config.rosobon}auth/individual-user/contact-detail`,
      dataObj,
      {
        headers: authHeader(tokenObj.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const update_personal_info = async (dataObj) => {
  try {
    const response = await axios.put(
      `${config.rosobon}auth/individual-user`,
      dataObj,
      {
        headers: authHeader(tokenObj.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const validate_phone_otp = async (otp) => {
  try {
    const response = await axios.get(
      `${config.rosobon}auth/individual-user/validate-phone?otp=${otp}`,
      {
        headers: authHeader(tokenObj.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};
