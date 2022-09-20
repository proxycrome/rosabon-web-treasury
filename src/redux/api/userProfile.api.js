import { config } from '../config';
import { authHeader } from '../headers';
import axios from 'axios';

const tokenObj = JSON.parse(localStorage.getItem('token'));

export const get_users = async (token) => {
  try {
    console.log(token);
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
      'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    console.log(error.response);
  }
};

export const verify_bvn = async (objData) => {
  try {
    const response = await axios.post(
      `${config.rosobon}auth/verify-bvn`,
      objData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenObj.token}`,
        },
      }
    );

    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const get_countries = async () => {
  try {
    const response = await axios.get(`${config.rosobon}country`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const get_states = async (countryId) => {
  try {
    const response = await axios.get(`${config.rosobon}state/${countryId}`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const get_lgas = async (stateId) => {
  try {
    const response = await axios.get(`${config.rosobon}lga/${stateId}`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};

export const send_otp = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/individual-user/send-otp`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch (error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
};