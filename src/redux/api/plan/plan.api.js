import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

// create plan
export const create_plan = async (obj) => {
  try {
    const response = await axios.post(`${config.rosobon}auth/trcreate-plan`, obj, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}

export const get_plans = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/trcreate-plan`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}

// get single plan
export const get_single_plan = async (id) => {
  try {
    const response = await axios.get(`${config.rosobon}auth/user/trcreate-plan/${id}`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}

// get all tenors
export const get_tenor = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/trtenor`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}

// get single tenor
export const get_single_tenor = async (id) => {
  try {
    const response = await axios.get(`${config.rosobon}auth/trtenor/${id}`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}
