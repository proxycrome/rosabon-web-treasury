import { config } from '../../config';
import { authHeader } from '../../headers';
import axios from 'axios';

const tokenObj = JSON.parse(localStorage.getItem('token'));

export const upload_personal_document = async (dataObj) => {
  try {
    const response = await axios.put(
      `${config.rosobon}auth/individual-user/my-document`,
      dataObj,
      {
        headers: authHeader(tokenObj?.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const upload_company_document = async (objData) => {
  try {
    const response = await axios.put(
      `${config.rosobon}auth/company/company-document`,
      objData,
      {
        headers: authHeader(tokenObj?.token),
      }
    );
    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error?.response?.data;
    return { errorObj };
  }
};
