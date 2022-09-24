import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

export const create_plan = async (obj) => {
  try {
    const response = await axios.post(`${config.rosobon}auth/user/trcreate-plan`, obj, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}

export const get_single_plan = async (id) => {
  try {
    const response = await axios.post(`${config.rosobon}auth/user/trcreate-plan/${id}`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData };
  } catch(error) {
    const errorObj = await error.response.data
    return { errorObj }
  }
}