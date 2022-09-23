import { config } from "../../config";
import { authHeader } from "../../headers";
import axios from "axios";

const tokenObj = JSON.parse(localStorage.getItem("token"));

export const post_feedback = async (obj) => {
  try {
    const response = await axios.post(`${config.rosobon}auth/feedback`, obj, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}

export const get_tickets = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/feedback/my-tickets`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}

export const get_open_tickets = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/feedback/open-tickets`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}

export const get_closed_tickets = async () => {
  try {
    const response = await axios.get(`${config.rosobon}auth/feedback/closed-tickets`, {
      headers: authHeader(tokenObj.token),
    });

    const formData = await response.data;
    return { formData }
  } catch(error) {
    const errorObj = await error.response.data;
    return { errorObj };
  }
}
